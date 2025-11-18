# ml/app.py
from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np

app = FastAPI(title="Carbon ML Service")

class ProjectInput(BaseModel):
    project_id: str
    energy_generated_kwh: float
    weather_score: float
    grid_emission_factor: float

# load models
reg = joblib.load("ml/reg_model.joblib")
iso = joblib.load("ml/iso_model.joblib")

@app.post("/predict")
def predict(p: ProjectInput):
    X = [[p.energy_generated_kwh, p.weather_score, p.grid_emission_factor]]
    predicted_co2 = float(reg.predict(X)[0])

    # IsolationForest returns -1 for outlier, 1 for inlier; we can use decision_function for anomaly score
    df_score = iso.decision_function(X)[0]  # higher -> more normal

    normalized = max(min(df_score, 1.0), -1.0)
    fraud_score = (1.0 - ((normalized + 1.0) / 2.0)) * 100.0
    fraud_score = float(round(fraud_score, 2))

    # Confidence placeholder
    return {
        "project_id": p.project_id,
        "predicted_co2_tons": round(predicted_co2, 4),
        "fraud_score_percent": fraud_score,
        "meta": {"df_score": float(df_score)}
    }
