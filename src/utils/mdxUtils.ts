import {accessSync, readdirSync, readFileSync} from 'fs';
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
  // Replace embed links with content first
  let embedLinks = getEmbedLinks(source);
  let firstEmbed = true;
  do {
    for (const {link, title} of embedLinks) {
      const slug = titleToSlug[title];
      if (!slug) {
        throw new Error(`Slug not found for embed of ${title}!`);
      }
      // fetch markdown file content
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
      let embed = readFileSync(filePath, 'utf-8');
      // remove frontmatter
      embed = embed.replace(/^---.*---\n/gs, '');
      if (firstEmbed) {
        // provide an indication that this is an embed and provide a link to the original note
        embed =
          `\n\n---\n\n` +
          embed +
          `\n\n<span className="text-sm">From note <HoverUnderline><Link href="/${slug}">${title}</Link></HoverUnderline></span>\n\n---\n\n`;
      }
      source = source.replace(link, embed);
      firstEmbed = false;
      // look for new embed links in the embeds we just created
      embedLinks = getEmbedLinks(source);
    }
  } while (embedLinks.length);

  const bracketLinks = getOutgoingLinks(source);

  for (const {link, title, alias} of bracketLinks) {
    const slug = titleToSlug[title];
    if (!slug) {
      // ? - create a placeholder page for linked, non-existent pages?
      console.warn(`No slug found for ${link}`);
    }
    source = source.replace(
      link,
      slug ? `<Link href="/${slug}">${alias ?? title}</Link>` : alias ?? title
    );
  }
  return source;
};

/**
 * Searches md[x] text for any double-bracket links and returns
 * the link with brackets, its text, its alias, and an excerpt if it exists.
 * Takes a regex pattern to use to find bracket link matches. Returns
 * a new function that takes the mdx source.
 */
const getBracketLinks =
  (pattern: RegExp) =>
  (source: string): BracketLink[] => {
    const links: BracketLink[] = [];
    const outgoingLinks = [...source.matchAll(pattern)];
    for (const outgoingLink of outgoingLinks) {
      if (!outgoingLink[0]) {
        console.error('A match was not found in the outgoing link result.');
        continue;
      }
      // if we found a match, we should have capturing groups
      // but we have to keep typescript happy and ensure they're defined
      const [excerpt, link, text] = outgoingLink;
      if (!link || !text) {
        continue;
      }
      const [title = '', alias] = text?.split('|');
      links.push({link, title, alias, excerpt: excerpt.trim()});
    }
    return links;
  };

export const getOutgoingLinks = getBracketLinks(
  /(?:\w+\W){0,10}(\[\[([-\w\s\d\.:_|]+)\]\])(?:\W?\w+\W){0,10}/g
);
export const getEmbedLinks = getBracketLinks(
  /(?:\w+\W){0,10}(!\[\[([-\w\s\d\.:_|]+)\]\])(?:\W?\w+\W){0,10}/g
);

export type Backlink = {title: string; slug: string; excerpt: string | null};

const titlesWithBacklinks: Record<string, Backlink[]> = {};
/**
 * Provides a map of titles and aliases to all backlinks from other files.
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
    // this will catch embed links too
    const links = getOutgoingLinks(source);
    for (const {title: reference, excerpt, link} of links) {
      map[reference] = [
        ...(map[reference] ?? []),
        {slug, title, excerpt: excerpt === link ? null : excerpt},
      ];
    }
  }

  return map;
};
