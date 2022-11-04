import { FC } from 'react';

interface WhisperProps {
  transcript: any;
  micTranscript: any;
}

const Whisper: FC<WhisperProps> = ({ transcript, micTranscript }) => {
  return (
    <div className='text-output'>
      <h3>Text Output</h3>
      <div className='large-box'>
        <p id='key-text'>{transcript}</p>
        <p id='key-text'>{micTranscript}</p>

      </div>
    </div>
  );
};

export default Whisper;
