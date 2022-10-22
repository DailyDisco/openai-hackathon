import React from 'react';

const Form = () => {
  return (
    <div className='audio-container'>
      <div className='audio-upload-container'>
        <form
          action='http://127.0.0.1:5000/whisper'
          method='post'
          encType='multipart/form-data'
          onSubmit={onSubmit}
        >
          <label htmlFor='audio-upload'>Upload Audio File</label>
          <input
            type='file'
            name='audio-upload'
            id='audio-upload'
            accept='audio/*'
          />
          <br className='mt-2'></br>
          <div>
            <input type='submit' value='Submit' />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
