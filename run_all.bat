@echo off
echo ===================================================
echo   AI Smart Inventory System - One-Click Setup
echo ===================================================

:: Add portable node to PATH if exists
if exist "%~dp0..\.tools\node\node.exe" (
    echo [INFO] Found portable Node.js at %~dp0..\.tools\node
    set "PATH=%~dp0..\.tools\node;%PATH%"
) else (
    echo [DEBUG] Portable node not found at %~dp0..\.tools\node
)

:: Add standard node to PATH if exists
if exist "C:\Program Files\nodejs\node.exe" (
    echo [INFO] Found installed Node.js in Program Files...
    set "PATH=C:\Program Files\nodejs;%PATH%"
)

echo [DEBUG] Checking node version:
node -v || echo [ERROR] Node not found!
echo [DEBUG] Checking npm version:
call npm -v || echo [ERROR] NPM not found!

echo.
echo [1/3] Setting up Backend...
cd backend
if not exist node_modules (
    echo Installing Backend Dependencies...
    call npm install
) else (
    echo Backend dependencies already installed.
)
start "Backend Server" cmd /k npm run dev

echo.
echo [2/3] Setting up Content...
cd ../frontend
if not exist node_modules (
    echo Installing Frontend Dependencies...
    call npm install
) else (
    echo Frontend dependencies already installed.
)
start "Frontend Dashboard" cmd /k npm run dev

echo.
echo [3/3] Setting up ML Service...
cd ../ml-service
if not exist venv (
    echo Creating Python Virtual Environment...
    python -m venv venv
)
call venv\Scripts\activate
echo Installing ML Dependencies...
pip install -r requirements.txt
start "ML Service" cmd /k uvicorn main:app --host 0.0.0.0 --port 8000 --reload

echo.
echo ===================================================
echo   All systems launching!
echo   - Backend: http://localhost:5000
echo   - Frontend: http://localhost:5173
echo   - ML Service: http://localhost:8000
echo ===================================================
pause
