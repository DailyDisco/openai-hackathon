import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to our Project!
        </h1>

        <h2>OpenAI Whisper Hackathon</h2>

        <div className="line"></div>

        <div className="audio-container">
          <div className="audio-upload-container">
            <label htmlFor="audio-upload">Upload Audio File</label>
            <input type="audio" name="audio-upload" id="audio-upload" />
          </div>
          <div className="live-recording">
            <button id="recording">Record Live!</button>
          </div>
        </div>

        <div id="output-boxes" className={styles.grid}>
          <div className="text-output">
            <h3>Text Output</h3>
            <p id="key-text"></p>
            <div className="large-box"></div>
          </div>
          <div className="code-output">
            <h3>Code Output</h3>
            <p id="key-code"></p>
            <div className="large-box"></div>
          </div>
          <div className="code-conversion">
            <h3>Code Conversion</h3>
            <p id="code-converted"></p>
            <div className="large-box"></div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home