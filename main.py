from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from model import predict_demand
import uvicorn

app = FastAPI()

class SalesData(BaseModel):
    date: str
    quantity: int

class PredictionRequest(BaseModel):
    sales_history: List[SalesData]

@app.get("/")
def read_root():
    return {"message": "ML Service is running"}

@app.post("/predict")
def get_prediction(request: PredictionRequest):
    try:
        # Extract dates and quantities
        dates = [item.date for item in request.sales_history]
        quantities = [item.quantity for item in request.sales_history]
        
        if len(quantities) < 5:
            raise HTTPException(status_code=400, detail="Not enough data points")

        prediction, recommended_stock = predict_demand(dates, quantities)
        
        return {
            "predicted_demand_next_7_days": prediction,
            "recommended_stock_level": recommended_stock
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)   