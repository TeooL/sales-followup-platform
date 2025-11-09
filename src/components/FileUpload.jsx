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
      className={`flex flex-col items-center justify-center w-full p-8 border-2 border-dashed rounded-lg transition cursor-pointer ${
        isDragActive
          ? 'border-[#F3B82B] bg-gradient-to-br from-[#1A8FC9] to-[#0D5A8F]'
          : 'border-[#F3B82B] bg-gradient-to-br from-[#1A8FC9] to-[#0D5A8F] hover:border-[#D4921F]'
      }`}
    >
      <input {...getInputProps()} />
      <Upload className={`h-32 w-32 mb-4 text-[#F3B82B]`} />
      <p className="text-lg font-medium text-[#F3B82B]">
        {isDragActive ? 'Drop the file here' : 'Drag & drop a .txt file here'}
      </p>
      <p className="text-sm text-[#F3B82B] opacity-80">or click to select a file</p>
    </div>
  );
}
