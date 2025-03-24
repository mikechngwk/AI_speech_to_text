import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = ({ onFileUpload }) => {  // Accept a callback prop
  const [file, setFile] = useState(null);
  const [transcription, setTranscription] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:8000/transcribe", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setTranscription(response.data);

      // Call the parent callback function with the uploaded transcription data
      if (onFileUpload) {
        onFileUpload(response.data); // Pass the data to the parent component (App)
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

{transcription && (
<> 
<p> File uploaded successfully. </p>
<p> Filename: {transcription.filename} </p>
<p> Transcription: {transcription.transcription} </p>
</>)}
    </div>
  );
};

export default FileUpload;