import React from 'react';

const Codex = ({  }) => {
  return (
    <div className='code-conversion'>
      <h3>Code Conversion</h3>

      <select name='language-selector' id='language-selector'>
        <option value='javascript'>JavaScript</option>
        <option value='ruby'>Ruby</option>
        <option value='go'>Go</option>
      </select>
      <div className='large-box'>
        {/* <p>{secondSummary}</p> */}
        <p id='code-converted'>{}</p>
      </div>
    </div>
  );
};

export default Codex;
