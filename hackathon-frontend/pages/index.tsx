import Image from 'next/image';
import styles from '../styles/Home.module.css';
import React, { useState, useEffect, useMemo } from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
import Whisper from '../components/Whisper';
import Gpt from '../components/Gpt';
import Codex from '../components/Codex';
import Microphone from '../components/Microphone';
import Form from '../components/Form';
import Header from '../components/Header';
import Banner from '../components/Banner';
import Reset from '../components/Reset';
import { Axios } from 'axios';
import { blob } from 'stream/consumers';

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
  micTranscript: any;
  setMicTranscript: any;
  isRecording: boolean;
  isBlocked: boolean;
  startRecording: any;
  stopRecording: any;
  blobURL: any;
  loading: boolean;
  audio: any;
  handleSubmit: any;
  // ENDPOINT: string;
}

const Home: React.FC<OpenAI> = ({ formData, onChange }) => {
  // const CHARACTER_LIMIT: number = 128;
  // const isPromptValid = props.prompt.length < props.characterLimit;
  // const ENDPOINT: string = 'http://127.0.0.1:5000/whisper';

  // const [micTranscript, setMicTranscript] = useState(null);
  // const [audio, setAudio] = useState();

  const [filename, setFilename] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [summary, setSummary] = useState('');
  const [secondSummary, setSecondSummary] = useState('');
  const [res, setRes] = useState(null);
  const [data, setData] = useState([]);
  const [display, setDisplay] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasResult, setHasResult] = useState(false);

  const [micTranscript, setMicTranscript] = useState(null);
  // const [loading, setLoading] = useState(false);
  const [audio, setAudio] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const [blobURL, setBlobURL] = useState('');
  const [isBlocked, setIsBlocked] = useState(false);

  const recorder = useMemo(() => new MicRecorder({ bitRate: 128 }), []);

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
        // loop through the data to turn it into an array
        const arr = Object.keys(data).map((key) => data[key]);
        // pass data to onResult which changes the loading and hasResult state
        onResult(data);
        // console.log(arr[0][0].filename);
        // console.log(arr[0][0].transcript);
        // console.log(arr[0][0].summary);
        // console.log(arr[0][0].secondSummary);

        // set the state of the filename, transcript, summary, and secondSummary
        setFilename(arr[0][0].filename);
        setTranscript(arr[0][0].transcript);
        setSummary(arr[0][0].summary);
        setSecondSummary(arr[0][0].secondSummary);

        // set the state of the data
        setDisplay(arr[0][0]);
        // display the data
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

  const startRecording = () => {
    if (isBlocked) {
      console.log('Permission Denied');
      setIsBlocked(true);
    } else {
      recorder
        .start()
        .then(() => {
          setIsRecording(true);
          console.log('recording');
        })
        .catch((e) => console.error(e));
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    console.log('stopped recording');
    recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const file = new File(buffer, 'test.mp3', {
          type: blob.type,
          lastModified: Date.now(),
        });
        setBlobURL(URL.createObjectURL(file));
        // Convert to base64
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
          setAudio(file);
          console.log('audio', audio);
        };
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsRecording(false);
    // setLoading(true);

    const formData = new FormData();
    formData.append('audioUpload', audio);

    console.log('using this file', audio);
    const audioFile = audio;
    console.log('audioFile', audioFile);
    console.log('requesting api');

    fetch('http://127.0.0.1:5000/whisper_mic', {
      method: 'POST',
      headers: {
        // 'Content-Type': 'application/json',
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .then((data) => {
        // loop through the data to turn it into an array
        const arr = Object.keys(data).map((key) => data[key]);
        console.log(arr);
        setMicTranscript(arr[0][0].transcript);
        setSummary(arr[0][0].summary);
        setSecondSummary(arr[0][0].secondSummary);
        console.log(summary);
        console.log(secondSummary);
        console.log(micTranscript);
      })
      .then((result) => {
        console.log('Success:', result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Header />
        <Banner />
        {/* <Form
          onSubmit={onSubmit}
          data={data}
          formData={formData}
          isLoading
          filename={filename}
          onChange={onChange}
          setFilename={setFilename}
          action={onSubmit}
          res={res}
        /> */}
        <Microphone
          isRecording={isRecording}
          isBlocked={isBlocked}
          startRecording={startRecording}
          stopRecording={stopRecording}
          blobURL={blobURL}
          micTranscript={micTranscript}
          handleSubmit={handleSubmit}
          audio={audio}
        />
        <Reset onReset={onReset} />

        {/* Three sections */}
        <div id='output-boxes' className={styles.grid}>
          <Whisper transcript={transcript} micTranscript={micTranscript} />
          <Gpt summary={summary} />
          <Codex secondSummary={secondSummary} />
        </div>
      </main>
    </div>
  );
};

export default Home;
