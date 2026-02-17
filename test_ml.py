import sys
import os

# Script is now inside ml-service, so direct import works


try:
    print("1. Testing Imports...")
    import pandas as pd
    import numpy as np
    from sklearn.linear_model import LinearRegression
    from model import predict_demand
    print("   [SUCCESS] All libraries imported.")
except ImportError as e:
    print(f"   [FAILURE] Import failed: {e}")
    sys.exit(1)

print("\n2. Testing Prediction Logic...")
dates = ["2023-01-01", "2023-01-02", "2023-01-03", "2023-01-04", "2023-01-05"]
quantities = [10, 12, 11, 13, 15]

try:
    prediction, stock = predict_demand(dates, quantities)
    print(f"   [SUCCESS] Prediction: {prediction}")
    print(f"   [SUCCESS] Recommended Stock: {stock}")
except Exception as e:
    print(f"   [FAILURE] Prediction failed: {e}")
    sys.exit(1)

print("\n[TEST COMPLETED SUCCESSFULLY]")
