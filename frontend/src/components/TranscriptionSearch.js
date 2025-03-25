import React, { useEffect, useState } from "react";
import axios from "axios";

const TranscriptionSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setResult] = useState(null);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const searchTranscription = async () => {
    const response = await fetch(
      `http://localhost:8000/search?filename=${searchQuery}`
    );
    const data = await response.json();
    setResult(data.results[0]);
  };

  const clearSearchedTranscriptions = async () => {
    setResult([]);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", color: "#333" }}>
        Transcription Search
      </h2>

      {/* Search Bar */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by filename..."
          style={{
            flex: "1",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button
          onClick={searchTranscription}
          style={{
            padding: "10px 15px",
            fontSize: "16px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>

      {/* Search Results */}
      {result && Object.keys(result).length > 0 ? (
        <div
          style={{
            backgroundColor: "#f9f9f9",
            padding: "15px",
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3 style={{ marginBottom: "10px", color: "#555" }}>
            Search Results: 1
          </h3>
          <p>
            <strong>Filename:</strong> {result.filename}
          </p>
          <p>
            <strong>Timestamp:</strong> {result.created_at}
          </p>
          <p>
            <strong>Transcription:</strong> {result.transcription}
          </p>
        </div>
      ) : (
        <p>No results found.</p>
      )}

      {/* Clear Button */}
      <button
        onClick={clearSearchedTranscriptions}
        style={{
          marginTop: "20px",
          padding: "10px 15px",
          fontSize: "16px",
          backgroundColor: "#dc3545",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Clear Searched Transcriptions
      </button>
    </div>
  );
};

export default TranscriptionSearch;
