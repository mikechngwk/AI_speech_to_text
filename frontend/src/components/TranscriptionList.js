import React, { useEffect, useState } from "react";
import axios from "axios";

const TranscriptionList = () => {
  const [transcriptions, setTranscriptions] = useState([]);

  useEffect(() => {
    // Fetch transcriptions when component loads
    axios.get("http://localhost:8000/transcriptions")
      .then(response => {
        setTranscriptions(response.data); // Assuming response is a list of transcriptions
      })
      .catch(error => {
        console.error("Error fetching transcriptions:", error);
      });
  }, []);
  console.log(transcriptions.length)
  return (
    <div>
      <h2>All Transcriptions</h2>
      <ul>
        {transcriptions.length > 0 ? (
          transcriptions.map((item) => (
            <li key={item.id}>
              <strong>{item.transcription}:</strong> {item.transcription}
            </li>
          ))
        ) : (
          <p>No transcriptions available.</p>
        )}
      </ul>
    </div>
  );
};

export default TranscriptionList;
