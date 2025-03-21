# app/utils/file_utils.py
import os
import uuid

def get_unique_filename(filename: str) -> str:
    name, ext = os.path.splitext(filename)
    unique_name = f"{name}_{uuid.uuid4().hex}{ext}"
    return unique_name
