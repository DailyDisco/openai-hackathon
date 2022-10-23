import React, { useState } from 'react';
import Microphone from './Microphone';

interface FormProps {
  onSubmit: any;
  isLoading: boolean;
  filename: any;
  setFilename: any;
  action: any;
  data: any;
  onChange: any;
  res: any;
  formData: any;
  // audiofile: any;
}

const Form: React.FC<FormProps> = ({
  onSubmit,
  // onChange,
  action,
  data,
  res,
  formData,
  // filename,
  // audiofile,
}) => {
  // interface FormDataType {
  //   audioUpload: file;
  // }

  const [filename, setFilename] = useState(null);

  // const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   event.preventDefault();
  //   // setFilename(event.target.files[0]);
  // };

  return (
    <div className='audio-container'>
      <div className='audio-upload-container'>
        <form
          onSubmit={onSubmit}
          // onChange={onChange}
          // action='http://127.0.0.1:5000/whisper'
          method='POST'
          encType='multipart/form-data'
        >
          <label htmlFor='audio-upload'>
            Upload Audio File:
            <br></br>
          </label>
          <input
            type='file'
            id='file'
            name='audioUpload'
            accept='audio/*'
            // ref={audiofile}
            // value={filename}
            // onChange={onChange}
          />

          {/* <br className='mt-2'></br> */}

          <button type='submit'>Submit</button>
        </form>
      </div>
      {/* <Microphone onSubmit={onSubmit} /> */}
    </div>
  );
};

export default Form;
