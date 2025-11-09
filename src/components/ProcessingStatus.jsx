import React from 'react';
import { Loader2, CheckCircle, Clock } from 'lucide-react';

export default function ProcessingStatus() {
  const steps = [
    { label: 'Extracting call data', icon: CheckCircle, completed: true },
    { label: 'Generating email', icon: Clock, completed: false, active: true },
    { label: 'Preparing results', icon: CheckCircle, completed: false }
  ];

  return (
    <div className="main-card text-center">
      <h2 className="text-2xl font-bold mb-8" style={{ color: '#2b6ef3ff' }}>Processing Transcript</h2>
      
      <div className="flex items-center justify-center mb-8">
        <Loader2 className="h-16 w-16 animate-spin" style={{ color: '##2b6ef3ff' }} />
      </div>

      <div className="space-y-4">
        {steps.map((step, idx) => (
          <div key={idx} className="flex items-center justify-center gap-3">
            {step.active ? (
              <Clock className="h-6 w-6 animate-pulse" style={{ color: '#42f32bff' }} />
            ) : (
              <CheckCircle className="h-6 w-6" style={{ color: '#2bf353ff' }} />
            )}
            <span className="text-gray-700 font-medium">{step.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
