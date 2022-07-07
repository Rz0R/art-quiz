import { useEffect, useRef, useState, memo } from 'react';
import classnames from 'classnames';

type LoadableImageProps = {
  src: string;
  alt?: string;
  // onLoad?(): void;
};

const LoadableImage = ({ src, alt = '' }: LoadableImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (isLoaded) {
      return;
    }
    if (imageRef.current) {
      imageRef.current.onload = () => {
        setIsLoaded(true);
        // onLoad && onLoad();
      };
    }
  }, [isLoaded]);

  return (
    <div
      className={classnames('image-container', {
        'image-container--loaded': isLoaded,
      })}
    >
      <img ref={imageRef} className={classnames('image', { 'image--loaded': isLoaded })} src={src} alt={alt} />
    </div>
  );
};

export default memo(LoadableImage);
