import {removeImageTransformations} from '../../utils/images';
import {Lightbox} from './Lightbox';
import {useState} from 'react';

export type ImageProps = {
  src?: string;
  alt?: string;
};

export const Image = ({src, alt}: ImageProps) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!src) {
    return null;
  }

  const lightboxSource = removeImageTransformations(src);

  return (
    <figure
      className={`grid grid-cols-1 justify-items-center grid-rows-1 max-w-full !col-start-1 !col-span-3 text-center mx-auto`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element*/}
      <img
        style={{gridColumn: '1 / 1', gridRow: '1 / 1'}}
        src={src}
        alt={alt}
        className="cursor-zoom-in"
        onClick={() => setIsOpen(true)}
      />
      <Lightbox
        src={lightboxSource}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <figcaption className="w-full mt-1">{alt}</figcaption>
    </figure>
  );
};
