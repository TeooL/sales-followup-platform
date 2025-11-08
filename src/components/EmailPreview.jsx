import React from 'react';

export default function EmailPreview({ email }) {
  return (
    <div className="border-l-4 border-indigo-500 bg-gray-50 p-4 rounded">
      <div className="mb-4">
        <span className="font-semibold text-gray-600">Subject:</span>
        <p className="text-gray-800 font-medium">{email.subject}</p>
      </div>
      <div>
        <span className="font-semibold text-gray-600">Body:</span>
        <div className="transcript-preview mt-2 whitespace-pre-wrap">
          {email.body}
        </div>
      </div>
    </div>
  );
}
