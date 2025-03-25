#!/bin/bash

echo "Speech to Text backend startup script starting now"

#Check 1: Check for Python Installation
if ! command -v python &> /dev/null
then
    echo "Python not installed. Please install Python and try again."
    exit 1
fi

#Check 2: Create a Virtual Environment
echo "Creating a virtual environment"
python -m venv venv

#Check 3: Activate Virtual Environment
echo "Activating the virtual environment"

# For macOS/Linux, use source to activate
if [[ "$OSTYPE" == "darwin"* ]] || [[ "$OSTYPE" == "linux-gnu"* ]]; then
    source venv/bin/activate
# For Windows, use the activate script in the Scripts folder
elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
    source venv/Scripts/activate
else
    echo "Unsupported OS. Please use macOS, Linux, or Windows."
    exit 1
fi

#Check 4: Install Dependencies
echo "Installing dependencies... this may take a while"
pip install --upgrade pip
cd backend
pip install -r requirements.txt

#Check 5: Run the FastAPI Server
echo "Starting the FastAPI server..."
uvicorn app.main:app

echo "Setup Complete! Access the API at http://127.0.0.1:8000/docs#"
