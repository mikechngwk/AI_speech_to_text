import whisper

#Load the whisper-tiny model
#This is a relatively small project, if project is being in production we can change the size of model
model = whisper.load_model("tiny")


def transcribe_audio(file_path: str) -> str:
    result = model.transcribe(file_path)
    transcription = result.get("text", "").strip()
    return transcription
