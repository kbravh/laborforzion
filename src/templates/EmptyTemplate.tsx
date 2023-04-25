import type {EmptyPostProps} from './models/Post';
import { Backlinks } from '../components/Backlinks';

export const EmptyTemplate = ({backlinks, title}: EmptyPostProps) => {
  return (
    <article className="prose prose-lg prose-slate dark:prose-invert [&>*]:col-start-2 min-w-full prose-h1:text-4xl prose-h1:sm:text-5xl prose-h1:md:text-7xl px-4">
      <Title title={title} />
      <p>
        This page hasn&apos;t been created yet! But if it has been mentioned
        somewhere else, you can see those references below.
      </p>
      {!!backlinks.length && <Backlinks backlinks={backlinks} />}
    </article>
  );
};

const Title = ({title}: Pick<EmptyPostProps, 'title'>): JSX.Element => (
  <div className="border-slate-800 border-solid border-b-2">
    <h1 className="mb-0">{title}</h1>
  </div>
);
