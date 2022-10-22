import { FC } from "react";

interface WhisperProps {
  transcript: any;
}

const Whisper: FC<WhisperProps> = ({ transcript }) => {
  return (
    <div className='text-output'>
      <h3>Text Output</h3>
      <div className='large-box'>
        {/* <p>{props.filename}</p> */}
        <p>{transcript}</p>
        <p id='key-text'></p>
      </div>
    </div>
  );
};

export default Whisper;
