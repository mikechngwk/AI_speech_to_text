# app/routers/health.py
from fastapi import APIRouter

router = APIRouter()
# This is the endpoint that is part of the assignment requirement to check if service is up or not~
@router.get("/health")
def get_health():
    return {"status": "ok"}
