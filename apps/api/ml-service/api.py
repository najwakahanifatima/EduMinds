from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np

app = FastAPI()
model = joblib.load("career_model.pkl")

class InputData(BaseModel):
    Tanaman: int
    Interaksi: int
    Masak: int
    Kebersihan: int
    Uang: int
    Tenang: int

career_labels = {
    0: "Florist",
    1: "Kasir",
    2: "Barista",
    3: "Cleaning Service",
    4: "Koki"
}

@app.post("/predict")
def predict(data: InputData):
    input_array = np.array([[data.Tanaman, data.Interaksi, data.Masak, data.Kebersihan, data.Uang, data.Tenang]])
    prediction = model.predict(input_array)
    career_id = int(prediction[0])
    return {"career": career_labels[career_id]}