# Use Python 3.12.3 as a parent image
FROM python:3.12.3-slim

#Set environment variables to prevent Python buffering and create pyc files
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

#Set working directory
WORKDIR /app

#Install system dependencies including ffmpeg <-- this is part of the pre-requisite
RUN apt-get update && apt-get install -y ffmpeg && rm -rf /var/lib/apt/lists/*

# opy the requirements file and install dependencies
COPY requirements.txt /app/
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

#Copy the rest of the application code
COPY . /app/

#Expose the port FastAPI will run on <-- standard port for backend 8000
#our frontend is referencing to this port  8000 for backend too
EXPOSE 8000

#Run the FastAPI application with uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
