import React, { useState } from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import ProcessingStatus from './components/ProcessingStatus';
import ResultsDisplay from './components/ResultsDisplay';
import * as transcriptService from './services/neuralseekService';

function App() {
  const [currentPage, setCurrentPage] = useState('app');
  const [transcript, setTranscript] = useState('');
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState('');

const handleFileUpload = async (file) => {
  try {
    const result = await transcriptService.uploadTranscriptFile(file);
    console.log('Upload successful:', result);
    console.log(result.data.fn);
    setFileName(result.data.fn);
    // Use result.fileId for further processing
  } catch (error) {
    console.error('Upload failed:', error.message);
  }
};

  const handleProcess = async () => {
    if (!transcript.trim()) {
      setError('Please upload a transcript first');
      return;
    }

    setProcessing(true);
    setError(null);
    setCurrentPage('processing');

    try {
      const processedData = await transcriptService.processTranscript(transcript, fileName);
      setResults(processedData);
      setCurrentPage('results');
    } catch (err) {
      setError(err.message || 'Failed to process transcript');
      setCurrentPage('app');
    } finally {
      setProcessing(false);
    }
  };

  const handleReset = () => {
    setCurrentPage('app');
    setTranscript('');
    setResults(null);
    setError(null);
  };

  return (
    <div className="App">
      {currentPage === 'app' && (
        <div className="app-page">
          <div className="app-header">
            <h1>Sales Follow-Up Platform</h1>
            <p>AI-Powered Call Transcript Processing</p>
          </div>
          <div className="main-card">
            {error && <div className="error-banner">{error}</div>}
            
            <div className="upload-section">
              <FileUpload onFileUpload={handleFileUpload} useDirectUpload setTranscript={setTranscript} />
            </div>

            {transcript && (
              <div className="transcript-section">
                <h3 className="section-title">Transcript Preview</h3>
                <div className="transcript-preview">
                  {transcript}
                </div>
              </div>
            )}

            {transcript && (
              <button
                onClick={handleProcess}
                disabled={processing}
                className="btn btn-primary"
              >
                Process Transcript
              </button>
            )}
          </div>
        </div>
      )}

      {currentPage === 'processing' && (
        <div className="app-page">
          <div className="app-header">
            <h1>Processing</h1>
          </div>
          <ProcessingStatus />
        </div>
      )}

      {currentPage === 'results' && results && (
        <div className="app-page">
          <ResultsDisplay results={results} onReset={handleReset} />
        </div>
      )}
    </div>
  );
}

export default App;
