import {readFileSync} from 'fs';
import {GetStaticProps, NextPage} from 'next';
import {serialize} from 'next-mdx-remote/serialize';
import Head from 'next/head';
import Link from 'next/link';
import path from 'path';
import {Masonry} from '../components/masonry';
import {useWindowSize} from '../hooks/useWindowSize';
import {PostListing} from '../templates/models/Post';
import {relativeDate} from '../utils/date';
import {notePaths, NOTES_PATH, removeMdxExtension} from '../utils/mdxUtils';
import {Frontmatter} from '../validation/mdx';

type Props = {
  posts: PostListing[];
};

const WritingPage: NextPage<Props> = ({posts}) => {
  const size = useWindowSize();
  let columns = 3;
  if (size.width) {
    if (size.width <= 1024) {
      columns = 2;
    }
    if (size.width <= 640) {
      columns = 1;
    }
  }

  const today = new Date();

  return (
    <>
      <Head>
        <title key="title">Notes - Labor For Zion</title>
      </Head>
      <div className="flex flex-col items-center">
        <div className="max-w-6xl w-full px-8">
          <h1 className="text-7xl text-slate-300 font-bold font-sans">
            Notes
          </h1>
        </div>
        <main className="flex flex-col items-center mt-8">
          <div className="max-w-5xl sm:mx-20 mx-8">
            <Masonry
              className="gap-4"
              columns={columns}
              items={posts}
              renderItem={post => (
                <Link
                  key={`/${post.slug}`}
                  href={post.slug}
                >
                  <article className="relative rounded-lg border border-slate-700 bg-slate-800 px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-emerald-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-emerald-500 cursor-pointer select-none">
                    <div className="flex flex-col">
                      <h2 className="text-slate-300 text-lg">
                        {post.frontmatter.title}
                      </h2>
                      <p className="text-slate-400 text-md">
                        {post.frontmatter.description}
                      </p>
                      {/* TODO - force relative date to re-render on client side */}
                      <span className="text-slate-500 self-end mt-2">
                        {relativeDate(today, new Date(post.frontmatter.date))}
                      </span>
                    </div>
                  </article>
                </Link>
              )}
            />
          </div>
        </main>
      </div>
    </>
  );
};

export default WritingPage;

export const getStaticProps: GetStaticProps = async () => {
  const posts: PostListing[] = [];

  // Loop through all articles and extract slug and frontmatter
  for (const articlePath of notePaths) {
    const source = readFileSync(path.join(NOTES_PATH, articlePath), 'utf-8');
    const content = await serialize(source, {parseFrontmatter: true});
    posts.push({
      frontmatter: Frontmatter.parse(content.frontmatter),
      slug: removeMdxExtension(articlePath),
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
