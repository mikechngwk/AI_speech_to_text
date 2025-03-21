# app/utils/whisper.py
import whisper

# Load the whisper-tiny model
model = whisper.load_model("tiny")


def transcribe_audio(file_path: str) -> str:
    # Optionally add preprocessing for the audio file if needed
    # For example, convert format, trim silence, etc.

    result = model.transcribe(file_path)
    transcription = result.get("text", "").strip()
    return transcription
