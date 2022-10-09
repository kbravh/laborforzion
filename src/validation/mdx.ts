import {z} from 'zod';

export const Frontmatter = z.object({
  title: z.string(),
  description: z.string(),
  date: z.date().transform(date => date.toISOString()),
  language: z.enum(['en_US']),
  aliases: z.string().array().optional(),
});

export type Frontmatter = z.infer<typeof Frontmatter>;

export const BracketLink = z.object({
  link: z.string(),
  title: z.string(),
  alias: z.string().optional(),
  excerpt: z.string()
});

export type BracketLink = z.infer<typeof BracketLink>;
