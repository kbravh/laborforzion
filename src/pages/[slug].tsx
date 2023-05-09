import {readFileSync} from 'fs';
import {GetStaticPaths, GetStaticProps, NextPage} from 'next';
import Head from 'next/head';
import rehypeSlug from 'rehype-slug';
import remarkFootnotes from 'remark-footnotes';
import {serialize} from 'next-mdx-remote/serialize';
import {
  notePaths,
  addLinks,
  getTitleAndSlugMaps,
  getBacklinks,
  Backlink,
  getSlugFromFilepath,
  getSlugToPathMap,
} from '../utils/mdxUtils';
import {PostTemplate} from '../templates/PostTemplate';
import {Frontmatter} from '../validation/mdx';
import dynamic from 'next/dynamic';
import matter from 'gray-matter';
import {ImageProps} from '../components/mdx/Image';
import {HoverUnderlineProps} from '../components/links';
import {EmptyTemplate} from '../templates/EmptyTemplate';

type PostPageProps =
  | {
      source: string;
      frontmatter: Frontmatter;
      slug: string;
      backlinks: Backlink[];
      type: 'note';
    }
  | {title: string; slug: string; backlinks: Backlink[]; type: 'empty'};

const PostPage: NextPage<PostPageProps> = props => {
  const {type, slug, backlinks} = props;

  if (type === 'note') {
    const {source, frontmatter} = props as {
      source: string;
      frontmatter: Frontmatter;
      slug: string;
      backlinks: Backlink[];
      type: 'note';
    };

    return (
      <main className="flex-grow">
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
  } else if (type === 'empty') {
    const {title} = props;
    return (
      <main className="flex-grow">
        <Head>
          <title key="title">{title}</title>
        </Head>
        <EmptyTemplate
          slug={slug}
          components={components}
          backlinks={backlinks}
          title={title}
        />
      </main>
    );
  }

  return null;
};

export default PostPage;

const components = {
  HoverUnderline: dynamic<HoverUnderlineProps>(() =>
    import('../components/links').then(mod => mod.HoverUnderline)
  ),
  img: dynamic<ImageProps>(
    () => import('../components/mdx/Image').then(mod => mod.Image),
    {ssr: false}
  ),
  Link: dynamic(() => import('next/link')),
};

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

  const slugToPathMap = getSlugToPathMap();
  const {titleToSlug, slugToTitle} = getTitleAndSlugMaps();
  const titlesWithBacklinks = getBacklinks();

  const filePath = slugToPathMap[slug];

  // if we have a filepath, this is a real page and we can parse and prepare
  if (filePath) {
    const source = readFileSync(filePath, 'utf-8');
    const text = addLinks(titleToSlug, source);
    const content = await serialize(text, {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [rehypeSlug],
        remarkPlugins: [remarkFootnotes],
      },
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
        type: 'note',
      },
    };
  // otherwise, let's check if it's an empty page referenced in other articles
  } else {
    const title = slugToTitle[slug];
    if (!title) {
      throw new Error('This page does not exist');
    }
    return {
      props: {
        slug,
        backlinks: titlesWithBacklinks[title] ?? [],
        type: 'empty',
        title,
      },
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const {slugToTitle} = getTitleAndSlugMaps();

  // Generate paths based on all of our slugs
  const paths = [...Object.keys(slugToTitle).map(slug => ({params: {slug}}))]

  return {
    paths,
    fallback: false,
  };
};
