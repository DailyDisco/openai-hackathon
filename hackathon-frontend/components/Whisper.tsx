import { FC } from 'react';

interface WhisperProps {}

const Whisper: FC<WhisperProps> = ({}) => {
  return (
    <div className='text-output'>
      <h3>Text Output</h3>
      <div className='large-box'>
        <p id='key-text'></p>
      </div>
    </div>
  );
};

export default Whisper;
