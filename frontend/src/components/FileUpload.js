import React, { useState } from "react";
import axios from "axios";

const FileUpload = ({ onFileUpload }) => {
  // Accept a callback prop
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
      const response = await axios.post(
        "http://localhost:8000/transcribe",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
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
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* File Input */}
      <div style={{ marginBottom: "20px" }}>
        <input
          data-testid="file-input"
          type="file"
          onChange={handleFileChange}
          style={{ padding: "10px", borderRadius: "5px", width: "100%" }}
        />
      </div>

      {/* Upload Button */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={handleUpload}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Upload
        </button>
      </div>

      {/* Transcription Details */}
      {transcription && (
        <div
          style={{
            backgroundColor: "#f9f9f9",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          <p
            style={{
              fontWeight: "bold",
              fontSize: "18px",
              marginBottom: "10px",
              color: "#28a745",
            }}
          >
            File uploaded successfully!
          </p>
          <div style={{ marginBottom: "10px" }}>
            <strong>Filename:</strong> {transcription.filename}
          </div>
          <div style={{ marginBottom: "10px" }}>
            <strong>Transcription:</strong> {transcription.transcription}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
