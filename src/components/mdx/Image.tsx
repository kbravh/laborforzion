export type ImageProps = {
  src: string;
  alt: string;
  width: string;
  height?: string;
};

export const Image = ({alt, src, width, height}: ImageProps) => {
  return (
    <figure
      className={`grid grid-cols-1 justify-items-center grid-rows-1 max-w-full !col-start-1 !col-span-3 text-center mx-auto w-[${
        width || '1000px'
      }]`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element*/}
      <img
        style={{gridColumn: '1 / 1', gridRow: '1 / 1'}}
        src={src}
        alt={alt}
        width={width || 1000}
      />
      <figcaption className="w-full mt-1">{alt}</figcaption>
    </figure>
  );
};
