import {AnimatePresence, motion} from 'framer-motion';
import {useEffect, useState} from 'react';

type LightboxProps = {
  src: string;
  alt?: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Lightbox = ({src, isOpen, setIsOpen, alt}: LightboxProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, setIsOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          className="fixed inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center"
          onClick={() => setIsOpen(false)}
        >
          {!isImageLoaded && (
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-t-2 border-blue-500 border-solid rounded-full animate-spin" />
              <span>Loading...</span>
            </div>
          )}
          <motion.img
            src={src}
            alt={alt}
            onLoad={() => setIsImageLoaded(true)}
            className="max-w-[90%] max-h-[90%]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
