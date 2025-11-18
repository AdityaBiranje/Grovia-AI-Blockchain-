# ml/train.py
import pandas as pd
from sklearn.ensemble import RandomForestRegressor, IsolationForest
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.model_selection import train_test_split
import numpy as np
import joblib

df = pd.read_csv("energy_projects.csv")

# Features for regression & anomaly detector
feature_cols = ["Energy_Generated_kWh", "Weather_Score", "Grid_Emission_Factor"]
X = df[feature_cols]
y = df["CO2_Reduced_tons"]

# Regression model pipeline
reg_pipe = Pipeline([("scaler", StandardScaler()), ("rf", RandomForestRegressor(n_estimators=100, random_state=42))])
reg_pipe.fit(X, y)

# Anomaly detector on same features
iso = IsolationForest(n_estimators=100, contamination=0.1, random_state=42)
iso.fit(X)

#split data into train/test for accuracy evaluation 
X_train,X_test,y_train,y_test = train_test_split(X,y,test_size=0.2,random_state=42)

# Train the model again on train split
reg_pipe.fit(X_train,y_train)
# Predict on train split
y_pred = reg_pipe.predict(X_test)

# Calculate metrics
mae = mean_absolute_error(y_test, y_pred)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))
r2 = r2_score(y_test, y_pred)

print("MAE  :", mae)
print("RMSE :", rmse)
print("R^2  :", r2)

# Save models + scaler if needed
joblib.dump(reg_pipe, "reg_model.joblib")
joblib.dump(iso, "iso_model.joblib")

print("Saved reg_model.joblib and iso_model.joblib")
