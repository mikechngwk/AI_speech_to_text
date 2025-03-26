import os
import pytest
from fastapi.testclient import TestClient
from app.main import app  # Adjust import path if necessary

client = TestClient(app)

#To test if audio is transcribed and api returns a good response
def test_transcribe_audio():
    #relative path to the audiofile
    base_path = os.path.dirname(os.path.abspath(__file__))
    audio_path = os.path.join(base_path, "uploads", "testaudio.mp3")

    with open(audio_path, "rb") as f:
        files = {"file": ("test_audio.mp3", f, "audio/mpeg")}

        response = client.post("/transcribe", files=files)

        print("this is response =", response.text)

        assert response.status_code == 200
