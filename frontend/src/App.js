import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import TranscriptionList from "./components/TranscriptionList";
import TranscriptionSearch from "./components/TranscriptionSearch";

const App = () => {
  const [transcriptions, setTranscriptions] = useState([]);
  const [transcriptionsUploaded, setTranscriptionsUploaded] = useState([]);

  const handleFileUpload = (data) => {
    setTranscriptionsUploaded((prevTranscriptionsUploaded) => [
      ...prevTranscriptionsUploaded,
      data,
    ]);
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        margin: "0",
        padding: "0",
        backgroundColor: "#f4f7fc",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Header Section */}
      <header
        style={{
          textAlign: "center",
          padding: "20px 0",
          backgroundColor: "#007bff",
          color: "white",
          width: "100%",
        }}
      >
        <h1 style={{ fontSize: "36px", margin: "0" }}>Audio Transcription</h1>
        <p style={{ fontSize: "18px", marginTop: "10px" }}>
          Upload your audio files to get automatic transcriptions.
        </p>
      </header>

      {/* Main Content */}
      <main
        style={{
          maxWidth: "1000px",
          width: "90%",
          marginTop: "30px",
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <section
          style={{
            marginBottom: "40px",
            padding: "20px",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2 style={{ textAlign: "center", color: "#333" }}>
            Upload a New File
          </h2>
          <FileUpload onFileUpload={handleFileUpload} />
        </section>

        <section
          style={{
            marginBottom: "40px",
            padding: "20px",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2 style={{ textAlign: "center", color: "#333" }}>
            Transcription List
          </h2>
          <TranscriptionList />
        </section>

        <section
          style={{
            padding: "20px",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2 style={{ textAlign: "center", color: "#333" }}>
            Search Transcriptions
          </h2>
          <TranscriptionSearch />
        </section>
      </main>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          marginTop: "50px",
          padding: "10px 0",
          backgroundColor: "#333",
          color: "white",
          width: "100%",
        }}
      >
        <p style={{ margin: "0", fontSize: "14px" }}>
          &copy; {new Date().getFullYear()} Audio Transcription. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
};

export default App;
