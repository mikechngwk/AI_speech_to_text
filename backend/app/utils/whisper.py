import whisper

# Load the whisper-tiny model
model = whisper.load_model("tiny")


def transcribe_audio(file_path: str) -> str:

    result = model.transcribe(file_path)
    transcription = result.get("text", "").strip()
    return transcription
