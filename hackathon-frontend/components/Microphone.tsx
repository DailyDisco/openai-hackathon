import { FC, useState, useMemo } from 'react';
import styles from '../styles/Home.module.css';

const Microphone = ({
  isRecording,
  isBlocked,
  startRecording,
  stopRecording,
  blobURL,
  loading,
  micTranscript,
  handleSubmit,
  audio,
}) => {
  // const [transcript, setTranscript] = useState(null);
  // const [micTranscript, setMicTranscript] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [audio, setAudio] = useState();
  // const [isRecording, setIsRecording] = useState(false);
  // const [blobURL, setBlobURL] = useState('');
  // const [isBlocked, setIsBlocked] = useState(false);

  // const recorder = useMemo(() => new MicRecorder({ bitRate: 128 }), []);

  // const startRecording = () => {
  //   if (isBlocked) {
  //     console.log('Permission Denied');
  //     setIsBlocked(true);
  //   } else {
  //     recorder
  //       .start()
  //       .then(() => {
  //         setIsRecording(true);
  //         console.log('recording');
  //       })
  //       .catch((e) => console.error(e));
  //   }
  // };

  // const stopRecording = () => {
  //   setIsRecording(false);
  //   console.log('stopped recording');
  //   recorder
  //     .stop()
  //     .getMp3()
  //     .then(([buffer, blob]) => {
  //       const file = new File(buffer, 'test.mp3', {
  //         type: blob.type,
  //         lastModified: Date.now(),
  //       });
  //       setBlobURL(URL.createObjectURL(file));
  //       // Convert to base64
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file);
  //       reader.onloadend = function () {
  //         setAudio(file);
  //         console.log('audio', audio);
  //       };
  //     });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsRecording(false);
  //   setLoading(true);

  //   const formData = new FormData();
  //   formData.append('audioUpload', audio);

  //   console.log('using this file', audio);
  //   const audioFile = audio;
  //   console.log('audioFile', audioFile);
  //   console.log('requesting api');

  //   fetch('http://127.0.0.1:5000/whisper_mic', {
  //     method: 'POST',
  //     headers: {
  //       // 'Content-Type': 'application/json',
  //     },
  //     body: formData,
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       return data;
  //     })
  //     .then((data) => {
  //       // loop through the data to turn it into an array
  //       const arr = Object.keys(data).map((key) => data[key]);
  //       console.log(arr);
  //       setMicTranscript(arr[0][0].transcript);
  //       console.log(micTranscript);
  //       setLoading(false);
  //       return micTranscript;
  //       return data;
  //     })
  //     .then((result) => {
  //       console.log('Success:', result);
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });
  // };

  return (
    <div className='live-recording'>
      <p className={styles.description}>
        {' '}
        Record audio to generate a transcript.{' '}
      </p>
      {isRecording ? (
        <p className={styles.warning}> Recording in progress... </p>
      ) : (
        <p className={styles.warning}>
          {' '}
          Requires browser microphone permission.{' '}
        </p>
      )}
      {isBlocked ? (
        <p className={styles.blocked}> Microphone access is blocked. </p>
      ) : null}
      <div className={styles.whispercontainer}>
        <div className={styles.allbuttons}>
          <button
            onClick={startRecording}
            disabled={isRecording}
            className={styles.recordbutton}
          >
            Record
          </button>
          <button
            onClick={stopRecording}
            disabled={!isRecording}
            className={styles.stopbutton}
          >
            Stop
          </button>
        </div>

        <div className={styles.audiopreview}>
          <audio src={blobURL} controls='controls' />
        </div>
        <div className={styles.loading}>
          {loading ? <p>Loading... please wait.</p> : <p>Results: {micTranscript}</p>}
        </div>
        <div className={styles.generatebuttonroot}>
          <button
            type='submit'
            className={styles.generatebutton}
            onClick={handleSubmit}
            disabled={!audio}
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
};

export default Microphone;
