from fastapi import FastAPI
from app.routers import health, transcribe, transcriptions, search
from fastapi.middleware.cors import CORSMiddleware

# This is to initialize FastAPI, title you can choose whatever you like~ but good to be descriptive on its own
app = FastAPI(title="Speech to Text FastAPI_21032025")
@app.get("/")



def read_root():
    return {"message": "Test1!"}
# Include routers for different endpoints
app.include_router(health.router)
app.include_router(transcribe.router)
app.include_router(transcriptions.router)
app.include_router(search.router)

# CORS needs to be enabled so that frontend can access our backend API
app.add_middleware(
     CORSMiddleware,
     allow_origins=["*"],
     allow_credentials=True,
     allow_methods=["*"],
     allow_headers=["*"],
 )
