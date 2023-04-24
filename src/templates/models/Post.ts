import type {Frontmatter} from '../../validation/mdx';
import {MDXRemoteProps} from 'next-mdx-remote';
import {Backlink} from '../../utils/mdxUtils';

export type PostProps = {
  source: string;
  frontmatter: Frontmatter;
  slug: string;
  components: MDXRemoteProps['components'];
  backlinks: Backlink[];
};
export type EmptyPostProps = {
  slug: string;
  components: MDXRemoteProps['components'];
  backlinks: Backlink[];
  title: string;
};
export type PostListing = {
  slug: string;
  frontmatter: Frontmatter;
};
