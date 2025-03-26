# app/routers/search.py
from fastapi import APIRouter, Query
from app import models

router = APIRouter()

#This endpoint is for searching transcriptions by filename
@router.get("/search")
def search_transcriptions(filename: str = Query(..., description="Audio file name to search for")):
    filename_split = filename.split(".")
    filename_search = filename_split[0]
    results = models.search_transcriptions(filename_search)
    return {"results": results}
