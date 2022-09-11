import type {NextPage} from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Labor for Zion</title>
        <meta
          name="description"
          content="A collection of notes, talks, and tools centered around gospel topics."
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>

      <main className="container mx-auto flex flex-col items-center p-4 flex-grow">
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-slate-700">
          Labor For Zion
        </h1>
        <p>
          {/* A collection of notes, talks, and tools centered around gospel topics. */}
          A collection of notes centered around gospel topics.
        </p>
      </main>
    </>
  );
};

export default Home;
