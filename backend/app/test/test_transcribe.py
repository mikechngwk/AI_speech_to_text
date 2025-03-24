import pytest
from fastapi.testclient import TestClient
from app.main import app  # Adjust import path if necessary
from io import BytesIO

client = TestClient(app)

def test_transcribe_audio():
    #please include the filepath to a sample audio to be tested
    audio_path = "C:\\Users\\mikec\\PycharmProjects\\speechtotext\\backend\\app\\test\\uploads\\testaudio.mp3"

    with open(audio_path, "rb") as f:
        files = {"file": ("test_audio.mp3", f, "audio/mpeg")}

        response = client.post("/transcribe", files=files)

        print("this is response =", response.text)  # Print the response content

        assert response.status_code == 200

