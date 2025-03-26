# app/routers/transcriptions.py
from fastapi import APIRouter
from app import models

router = APIRouter()
#This endpoint gets all the transcribed audio files
@router.get("/transcriptions")
def get_transcriptions():
    transcriptions = models.get_all_transcriptions()
    return {"transcriptions": transcriptions}
