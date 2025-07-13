import requests
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.metrics import mean_squared_error
import pickle
import io


response = requests.get("http://localhost:4000/api/v1/dataset/getdataset")
response.raise_for_status()
data = response.json()


df = pd.DataFrame(data)


feature_cols = ['crop_Type', 'Soil_Type', 'temp', 'plant_Size', 'month', 'farm_Type']
target_col = 'estimated_time'

X = df[feature_cols]
y = df[target_col]


categorical_features = ['crop_Type', 'Soil_Type', 'month', 'farm_Type']
numerical_features = ['temp', 'plant_Size']


preprocessor = ColumnTransformer(transformers=[
    ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features),
    ('num', StandardScaler(), numerical_features)
])


pipeline = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('regressor', RandomForestRegressor(n_estimators=100, random_state=42))
])


X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)


pipeline.fit(X_train, y_train)


y_pred = pipeline.predict(X_test)
rmse = mean_squared_error(y_test, y_pred, squared=False)
print(f"Test RMSE: {rmse:.2f}")


model_bytes = io.BytesIO()
pickle.dump(pipeline, model_bytes)
model_bytes.seek(0)


files = {
    'model': ('random_forest_model.pkl', model_bytes, 'application/octet-stream')
}
upload_response = requests.post(
    "http://localhost:4000/ai/v1/dataset/updateModel",
    files=files
)


if upload_response.status_code == 200:
    print("Model uploaded successfully.")
else:
    print(f"Failed to upload model. Status code: {upload_response.status_code}")
    print(upload_response.text)
