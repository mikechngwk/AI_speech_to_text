# app/routers/search.py
from fastapi import APIRouter, Query
from app import models

router = APIRouter()

@router.get("/search")
def search_transcriptions(filename: str = Query(..., description="Audio file name to search for")):
    results = models.search_transcriptions(filename)
    return {"results": results}
