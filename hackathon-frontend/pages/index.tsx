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
import Reset from '../components/Reset';

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
  setSummary: any;
  res: any;
  arr: any;
  // ENDPOINT: string;
}

const Home: React.FC<OpenAI> = (formData, onChange) => {
  // const CHARACTER_LIMIT: number = 128;
  // const isPromptValid = props.prompt.length < props.characterLimit;
  // const ENDPOINT: string = 'http://127.0.0.1:5000/whisper';

  const [filename, setFilename] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [summary, setSummary] = useState('');
  const [secondSummary, setSecondSummary] = useState('');
  const [res, setRes] = useState(null);
  const [data, setData] = useState([]);
  const [display, setDisplay] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasResult, setHasResult] = useState(false);

  const onSubmit = async (
    event: React.ChangeEvent<HTMLInputElement>,
    res: any
  ) => {
    // Select your input type file and store it in a variable
    const fileField = document.querySelector('input[type="file"]');

    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData();

    // not sure if we need the line right after this one
    // formData.append('audioUpload', '');
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
        return data;
      })
      .then((data) => {
        const arr = Object.keys(data).map((key) => data[key]);
        onResult(data);
        console.log(arr[0][0].filename);
        console.log(arr[0][0].transcript);
        console.log(arr[0][0].summary);
        console.log(arr[0][0].secondSummary);

        setFilename(arr[0][0].filename);
        setTranscript(arr[0][0].transcript);
        setSummary(arr[0][0].summary);
        setSecondSummary(arr[0][0].secondSummary);

        setDisplay(arr[0][0]);
        console.log(display);
      })
      .then((result) => {
        console.log('Success:', result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    return res;
  };

  // this takes the json data when the user clicks the button and sets the state
  // gives you the snippet and keywords as variables you can use
  const onResult = (data: any) => {
    console.log('start of onResult');
    setIsLoading(false);
    setHasResult(true);
    console.log('end of onResult');
  };

  const onReset = () => {
    setFilename(null);
    setTranscript('');
    setSummary('');
    setSecondSummary('');
    setRes(null);
    setData([]);
    setDisplay(null);
    setIsLoading(false);
    setHasResult(false);
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Header />
        <Banner />
        <Form
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
        {/* <Microphone /> */}
        <Reset onReset={onReset} />

        {/* Three sections */}
        <div id='output-boxes' className={styles.grid}>
          <Whisper transcript={transcript} />
          <Gpt summary={summary} />
          <Codex secondSummary={secondSummary} />
        </div>
      </main>
    </div>
  );
};

export default Home;
