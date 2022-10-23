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
import axios from 'axios';

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
  formData: any;
  setFilename: any;
  // ENDPOINT: string;
  // props: any;
  // audiofile: any;
  res: any;
}

const Home: React.FC<OpenAI> = (formData, filename, setFilename, onChange) => {
  // const CHARACTER_LIMIT: number = 128;
  //   here is where you can change the front end suggested prompt limit
  // const isPromptValid = props.prompt.length < props.characterLimit;

  // const ENDPOINT: string = 'http://127.0.0.1:5000/whisper';

  const [transcript, setTranscript] = useState('');
  const [summary, setSummary] = useState('');
  const [secondSummary, setSecondSummary] = useState('');
  const [data, setData] = useState([]);
  const [res, setRes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasResult, setHasResult] = useState(false);

  // // Using useEffect for single rendering
  // useEffect(() => {
  //   if (res.length > 0) {
  //     setHasResult(true);
  //     setTranscript(res[0]);
  //     setSummary(res[1]);
  //     setSecondSummary(res[2]);
  //   }
  // }, []);

  const onSubmit = async (
    event: React.ChangeEvent<HTMLInputElement>,
    res: any,
    filename: any
  ) => {
    // Select your input type file and store it in a variable
    const fileField = document.querySelector('input[type="file"]');

    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData();

    formData.append('audioUpload', '');
    formData.append('audioUpload', fileField.files[0]);

    fetch('http://127.0.0.1:5000/whisper', {
      method: 'POST',
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      // },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        onResult(data);
      })
      .then((result) => {
        console.log('Success:', result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    // // .then(onResult);
    return res;
  };

  // this takes the json data when the user clicks the button and sets the state
  // gives you the snippet and keywords as variables you can use
  const onResult = (data: any) => {
    console.log(data);



    setTranscript(data[0]);
    setSummary(data[1]);
    setSecondSummary(data[2]);

    setIsLoading(false);
    setHasResult(true);
    console.log('results are updated');
  };

  const onReset = () => {
    setHasResult(false);
    setIsLoading(false);
  };

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <Banner />
        <Form
          // audiofile={audiofile}
          onSubmit={onSubmit}
          data={data}
          formData={formData}
          isLoading
          filename={filename}
          onChange={onChange}
          setFilename={setFilename}
          action={onSubmit}
          res={res}
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
