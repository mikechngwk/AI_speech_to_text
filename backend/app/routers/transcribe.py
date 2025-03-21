
import os
import uuid
from fastapi import APIRouter, UploadFile, File, HTTPException
from utils import file_utils, whisper
import models
router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/transcribe")
async def transcribe_audio(file: UploadFile = File(...)):
    # Ensure the file name is unique by adding a UUID
    unique_filename = file_utils.get_unique_filename(file.filename)
    file_path = os.path.join(UPLOAD_DIR, unique_filename)

    #To ensure ffmpeg is added into the path variable read by venv
    os.environ["PATH"] += os.pathsep + r"C:\ffmpeg\bin"

    # Save the file to disk
    with open(file_path, "wb") as f:
        content = await file.read()
        f.write(content)

    # Debugging: Check if the file was saved successfully
    print(f"Saved file path: {file_path}")

    # Process audio with Whisper
    try:
        transcription = whisper.transcribe_audio(file_path)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Transcription error: {str(e)}")

    # Save transcription to the database (using models.py helper)
    models.save_transcription(unique_filename, transcription)

    return {"filename": unique_filename, "transcription": transcription}
