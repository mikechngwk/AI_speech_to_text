# app/main.py
from fastapi import FastAPI
from app.routers import health, transcribe, transcriptions, search
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Speech to Text FastAPI_21032025")
@app.get("/")
def read_root():
    return {"message": "Test1!"}
# Include routers for different endpoints
app.include_router(health.router)
app.include_router(transcribe.router)
app.include_router(transcriptions.router)
app.include_router(search.router)

