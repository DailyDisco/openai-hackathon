import React from 'react'

const Reset = () => {

  const onReset = () => {
    setPrompt(''); // reset the prompt
    setHasResult(false);
    setIsLoading(false);
  };
  
  return (
    <div>Reset</div>
  )
}

export default Reset