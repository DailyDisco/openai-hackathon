import React from 'react';

const Reset = ({}) => {
  return (
    <button
      className='bg-gradient-to-r from-red-400 to-pink-500 disabled:opacity-50 w-full p-2 rounded-md text-lg'
      // onClick={onReset}
      // disabled={props.isLoading || !isPromptValid}
    >
      Record Live!
    </button>
  );
};

export default Reset;
