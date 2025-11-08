import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

export default function FileUpload({ onFileUpload }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'text/plain': ['.txt']
    },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          onFileUpload(e.target.result);
        };
        reader.readAsText(file);
      }
    }
  });

  return (
    <div
      {...getRootProps()}
      className={`flex flex-col items-center justify-center w-full p-8 border-2 border-dashed rounded-lg transition ${
        isDragActive
          ? 'border-indigo-500 bg-indigo-50'
          : 'border-gray-300 hover:border-indigo-400'
      }`}
    >
      <input {...getInputProps()} />
      <Upload className={`h-32 w-32 mb-4 ${isDragActive ? 'text-indigo-600' : 'text-gray-400'}`} />
      <p className="text-lg font-medium text-gray-700">
        {isDragActive ? 'Drop the file here' : 'Drag & drop a .txt file here'}
      </p>
      <p className="text-sm text-gray-500">or click to select a file</p>
    </div>
  );
}
