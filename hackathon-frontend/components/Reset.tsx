import React from 'react';
import { FC } from 'react';

interface ResetProps {
  onReset: any;
}

const Reset: FC<ResetProps> = ({ onReset }) => {
  return (
    <div className='reset-container'>
      <button
        className='bg-gradient-to-r from-red-400 to-red-500 disabled:opacity-50 w-full p-2 rounded-md text-lg'
        onClick={onReset}
        // disabled={props.isLoading || !isPromptValid}
      >
        Reset Form
      </button>
    </div>
  );
};

export default Reset;
