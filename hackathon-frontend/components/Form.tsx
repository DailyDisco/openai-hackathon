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
}

const Form: React.FC<FormProps> = ({
  onSubmit,
  data,
  res,
  formData,
  filename,
}) => {
  return (
    <div className='audio-container'>
      <div>
        <form
          className='flex flex-col flex-grow'
          onSubmit={onSubmit}
          method='POST'
          encType='multipart/form-data'
        >
          <label className='flex-1 m-auto' htmlFor='audio-upload'>
            Upload Audio File:
          </label>
          <input
            className='flex-2 mx-4 my-2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            type='file'
            id='file'
            name='audioUpload'
            accept='audio/*'
          />
          <button className='flex-3 m-auto mt-3 bg-gradient-to-r from-slate-400 to-blue-500 disabled:opacity-50 w-full p-2 rounded-md text-lg' type='submit'>
            Submit
          </button>
        </form>
        {/* <div>
          <p>{filename}</p>
        </div> */}
      </div>
    </div>
  );
};

export default Form;
