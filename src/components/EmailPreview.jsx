import React from 'react';

export default function EmailPreview({ email }) {
  if (!email) {
    return (
      <div className="bg-gray-50 p-4 rounded" style={{ borderLeft: '4px solid #F3B82B' }}>
        <p className="text-gray-700">No email draft is available for this transcript.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-4 rounded" style={{ borderLeft: '4px solid #F3B82B' }}>
      <div className="mb-4">
        <span className="font-semibold" style={{ color: '#F3B82B' }}>Subject:</span>
        <p className="text-gray-800 font-medium">{email.subject}</p>
      </div>
      <div>
        <span className="font-semibold" style={{ color: '#F3B82B' }}>Body:</span>
        <div className="transcript-preview mt-2 whitespace-pre-wrap">
          {email.body}
        </div>
      </div>
    </div>
  );
}
