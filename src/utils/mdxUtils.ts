import {readdirSync, readFileSync} from 'fs';
import path from 'path';
import {BracketLink, Frontmatter} from '../validation/mdx';
import matter from 'gray-matter';

export const NOTES_PATH = path.join(process.cwd(), 'posts', 'notes');

const isMdxFile = (path: string): boolean => /\.mdx?$/.test(path);

export const removeMdxExtension = (path: string) => path.replace(/\.mdx?$/, '');
export const notePaths = readdirSync(NOTES_PATH).filter(isMdxFile);

let titleToSlug: Record<string, string>;
/**
 * Creates a map of article titles to their corresonding slugs.
 * Also includes frontmatter aliases for lookup. For example,
 * if the page "Interactive Teaching" has an alias of
 * "Interactive Teaching MOC", the slug can be found through either.
 */
export const getTitleToSlugMap = (): Record<string, string> => {
  if (titleToSlug) {
    return titleToSlug;
  }
  const map: Record<string, string> = {};
  // this creates a map of all titles and aliases to their corresponding slug
  for (const article of notePaths) {
    const source = readFileSync(path.join(NOTES_PATH, article), 'utf-8');
    const frontmatter = Frontmatter.parse(matter(source).data);
    map[frontmatter.title] = removeMdxExtension(article);
    frontmatter.aliases?.forEach(alias => {
      map[alias] = removeMdxExtension(article);
    });
  }
  titleToSlug = map;
  return titleToSlug;
};

/**
 * Takes a fresh Md[x] file, checks for double-bracket links, and
 * converts them to regular website links. If a double-bracket link
 * has an alias (e.g. [[Teaching|teaching]]), it will respect the alias.
 * @param titleToSlug - the map created by @createTitleToSlugMap
 * @param source - the fresh, raw text of the mdx file
 * @returns the mdx file with Link components added in
 */
export const addLinks = (
  titleToSlug: Record<string, string>,
  source: string
): string => {
  const links = getBracketLinks(source);
  for (const {link, title, alias} of links) {
    const slug = titleToSlug[title];
    if (!slug) {
      // TODO - create a placeholder page for linked, non-existent pages?
      console.warn(`No slug found for ${link}`);
      continue;
    }
    source = source.replace(
      link,
      `<Link href="/${slug}">${alias ?? title}</Link>`
    );
  }
  return source;
};

/**
 * Searches md[x] text for double-bracket links and returns
 * the link with brackets, its text, and its alias if it exists.
 * @param source the raw text of an md[x] file
 * @returns an array of BracketLinks
 */
export const getBracketLinks = (source: string): BracketLink[] => {
  const links: BracketLink[] = [];
  const outgoingLinks = [...source.matchAll(/\[\[([-\w\s_|]+)\]\]/g)];
  for (const link of outgoingLinks) {
    if (!link[0]) {
      console.error('A match was not found in the outgoing link result.');
      continue;
    }
    const text = link[1];
    if (!text) {
      continue;
    }
    const [title = '', alias] = text?.split('|');
    links.push({link: link[0], title, alias});
  }
  return links;
};

const titlesWithBacklinks: Record<string, {title: string; slug: string}[]> = {};
/**
 * Provides a map of titles and aliases to all backlinks from other files.
 * TODO - include an excerpt of where the title is mentioned.
 */
export const getBacklinks = (): typeof titlesWithBacklinks => {
  const map: typeof titlesWithBacklinks = {};
  const titleToSlug = getTitleToSlugMap();

  for (const articlePath of notePaths) {
    const source = readFileSync(path.join(NOTES_PATH, articlePath), 'utf-8');
    const frontmatter = Frontmatter.parse(matter(source).data);
    const title = frontmatter.title;
    const slug = titleToSlug[title];
    if (!slug) {
      throw new Error(`A slug was not found for ${title}`);
    }
    const links = getBracketLinks(source);
    for (const {title: reference} of links) {
      map[reference] = [...(map[reference] ?? []), {slug, title}];
    }
  }

  return map;
};
