import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

export default function FileUpload({ onFileUpload, setTranscript, useDirectUpload = false }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'text/plain': ['.txt'],
      'audio/*': ['.mp3', '.wav', '.m4a', '.ogg'],
      'video/*': ['.mp4', '.webm']
    },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        
        if (useDirectUpload) {
          // For direct multipart/form-data upload to /explore/upload
          // onFileUpload(file, 'file');
        
          // Read file as text asynchronously
          const reader = new FileReader();
          reader.onload = (e) => {
            const fileContent = e.target.result;
            setTranscript(fileContent);
            onFileUpload(file);
            console.log('File content loaded:', fileContent);

          };
          reader.onerror = () => {
            console.error('Error reading file');
          };
          reader.readAsText(file);
        }
      }
    }
  });

  return (
    <div
      {...getRootProps()}
      className={`flex flex-col items-center justify-center w-full p-8 border-2 border-dashed rounded-lg transition cursor-pointer ${
        isDragActive
          ? 'border-[#F3B82B] bg-gradient-to-br from-[#1A8FC9] to-[#0D5A8F]'
          : 'border-[#F3B82B] bg-gradient-to-br from-[#1A8FC9] to-[#0D5A8F] hover:border-[#D4921F]'
      }`}
    >
      <input {...getInputProps()} />
      <Upload className={`h-32 w-32 mb-4 text-[#F3B82B]`} />
      <p className="text-lg font-medium text-[#F3B82B]">
        {isDragActive ? 'Drop the file here' : 'Drag & drop a file here'}
      </p>
      <p className="text-sm text-[#F3B82B] opacity-80">or click to select a file</p>
      <p className="text-xs text-[#F3B82B] opacity-60 mt-2">Supported: .txt, .mp3, .wav, .mp4, etc.</p>
    </div>
  );
}
