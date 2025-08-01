import requests
import numpy as np
import pandas as pd
import math
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, MinMaxScaler
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
from scikeras.wrappers import KerasRegressor
from tensorflow.keras.models import Sequential, model_from_json
from tensorflow.keras.layers import LSTM, Dense
from tensorflow.keras.utils import set_random_seed

set_random_seed(42)

# Constants for API URLs
BASE_URL = "http://localhost:4000"
DATASET_URL = f"{BASE_URL}/api/v1/dataset/getdataset"
SAVE_METRICS_URL = f"{BASE_URL}/api/v1/machinelearning/accuracyprameters/"
UPDATE_MODEL_URL = f"{BASE_URL}/ai/v1/dataset/updateModel"
GET_LOCAL_MODEL_URL = f"{BASE_URL}/api/v1/machinelearning/lstm/getlocalmodel"


class LSTMRegressorService:
    def __init__(self):
        self.label_encoders = {}
        self.scaler = MinMaxScaler()
        self.model = None
        self.input_shape = (5, 1)

    def fetch_dataset(self):
        response = requests.get(DATASET_URL)
        response.raise_for_status()
        data = response.json()
        df = pd.DataFrame(data)
        return df

    def preprocess(self, df):
        categorical_cols = ['soilType', 'cropType', 'month']
        for col in categorical_cols:
            le = LabelEncoder()
            df[col] = le.fit_transform(df[col])
            self.label_encoders[col] = le
        X = df[['soilType', 'cropType', 'landSlope', 'month', 'temperature']].values
        y = df['estimated_Time'].values
        X_scaled = self.scaler.fit_transform(X)
        X_reshaped = X_scaled.reshape((X_scaled.shape[0], X_scaled.shape[1], 1))
        return X_reshaped, y

    def build_model(self):
        model = Sequential()
        model.add(LSTM(64, input_shape=self.input_shape))
        model.add(Dense(1))
        model.compile(optimizer='adam', loss='mse')
        return model

    def train(self, X, y):
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        regressor = KerasRegressor(model=self.build_model, epochs=30, batch_size=16, verbose=1)
        regressor.fit(X_train, y_train)
        self.model = regressor
        return X_test, y_test, regressor.predict(X_test)

    def evaluate_and_save_metrics(self, y_test, y_pred):
        mse = mean_squared_error(y_test, y_pred)
        rmse = math.sqrt(mse)
        mae = mean_absolute_error(y_test, y_pred)
        r2 = r2_score(y_test, y_pred)

        payload = {
            "model": "LSTM",
            "mae": round(mae, 4),
            "mse": round(mse, 4),
            "rmse": round(rmse, 4),
            "r2": round(r2, 4)
        }
        response = requests.post(SAVE_METRICS_URL, json=payload)
        if response.status_code in [200, 201]:
            print("Accuracy metrics saved.")
        else:
            print("Error saving metrics:", response.text)

        model_update_payload = {
            "modelName": "LSTM",
            "description": "LSTM model trained to predict estimated irrigation time based on soil, crop, and weather data.",
            "metrics": payload,
            "version": "1.0"
        }
        update_response = requests.post(UPDATE_MODEL_URL, json=model_update_payload)
        if update_response.status_code in [200, 201]:
            print("Model info updated.")
        else:
            print("Error updating model:", update_response.text)

    def predict_from_api_model(self, input_data):
        response = requests.get(GET_LOCAL_MODEL_URL)
        response.raise_for_status()
        model_json = response.json().get("model_json")
        weights = np.array(response.json().get("weights"))

        model = model_from_json(model_json)
        model.set_weights(weights)
        model.compile(optimizer='adam', loss='mse')

        scaled_input = self.scaler.transform(input_data)
        reshaped_input = scaled_input.reshape((scaled_input.shape[0], scaled_input.shape[1], 1))
        predictions = model.predict(reshaped_input)
        return predictions


if __name__ == "__main__":
    service = LSTMRegressorService()
    df = service.fetch_dataset()
    X, y = service.preprocess(df)
    X_test, y_test, y_pred = service.train(X, y)
    service.evaluate_and_save_metrics(y_test, y_pred)


