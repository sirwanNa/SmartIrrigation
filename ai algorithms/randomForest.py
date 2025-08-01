import requests
import numpy as np
import pandas as pd
import math
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, MinMaxScaler
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
import joblib

# Constants for API URLs
BASE_URL = "http://localhost:4000"
DATASET_URL = f"{BASE_URL}/api/v1/dataset/getdataset"
SAVE_METRICS_URL = f"{BASE_URL}/api/v1/machinelearning/accuracyprameters/"
UPDATE_MODEL_URL = f"{BASE_URL}/ai/v1/dataset/updateModel"
GET_LOCAL_MODEL_URL = f"{BASE_URL}/api/v1/machinelearning/randomforest/getlocalmodel"


class RandomForestRegressorService:
    def __init__(self):
        self.label_encoders = {}
        self.scaler = MinMaxScaler()
        self.model = RandomForestRegressor(n_estimators=100, random_state=42)

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
        return X_scaled, y

    def train(self, X, y):
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        self.model.fit(X_train, y_train)
        y_pred = self.model.predict(X_test)
        return X_test, y_test, y_pred

    def evaluate_and_save_metrics(self, y_test, y_pred):
        mse = mean_squared_error(y_test, y_pred)
        rmse = math.sqrt(mse)
        mae = mean_absolute_error(y_test, y_pred)
        r2 = r2_score(y_test, y_pred)

        payload = {
            "model": "RandomForest",
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
            "modelName": "RandomForest",
            "description": "Random Forest model trained to predict estimated irrigation time based on soil, crop, and weather data.",
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
        # Assume the model is sent as a pickled object (base64 or bytes)
        from io import BytesIO
        import base64

        model_b64 = response.json().get("model_binary")
        model_bytes = BytesIO(base64.b64decode(model_b64))
        model = joblib.load(model_bytes)

        scaled_input = self.scaler.transform(input_data)
        prediction = model.predict(scaled_input)
        return prediction


if __name__ == "__main__":
    service = RandomForestRegressorService()
    df = service.fetch_dataset()
    X, y = service.preprocess(df)
    X_test, y_test, y_pred = service.train(X, y)
    service.evaluate_and_save_metrics(y_test, y_pred)


