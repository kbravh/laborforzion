import '../styles/globals.css';
import type {AppType} from 'next/dist/shared/lib/utils';
import Head from 'next/head';
import { Header } from '../components/header';
import { Footer } from '../components/footer';

const MyApp: AppType = ({Component, pageProps}) => {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <Head>
        <title key="title">kbravh</title>
        <meta
          key="description"
          name="description"
          content="Home on the internet for Karey Higuera"
        />
        <link
          key="favicon"
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
};

export default MyApp;
