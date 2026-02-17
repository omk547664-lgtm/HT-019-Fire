
# AI Smart Inventory & Demand Prediction System - Run Guide

## 🚀 One-Click Setup (Recommended)
We have included a setup script that will check for dependencies and launch everything for you.

Simply run:
```bash
run_all.bat
```
This script will:
1.  Attempt to use a portable Node.js (if downloaded by the assistant).
2.  Install all Backend & Frontend dependencies.
3.  Set up the Python ML Environment.
4.  Launch all services.

---

## 🛠 Manual Setup
If the script fails, follow these steps:

### Prerequisites
- **Node.js**: Install from [nodejs.org](https://nodejs.org/).
- **Python 3.8+**: Install from [python.org](https://www.python.org/).

### 1. Setup Backend
```bash
cd backend
npm install
npm run dev
```

### 2. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

### 3. Setup ML Service
```bash
cd ml-service
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

## 4. Demo Login
- **Email:** admin@test.com
- **Password:** admin
