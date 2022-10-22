import Image from 'next/image';
import styles from '../styles/Home.module.css';
import React, { useState, useEffect } from 'react';
import Whisper from '../components/Whisper';
import Gpt from '../components/Gpt';
import Codex from '../components/Codex';
import Microphone from '../components/Microphone';
import Form from '../components/Form';
import Header from '../components/Header';

interface OpenAI {
  prompt: string;
  setPrompt: any;
  onSubmit: any;
  isLoading: boolean;
  characterLimit: number;
  filename: any;
  transcript: any;
  summary: any;
  secondSummary: any;
  results: any;
  props: any;
}

const Home: React.FC<OpenAI> = (props) => {
  const CHARACTER_LIMIT: number = 128;

  const ENDPOINT: string = 'http://127.0.0.1:5000/whisper';

  const [prompt, setPrompt] = React.useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  // const [filename, setFilename] = useState('');
  // const [transcript, setTranscript] = useState('');
  // const [summary, setSummary] = useState('');
  // const [secondSummary, setSecondSummary] = useState('');

  // useState for setting a javascript
  // object for storing and using data
  const [data, setData] = useState({
    filename: '',
    transcript: '',
    summary: '',
    secondSummary: '',
  });

    // // Using useEffect for single rendering
  // useEffect(() => {
  //   // Using fetch to fetch the api from
  //   // flask server it will be redirected to proxy
  //   );
  // }, []);

  const onSubmit = async () => {
    console.log('submitting: ' + prompt);
    setIsLoading(true);
    fetch(`${ENDPOINT}`)
      .then((res) => res.json())
      .then((data) => {
        // Setting a data from api
        setData({
          filename: data.Filename,
          transcript: data.Transcript,
          summary: data.Summary,
          secondSummary: data.SecondSummary,
        });
      });
    console.log(data);
  };
  

  // this takes the json data when the user clicks the button and sets the state
  // gives you the snippet and keywords as variables you can use
  const onResult = (data: any) => {
    // setFilename(data.results.filename);
    // setTranscript(data.results[1]);
    // setSummary(data.results[2]);
    // setSecondSummary(data.results[3]);
    // setKeywords(data.keywords);
    setHasResult(true);
    setIsLoading(false);
  };

  const onReset = () => {
    setPrompt(''); // reset the prompt
    setHasResult(false);
    setIsLoading(false);
  };

  let displayedElement = null;

  // here is where you can change the front end suggested prompt limit
  // const isPromptValid = props.prompt.length < props.characterLimit;

  // const updatePromptValue = (text: string) => {
  //   if (text.length <= props.characterLimit) {
  //     props.setPrompt(text);
  //   }
  // };

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to our Project!</h1>

        <h2>OpenAI Whisper Hackathon</h2>

        <div className='line'></div>

        <Form onSubmit={onSubmit} />

        {/* Three sections */}
        <div id='output-boxes' className={styles.grid}>
          <Whisper transcript={data.transcript} />
          <Gpt />
          <Codex />
        </div>
      </main>
    </div>
  );
};

export default Home;
