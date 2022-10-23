import React from 'react';
import Microphone from './Microphone';

interface FormProps {
  onSubmit: any;
  isLoading: boolean;
  filename: any;
  setFilename: any;
  action: any;
  // onChange: any;
  data: any;
}

const Form: React.FC<FormProps> = ({
  onSubmit,
  isLoading,
  filename,
  setFilename,
  // onChange,
  action,
  data,
}) => {
  return (
    <div className='audio-container'>
      <div className='audio-upload-container'>
        <form
          onSubmit={onSubmit}
          action='http://127.0.0.1:5000/whisper'
          method='post'
          encType='multipart/form-data'
          // onChange={onChange}
        >
          <label htmlFor='audio-upload'>
            Upload Audio File:
            <br></br>
            <input
              type='file'
              name='audio-upload'
              id='audio-upload'
              accept='audio/*'
              // onChange={onChange}
            />
          </label>
          <br className='mt-2'></br>

          <button type='submit' value='submit'>Submit</button>
        </form>
      </div>
      {/* <Microphone onSubmit={onSubmit} /> */}
    </div>
  );
};

export default Form;
