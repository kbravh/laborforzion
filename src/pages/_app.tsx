import '../styles/globals.css';
import type {AppType} from 'next/dist/shared/lib/utils';
import Head from 'next/head';
import { Header } from '../components/header';

const MyApp: AppType = ({Component, pageProps}) => {
  return (
    <div className="min-h-[calc(100vh_-_80px)] flex flex-col items-center selection:bg-emerald-900 selection:text-emerald-50">
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
    </div>
  );
};

export default MyApp;
