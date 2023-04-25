import Link from 'next/link';
import {Backlink} from '../utils/mdxUtils';
import {HoverUnderline} from './links';

type BacklinkProps = {
  backlinks: Backlink[];
};

export const Backlinks = ({backlinks}: BacklinkProps): JSX.Element => (
  <div>
    <h2>Pages that reference this note</h2>
    <ul className="flex flex-col gap-2">
      {backlinks.map(({title, slug, excerpt}) => (
        <li key={slug}>
          <article>
            <HoverUnderline>
              <Link href={`/${slug}`}>
                <span className="text-lg font-semibold">{title}: </span>
              </Link>
              {excerpt ? `"...${excerpt}..."` : ''}
            </HoverUnderline>
          </article>
        </li>
      ))}
    </ul>
  </div>
);
