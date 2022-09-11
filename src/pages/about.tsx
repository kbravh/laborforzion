import {NextPage} from 'next';
// import Image from 'next/future/image';
import Head from 'next/head';
// import ProfilePicture from '../assets/pro.jpg';

const AboutPage: NextPage = () => (
  <>
    <Head>
      <title key="title">About - kbravh</title>
    </Head>
    <main className="container mx-auto flex flex-col items-center min-h-fit p-4 flex-grow">
      <h1 className="text-5xl text-center leading-normal font-extrabold text-slate-700">
        About
      </h1>
      <div className="prose prose-lg prose-slate dark:prose-invert text-center md:text-left">
        {/* <div className="flex flex-col items-center">
          <Image
            src={ProfilePicture}
            alt="A picture of Karey"
            className="rounded-full h-32 w-32"
          />
        </div> */}
        <p>
          This site is maintained by me, Karey Higuera. I&apos;m a software
          developer based out of Indianapolis, Indiana. I&apos;m a member of the
          Church of Jesus Christ of Latter-Day Saints.
        </p>
        <p>
          I served a mission for the church from April 2015 - April 2017 in the
          Argentina Resistencia mission. I have a wife and young daughter, and I
          spend most of my time working, reading, or doing work around the
          house.
        </p>
        <p>
          If you&apos;d like to get in touch, feel free to reach out at{' '}
          <a href="mailto:karey.higuera@gmail.com">karey.higuera@gmail.com</a>
        </p>
      </div>
    </main>
  </>
);

export default AboutPage;
