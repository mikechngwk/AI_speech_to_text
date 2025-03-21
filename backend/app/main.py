# app/main.py
from fastapi import FastAPI
from routers import health, transcribe, transcriptions, search

app = FastAPI(title="Speech to Text FastAPI_21032025")
@app.get("/")
def read_root():
    return {"message": "Test1!"}
# Include routers for different endpoints
app.include_router(health.router)
app.include_router(transcribe.router)
app.include_router(transcriptions.router)
app.include_router(search.router)
