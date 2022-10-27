import Head from 'next/head';
import React from 'react';

const Header = () => {
  return (
    <Head>
      <title>Programming Language Translator</title>
      <meta
        name='description'
        content='Transform any code using text input to other programming languages'
      />
      {/* <link rel='icon' href='/favicon.ico' /> */}
    </Head>
  );
};

export default Header;
