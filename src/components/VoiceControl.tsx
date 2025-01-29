import React, { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';

const VoiceControl: React.FC = () => {
  const [isListening, setIsListening] = useState(false);

  const toggleListening = () => {
    setIsListening(!isListening);
    // Voice recognition logic will be implemented here
  };

  return (
    <button
      onClick={toggleListening}
      className="fixed bottom-4 right-4 p-4 rounded-full bg-primary text-white shadow-lg hover:bg-primary-dark transition-colors"
      aria-label="Toggle voice control"
    >
      {isListening ? <Mic size={24} /> : <MicOff size={24} />}
    </button>
  );
};

export default VoiceControl;