import requests
import pandas as pd
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.metrics import mean_squared_error
import pickle
import io

# Step 1: Load dataset from the API
response = requests.get("http://localhost:4000/datasource/getdataset")
data = response.json()

# Convert to DataFrame
df = pd.DataFrame(data)

# Step 2: Define features and target
X = df.drop(columns=['time for receiving to specific depth'])
y = df['time for receiving to specific depth']

# Step 3: Preprocessing
categorical_features = ['soil type', 'month']
numerical_features = ['temperature', 'root depth']

preprocessor = ColumnTransformer(transformers=[
    ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)
], remainder='passthrough')  # keep numerical columns

# Step 4: Create pipeline with Gradient Boosting Regressor
pipeline = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('regressor', GradientBoostingRegressor(n_estimators=100, learning_rate=0.1, random_state=42))
])

# Step 5: Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Step 6: Train the model
pipeline.fit(X_train, y_train)

# (Optional) Evaluate the model
y_pred = pipeline.predict(X_test)
rmse = mean_squared_error(y_test, y_pred, squared=False)
print(f"Test RMSE: {rmse:.2f}")

# Step 7: Serialize model to binary using pickle
model_bytes = io.BytesIO()
pickle.dump(pipeline, model_bytes)
model_bytes.seek(0)

# Step 8: POST the model to the API
files = {'model': ('gradient_boosting_model.pkl', model_bytes, 'application/octet-stream')}
response = requests.post("http://localhost:4000/ai/v1/updateModel", files=files)

# Step 9: Confirm result
if response.status_code == 200:
    print("✅ Gradient Boosting model uploaded successfully.")
else:
    print(f"❌ Failed to upload model. Status code: {response.status_code}")
    print(response.text)
