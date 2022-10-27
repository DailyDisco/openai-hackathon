import React from 'react';
import { FC } from 'react';

interface GptProps {
  summary: any;
}

const Gpt: FC<GptProps> = ({ summary }) => {
  return (
    <div className='code-output'>
      <h3>Code Output</h3>
      <div className='large-box'>
        <p id='key-code'>{summary}</p>
      </div>
    </div>
  );
};

export default Gpt;
