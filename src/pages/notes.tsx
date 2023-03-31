import {readFileSync} from 'fs';
import {GetStaticProps, NextPage} from 'next';
import {serialize} from 'next-mdx-remote/serialize';
import Head from 'next/head';
import Link from 'next/link';
import {PostListing} from '../templates/models/Post';
import {relativeDate} from '../utils/date';
import {getSlugFromFilepath, notePaths} from '../utils/mdxUtils';
import {Frontmatter} from '../validation/mdx';
import clsx from 'clsx';

type Props = {
  posts: PostListing[];
};

const NotesPage: NextPage<Props> = ({posts}) => {
  const today = new Date();

  return (
    <>
      <Head>
        <title key="title">Notes - Labor For Zion</title>
      </Head>
      <div className="flex flex-col items-center flex-grow">
        <div className="max-w-5xl w-full px-8">
          <h1 className="text-5xl text-slate-700 font-extrabold font-sans">
            Notes
          </h1>
        </div>
        <main className="flex flex-col items-center mt-8 flex-grow max-w-5xl">
          <div className="max-w-5xl sm:mx-20 mx-8 grid grid-cols-2 gap-4">
            {posts.map(post => (
              <Link
                key={`/${post.slug}`}
                href={post.slug}
              >
                <article
                  className={clsx(
                    'rounded-lg border border-emerald-100 shadow-sm shadow-emerald-800 bg-slate-100',
                    'relative px-6 py-5 flex flex-col justify-between space-y-3',
                    'hover:border-emerald-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-emerald-500',
                    'cursor-pointer select-none'
                  )}
                >
                  <div>
                    <h2 className="text-slate-600 font-semibold text-lg">
                      {post.frontmatter.title}
                    </h2>
                    <p className="text-slate-500 text-md">
                      {post.frontmatter.description}
                    </p>
                  </div>
                  <span className="text-slate-500 self-end mt-2">
                    {relativeDate(today, new Date(post.frontmatter.date))}
                  </span>
                </article>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default NotesPage;

export const getStaticProps: GetStaticProps = async () => {
  const posts: PostListing[] = [];

  // Loop through all articles and extract slug and frontmatter
  for (const articlePath of notePaths) {
    const source = readFileSync(articlePath, 'utf-8');
    const content = await serialize(source, {parseFrontmatter: true});
    posts.push({
      frontmatter: Frontmatter.parse(content.frontmatter),
      slug: getSlugFromFilepath(articlePath),
    });
  }

  // sort posts by written at date, recent to old
  posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );

  return {
    props: {
      posts,
    },
  };
};
