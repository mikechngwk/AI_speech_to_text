# app/routers/transcriptions.py
from fastapi import APIRouter
from app import models

router = APIRouter()

@router.get("/transcriptions")
def get_transcriptions():
    transcriptions = models.get_all_transcriptions()
    return {"transcriptions": transcriptions}
