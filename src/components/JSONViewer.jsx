import React from 'react';

export default function JSONViewer({ data }) {
  return (
    <div className="transcript-preview">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
