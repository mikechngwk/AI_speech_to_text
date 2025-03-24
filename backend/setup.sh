#!/bin/bash

echo "Speech to Text backend startup script starting now"

# Check 1: Check for Python Installation
if ! command -v python &> /dev/null
then
    echo "Python not installed. Please install Python and try again."
    exit 1
fi

# Check 2: Create a Virtual Environment
echo "Creating a virtual environment"
python -m venv venv

# Check 3: Activate Virtual Environment
echo "Activating the virtual environment"
source venv/Scripts/activate

# Check 4: Install Dependencies
echo "Installing dependencies... this may take awhile"
pip install --upgrade pip
pip install -r requirements.txt

# Check 5: Run the FastAPI Server
echo "Starting the FastAPI server..."
uvicorn application.main:app --host 0.0.0.0 --port 8000

echo "Setup Complete! Access the API at http://localhost:8000"