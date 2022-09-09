import type {Frontmatter} from '../../validation/mdx';
import {MDXRemoteProps} from 'next-mdx-remote';

export type PostProps = {
  source: string;
  frontmatter: Frontmatter;
  slug: string;
  components: MDXRemoteProps['components'];
  backlinks: {title: string, slug: string}[]
};
export type PostListing = {
  slug: string;
  frontmatter: Frontmatter;
};
