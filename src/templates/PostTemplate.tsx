import {MDXRemote} from 'next-mdx-remote';
import type {PostProps} from './models/Post';
import {Backlinks} from '../components/Backlinks';

export const PostTemplate = ({
  source,
  frontmatter,
  components,
  backlinks,
}: PostProps) => {
  return (
    <article className="prose prose-lg prose-slate dark:prose-invert [&>*]:col-start-2 min-w-full prose-h1:text-4xl prose-h1:sm:text-5xl prose-h1:md:text-7xl px-4">
      <Title frontmatter={frontmatter} />
      <Metadata frontmatter={frontmatter} />
      <MDXRemote
        compiledSource={source}
        components={components}
      />
      {!!backlinks.length && <Backlinks backlinks={backlinks} />}
    </article>
  );
};

const Title = ({frontmatter}: Pick<PostProps, 'frontmatter'>): JSX.Element => (
  <div className="border-slate-800 border-solid border-b-2">
    <h1 className="mb-0">{frontmatter.title}</h1>
    {frontmatter.description && (
      <p className="text-2xl">{frontmatter.description}</p>
    )}
  </div>
);

const Metadata = ({frontmatter}: Pick<PostProps, 'frontmatter'>) => {
  const date = new Date(frontmatter.date);
  return (
    <div className="flex justify-end p-4">
      <div>{date.toLocaleDateString('en-US', {dateStyle: 'long'})}</div>
    </div>
  );
};
