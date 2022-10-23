import { FC } from 'react';

interface WhisperProps {
  transcript: any;
}

const Whisper: FC<WhisperProps> = ({ transcript }) => {
  return (
    <div className='text-output'>
      <h3>Text Output</h3>
      <div className='large-box'>
        <p id='key-text'>{transcript}</p>
      </div>
    </div>
  );
};

export default Whisper;
