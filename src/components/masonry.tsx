import {useCallback} from 'react';
import {splitArray} from '../utils/array';

type MasonryProps<T> = {
  columns: number;
  items: T[];
  renderItem: (item: T) => JSX.Element;
  className?: string;
};

export const Masonry = <T,>({
  columns,
  items,
  renderItem,
  className,
}: MasonryProps<T>): JSX.Element => {
  const splitItems = useCallback(
    () => splitArray(columns, items),
    [columns, items]
  );

  return (
    <div
      className={`grid ${columns === 1 ? 'grid-cols-1' : ''} ${
        columns === 2 ? 'grid-cols-2' : ''
      } ${columns === 3 ? 'grid-cols-3' : ''} w-full ${className ?? ''}`}
    >
      {splitItems().map((set, i) => (
        <div className={`flex flex-col ${className ?? ''}`} key={`column-${i}`}>{set.map(renderItem)}</div>
      ))}
    </div>
  );
};
