import Image from 'next/image';
import styles from '../styles/Home.module.css';
import React, { useState, useEffect } from 'react';
import Whisper from '../components/Whisper';
import Gpt from '../components/Gpt';
import Codex from '../components/Codex';
import Microphone from '../components/Microphone';
import Form from '../components/Form';
import Header from '../components/Header';
import Banner from '../components/Banner';

interface OpenAI {
  onSubmit: any;
  isLoading: boolean;
  characterLimit: number;
  filename: any;
  transcript: any;
  summary: any;
  secondSummary: any;
  results: any;
  onChange: any;
  action: any;
  // ENDPOINT: string;
  // props: any;
}

const Home: React.FC<OpenAI> = (props) => {
  // const CHARACTER_LIMIT: number = 128;
  //   here is where you can change the front end suggested prompt limit
  // const isPromptValid = props.prompt.length < props.characterLimit;

  // const ENDPOINT: string = 'http://127.0.0.1:5000/whisper';

  const [isLoading, setIsLoading] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [filename, setFilename] = useState('');
  const [transcript, setTranscript] = useState('');
  const [summary, setSummary] = useState('');
  const [secondSummary, setSecondSummary] = useState('');
  const [data, setData] = useState('');

  // // Using useEffect for single rendering
  // useEffect(() => {
  //   console.log('submitting useEffect form');
  //   setIsLoading(true);
  //   fetch('http://127.0.0.1:5000/whisper', {
  //     method: 'GET',
  //     headers: { 'Content-Type': 'application/json' },
  //   })
  //     .then((res) => res.json())
  //     .then(onResult)
  // }, []);

  const onSubmit = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // event.preventDefault();
    console.log('submitting onSubmit');
    setIsLoading(true);
    console.log('submitting setIsLoading');
    fetch('http://127.0.0.1:5000/whisper', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(onResult);
  };

  // const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   event.preventDefault();
  //   // setFilename(event.target.value);
  // };

  // this takes the json data when the user clicks the button and sets the state
  // gives you the snippet and keywords as variables you can use
  const onResult = (data: any) => {
    setSummary(data.summary);
    setHasResult(true);
    setIsLoading(false);
  };

  const onReset = () => {
    setHasResult(false);
    setIsLoading(false);
  };

  // let displayedElement = null;

  // if (hasResult) {
  //   displayedElement = <Whisper results={results} />;
  //   // keywords={keywords} throw this in there if you want to display the keywords for the user
  // } else {
  //   displayedElement = (
  //     <Form
  //       onSubmit={onSubmit}
  //       isLoading={isLoading}
  //       setFilename={setFilename}
  //       filename={filename}
  //       onChange={onChange}
  //       // characterLimit={CHARACTER_LIMIT}
  //     />
  //   );
  // }

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <Banner />
        <Form
          onSubmit={onSubmit}
          data={data}
          isLoading
          filename={filename}
          // onChange={onChange}
          setFilename={setFilename}
          action={onSubmit}
        />

        {/* Three sections */}
        <div id='output-boxes' className={styles.grid}>
          <Whisper />
          <Gpt />
          <Codex />
        </div>
      </main>
    </div>
  );
};

export default Home;
