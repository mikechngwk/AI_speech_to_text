// frontend/src/App.js

import React, { useState } from 'react';
import TranscriptionList from './components/TranscriptionList';
const App = () => {
  const [file, setFile] = useState(null);
  const [transcriptions, setTranscriptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [result, setResult] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('http://localhost:8000/transcribe', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    console.log(data);
  };

  const fetchTranscriptions = async () => {
    const response = await fetch('http://localhost:8000/transcriptions');
    const data = await response.json();
    setTranscriptions(data.transcriptions);
  };

  const searchTranscription = async () => {
    const response = await fetch(`http://localhost:8000/search?filename=${searchQuery}`);
    const data = await response.json();
    console.log(data.results)
    setResult(data.results[0]);
  };

  const clearFetchAllTranscriptions = async () => {
    setTranscriptions([])
  };

  const clearSearchedTranscriptions = async () => {
    setResult([])
  };

  return (
    <div>
      <h1>Audio Transcription</h1>

      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile}>Transcribe file</button>

      <div>
        <button onClick={fetchTranscriptions}>Get All Transcriptions</button>
        {transcriptions.map((transcription) => (<> 
          <div key={transcription.filename}>{transcription.filename}</div>
          <div key={transcription.created_at}>{transcription.created_at}</div>
          <div key={transcription.id}>{transcription.transcription}</div>
        </>

        ))}
         <button onClick={clearFetchAllTranscriptions}>Clear all transcriptions</button>
      </div>
      <div>
      <TranscriptionList/>
      </div>

      <div>
        <input
          type="text"
          placeholder="Search by filename"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button onClick={searchTranscription}>Search</button>
        {/* {result && <div>{result.transcription}</div>} */}
        {result.length > 0 && (<>
          <div> {result.transcription}</div>
          <div> Timestamp: {result.created_at}</div>
          <div> Filename: {result.filename}</div>
        </>
      ) }
      <button onClick={clearSearchedTranscriptions}>Clear Searched transcriptions</button>
      </div>
    </div>
  );
};

export default App;
