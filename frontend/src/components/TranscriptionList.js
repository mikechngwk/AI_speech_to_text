import React, { useEffect, useState } from "react";
import axios from "axios";
import { ContentCopy } from "@mui/icons-material";

const TranscriptionList = () => {
  const [transcriptions, setTranscriptions] = useState([]);
  const [fetchData, setFetchData] = useState(false);

  const fetchTranscriptions = async () => {
    setFetchData(true);
    const response = await fetch("http://localhost:8000/transcriptions");
    const data = await response.json();

    if (response.status === 200) {
      setFetchData(true);
      setTranscriptions(data.transcriptions);
    }
  };

  const clearFetchAllTranscriptions = async () => {
    setTranscriptions([]);
    setFetchData(false);
  };

  const handleCopy = (filename) => {
    // Remove the ".mp3" part before copying
    const filenameWithoutExtension = filename.replace(".mp3", "");
    navigator.clipboard
      .writeText(filenameWithoutExtension)
      .then(() => {
        // Optionally, you can add a message or visual feedback that the text was copied
        alert("Filename copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy text: ", error);
      });
  };

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", color: "#333" }}>All Transcriptions</h2>

      {/* Action Buttons */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button
          onClick={fetchTranscriptions}
          style={{
            padding: "10px 15px",
            fontSize: "16px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Get All Transcriptions
        </button>
        <button
          onClick={clearFetchAllTranscriptions}
          style={{
            padding: "10px 15px",
            fontSize: "16px",
            backgroundColor: "#dc3545",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Clear all transcriptions
        </button>
      </div>

      {/* Transcription List */}
      {fetchData && ( // Only show this section if fetching is completed
        <div>
          <h3 style={{ marginBottom: "10px", color: "#555" }}>
            Transcription Results: {transcriptions.length}
          </h3>
          {transcriptions.length > 0 ? (
            <ol style={{ paddingLeft: "20px", listStyleType: "decimal" }}>
              {transcriptions.map((item, index) => (
                <li
                  key={index}
                  style={{
                    backgroundColor: "#f9f9f9",
                    padding: "15px",
                    borderRadius: "8px",
                    marginBottom: "10px",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div
                    style={{
                      fontWeight: "bold",
                      marginBottom: "8px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {item.filename}
                    <ContentCopy
                      style={{ marginLeft: "10px", cursor: "pointer" }}
                      onClick={() => handleCopy(item.filename)}
                      titleAccess="Copy filename"
                    />
                  </div>
                  <div style={{ fontStyle: "italic", color: "#777" }}>
                    Created At: {item.created_at}
                  </div>
                  <div style={{ marginTop: "10px" }}>
                    <strong>Transcription:</strong> {item.transcription}
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <p>No transcriptions available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TranscriptionList;
