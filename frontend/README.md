## **Project Description**

This frontend is a Single-Page Application (SPA) built using react, designed to interact with the backend Speech-to-Text Transcription API. Users can upload audio files, retrieve transcriptions, and search for transcriptions stored in the database. The application provides a user-friendly interface for managing audio-to-text conversion efficiently.
## **Technologies Used**

- **React**: Modern JavaScript framework for building a responsive UI.
- **Axios**: Handles API requests to communicate with the backend.
- **State Management**: React Context
# Project Structure
```bash
AI_speech_to_text/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FileUpload.js       
│   │   │   ├── TranscriptionList.js          
│   │   │   ├── TranscriptionSearch.js          
│   ├── App.js               
│   ├── App.css         
│   ├── index.css               
│   ├── index.js                
```

## **Pre-Requisites**
- Node.js: Version 18+
- Package Manager: npm
- Git bash (If using windows)

## **Installation Instructions**
### 1. Clone the Repository:
```bash
git clone https://github.com/mikechngwk/AI_speech_to_text.git
cd AI_speech_to_text/frontend
```
### 2. Install Dependencies:
Ensure you are in `/AI_speech_to_text/frontend` directory.
- Open **gitbash** in current directory and run (Windows):
- Open **terminal** in current directory and run (MacOS):

```bash
npm start
```
### 3. Test the React SPA
https://localhost:3000

## **Application Features**
**File Upload**
- Upload audio file for transcription


**Retrieve all transcriptions**

- List all transcriptions retrieved from the backend
- Show timestamp,filename and transcripted text

**Search transcription by filename**



- **Endpoint**: GET /search?query=<file_name>
- **Description**: Searches transcriptions by file name
- **Response**: 

### Frontend Page:
![image info](./images/frontend.png)

