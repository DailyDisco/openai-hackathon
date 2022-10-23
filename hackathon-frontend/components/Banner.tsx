import React from 'react';
import styles from '../styles/Home.module.css';

const Banner = () => {
  return (
    <div>
      <h1 className={styles.title}>Welcome to our Project!</h1>

      <h2 className='flex justify-center'>OpenAI Whisper Hackathon</h2>

      <div className='mx-auto line'></div>
    </div>
  );
};

export default Banner;
