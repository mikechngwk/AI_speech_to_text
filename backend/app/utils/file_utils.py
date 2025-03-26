
import os
import uuid

#Generates a unique filename by adding an unique identifier to the original filename.
# #in case user upload the same file more than once
def get_unique_filename(filename: str) -> str:
    name, ext = os.path.splitext(filename)
    unique_name = f"{name}_{uuid.uuid4().hex}{ext}"
    return unique_name
