import requests
import pandas as pd
from sklearn.neural_network import MLPRegressor
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.metrics import mean_squared_error
import pickle
import io

# Step 1: Load dataset from the API
response = requests.get("http://localhost:4000/api/v1/dataset/getdataset")
response.raise_for_status()
data = response.json()

# Step 2: Convert to DataFrame
df = pd.DataFrame(data)

# Step 3: Define features and target
feature_cols = ['crop_Type', 'Soil_Type', 'temp', 'plant_Size', 'month', 'farm_Type']
target_col = 'estimated_time'

X = df[feature_cols]
y = df[target_col]

# Step 4: Identify column types
categorical_features = ['crop_Type', 'Soil_Type', 'month', 'farm_Type']
numerical_features = ['temp', 'plant_Size']

# Step 5: Preprocessing
preprocessor = ColumnTransformer(transformers=[
    ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features),
    ('num', StandardScaler(), numerical_features)
])

# Step 6: Create pipeline with MLPRegressor
pipeline = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('regressor', MLPRegressor(
        hidden_layer_sizes=(100, 50),
        activation='relu',
        solver='adam',
        max_iter=1000,
        random_state=42
    ))
])

# Step 7: Train/test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Step 8: Train the model
pipeline.fit(X_train, y_train)

# Step 9: Evaluate the model
y_pred = pipeline.predict(X_test)
rmse = mean_squared_error(y_test, y_pred, squared=False)
print(f"Test RMSE: {rmse:.2f}")

# Step 10: Serialize model to binary using pickle
model_bytes = io.BytesIO()
pickle.dump(pipeline, model_bytes)
model_bytes.seek(0)

# Step 11: POST the model to the API
files = {
    'model': ('mlp_model.pkl', model_bytes, 'application/octet-stream')
}
upload_response = requests.post(
    "http://localhost:4000/ai/v1/dataset/updateModel",
    files=files
)

# Step 12: Confirm result
if upload_response.status_code == 200:
    print("MLP model uploaded successfully.")
else:
    print(f"Failed to upload model. Status code: {upload_response.status_code}")
    print(upload_response.text)
