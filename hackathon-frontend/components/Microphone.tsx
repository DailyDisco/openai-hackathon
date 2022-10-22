const Microphone = ({ }) => {
  return (
    <div className='live-recording'>
      <button
        className='bg-gradient-to-r from-red-400 to-pink-500 disabled:opacity-50 w-full p-2 rounded-md text-lg'
        // onClick={onSubmit}
        // disabled={props.isLoading || !isPromptValid}
      >
        Record Live!
      </button>
    </div>
  );
};

export default Microphone;
