import React, { useState } from 'react';
import { Copy, Download, RefreshCw } from 'lucide-react';
import JSONViewer from './JSONViewer';
import EmailPreview from './EmailPreview';

export default function ResultsDisplay({ results, onReset }) {
  const [copiedJson, setCopiedJson] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'json') {
      setCopiedJson(true);
      setTimeout(() => setCopiedJson(false), 2000);
    } else {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const downloadJSON = () => {
    const dataStr = JSON.stringify(results.json_data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `call_analysis_${results.json_data.call_id || 'export'}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="app-page-inner">
      <div className="app-header">
        <h1>Processing Complete</h1>
        <p>Your transcript has been successfully analyzed</p>
      </div>

      <div className="main-card">
        <div className="rounded-lg p-4 mb-6" style={{ backgroundColor: 'rgba(33, 36, 238, 0.81)', border: '2px solid #F3B82B' }}>
          <p style={{ color: '#F3B82B' }} className="font-medium">✓ Transcript processed successfully</p>
        </div>

        <div className="mb-8">
          <h3 className="section-title">Call Analysis (JSON)</h3>
          <JSONViewer data={results.json_data} />
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => copyToClipboard(JSON.stringify(results.json_data, null, 2), 'json')}
              className="btn btn-secondary flex items-center justify-center gap-2"
            >
              <Copy size={20} />
              {copiedJson ? 'Copied!' : 'Copy JSON'}
            </button>
            <button
              onClick={downloadJSON}
              className="btn btn-secondary flex items-center justify-center gap-2"
            >
              <Download size={20} />
              Download
            </button>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="section-title">Follow-up Email</h3>
          <EmailPreview email={results.email_draft} />
          <button
            onClick={() => copyToClipboard(results.email_draft.body, 'email')}
            className="btn btn-secondary flex items-center justify-center gap-2 mt-4"
          >
            <Copy size={20} />
            {copiedEmail ? 'Copied!' : 'Copy Email'}
          </button>
        </div>

        <button
          onClick={onReset}
          className="btn btn-primary flex items-center justify-center gap-2"
        >
          <RefreshCw size={20} />
          Process Another Transcript
        </button>
      </div>
    </div>
  );
}
