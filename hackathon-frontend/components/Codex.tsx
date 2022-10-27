import React from 'react';
import { FC } from 'react';

interface CodexProps {
  secondSummary: any;
}

const Codex: FC<CodexProps> = ({ secondSummary }) => {
  return (
    <div className='code-conversion'>
      <h3>Code Conversion</h3>

      <select name='language-selector' id='language-selector'>
        <option value='javascript'>JavaScript</option>
        <option value='ruby'>Ruby</option>
        <option value='go'>Go</option>
      </select>
      <div className='large-box'>
        <p id='code-converted'>{secondSummary}</p>
      </div>
    </div>
  );
};

export default Codex;
