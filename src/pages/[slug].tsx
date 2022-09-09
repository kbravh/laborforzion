import {accessSync, readFileSync} from 'fs';
import {GetStaticPaths, GetStaticProps, NextPage} from 'next';
import Head from 'next/head';
import rehypeSlug from 'rehype-slug';
import {serialize} from 'next-mdx-remote/serialize';
import path from 'path';
import {
  NOTES_PATH,
  notePaths,
  addLinks,
  getTitleToSlugMap,
  getBacklinks,
} from '../utils/mdxUtils';
import {PostTemplate} from '../templates/PostTemplate';
import {Frontmatter} from '../validation/mdx';
import dynamic from 'next/dynamic';
import matter from 'gray-matter';

type PostPageProps = {
  source: string;
  frontmatter: Frontmatter;
  slug: string;
  backlinks: {title: string; slug: string}[];
};

const PostPage: NextPage<PostPageProps> = ({
  source,
  frontmatter,
  slug,
  backlinks,
}) => {
  return (
    <main>
      <Head>
        <title key="title">{frontmatter.title}</title>
        <meta
          name="description"
          content={frontmatter.description}
          key="description"
        />
      </Head>
      <PostTemplate
        source={source}
        frontmatter={frontmatter}
        slug={slug}
        components={components}
        backlinks={backlinks}
      />
    </main>
  );
};

export default PostPage;

const components = {};

export const getStaticProps: GetStaticProps<PostPageProps> = async ({
  params,
}) => {
  if (!params) {
    throw new Error('No params were provided.');
  }
  const slug =
    (Array.isArray(params.slug) ? params.slug[0] : params.slug) ?? '';
  if (!slug) {
    throw new Error(
      'A slug was not provided in this slug route. Something has gone horribly wrong.'
    );
  }

  let filePath = path.join(NOTES_PATH, `${slug}.md`);

  // We'll try to access the filepath we created.
  // If we can't, it's probably an mdx file.
  if (filePath) {
    try {
      accessSync(filePath);
    } catch (_) {
      filePath += 'x';
    }
  }

  if (!filePath) {
    throw new Error(`Path for the slug ${slug} couldn\'t be determined`);
  }

  const titleToSlug = getTitleToSlugMap();
  const titlesWithBacklinks = getBacklinks();

  const source = readFileSync(filePath, 'utf-8');
  const text = addLinks(titleToSlug, source);
  const content = await serialize(text, {
    parseFrontmatter: true,
    mdxOptions: {rehypePlugins: [rehypeSlug]},
  });
  const frontmatter = matter(source).data;
  const parsedFrontmatter = Frontmatter.parse(frontmatter);

  // Fill an array with all backlinks that reference this title or its aliases
  let backlinks = [...(titlesWithBacklinks[parsedFrontmatter.title] ?? [])];
  for (const alias of parsedFrontmatter.aliases ?? []) {
    backlinks = [...backlinks, ...(titlesWithBacklinks[alias] ?? [])];
  }

  return {
    props: {
      source: content.compiledSource,
      frontmatter: parsedFrontmatter,
      slug,
      backlinks,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Get slugs for all file paths passed in
  const getSlugParams = (filePaths: string[]) =>
    filePaths
      // Remove the .mdx extension
      .map(path => path.replace(/\.mdx?$/, ''))
      .map(slug => ({params: {slug}}));

  const paths = [...getSlugParams(notePaths)];

  return {
    paths,
    fallback: false,
  };
};
