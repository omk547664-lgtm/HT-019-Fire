import pandas as pd
import numpy as np
import datetime

try:
    from sklearn.linear_model import LinearRegression
    SKLEARN_AVAILABLE = True
except ImportError:
    SKLEARN_AVAILABLE = False
    print("WARNING: scikit-learn not found. Using mock prediction model.")

def predict_demand(dates, quantities):
    if not SKLEARN_AVAILABLE:
        # Mock logic if sklearn fails to install
        print("Using Mock Prediction (sklearn missing)")
        avg_qty = sum(quantities) / len(quantities) if quantities else 0
        predictions = [int(avg_qty * (1 + np.random.uniform(-0.1, 0.1))) for _ in range(7)]
        recommended_stock = int(sum(predictions) * 1.2)
        return predictions, recommended_stock

    # Convert data to DataFrame
    df = pd.DataFrame({'date': pd.to_datetime(dates), 'quantity': quantities})
    df['date_ordinal'] = df['date'].map(datetime.datetime.toordinal)
    
    # Prepare X and y
    X = df[['date_ordinal']]
    y = df['quantity']
    
    # Train Linear Regression Model
    model = LinearRegression()
    model.fit(X, y)
    
    # Predict for next 7 days
    last_date = df['date'].max()
    future_dates = [last_date + datetime.timedelta(days=i) for i in range(1, 8)]
    future_ordinals = np.array([d.toordinal() for d in future_dates]).reshape(-1, 1)
    
    predictions = model.predict(future_ordinals)
    total_predicted_demand = np.sum(predictions)
    
    # Simple logic: Recommended stock = Total predicted + 20% safety buffer
    recommended_stock = int(total_predicted_demand * 1.2)
    
    return [max(0, int(p)) for p in predictions], recommended_stock
