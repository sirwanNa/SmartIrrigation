import requests
import pandas as pd
import numpy as np
import io
import tempfile
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, SimpleRNN
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import EarlyStopping
from tensorflow.keras.models import load_model
from tensorflow.keras import Input
import joblib

# Step 1: Load dataset
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

# Fit and transform
X_processed = preprocessor.fit_transform(X)

# Step 6: Prepare data for RNN (3D input)
X_array = X_processed.toarray() if hasattr(X_processed, "toarray") else X_processed
X_rnn = X_array.reshape((X_array.shape[0], 1, X_array.shape[1]))

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X_rnn, y, test_size=0.2, random_state=42)

# Step 7: Define RNN model
model = Sequential([
    Input(shape=(1, X_rnn.shape[2])),
    SimpleRNN(64, activation='tanh'),
    Dense(32, activation='relu'),
    Dense(1)  # Regression output
])

model.compile(optimizer=Adam(learning_rate=0.001), loss='mse', metrics=['mae'])

# Step 8: Train model
early_stop = EarlyStopping(patience=10, restore_best_weights=True)
model.fit(X_train, y_train, epochs=100, batch_size=16, validation_split=0.1, callbacks=[early_stop], verbose=0)

# Step 9: Evaluate
loss, mae = model.evaluate(X_test, y_test, verbose=0)
print(f"Test MAE: {mae:.2f}")

# Step 10: Save model to temp file and upload
with tempfile.NamedTemporaryFile(suffix=".h5") as tmp:
    model.save(tmp.name)
    tmp.seek(0)
    files = {
        'model': ('rnn_model.h5', tmp, 'application/octet-stream')
    }
    upload_response = requests.post(
        "http://localhost:4000/ai/v1/dataset/updateModel",
        files=files
    )

# Step 11: Confirm result
if upload_response.status_code == 200:
    print("RNN model uploaded successfully.")
else:
    print(f"Failed to upload model. Status code: {upload_response.status_code}")
    print(upload_response.text)
