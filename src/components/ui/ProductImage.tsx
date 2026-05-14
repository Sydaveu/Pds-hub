import { useState } from 'react';
import { motion } from 'framer-motion';
import { getProductImage, getProductImageByKeyword, getFallbackImage } from '../../lib/productImages';

export function ProductImage({
  src,
  alt,
  className = '',
  large = false,
  imgClassName = '',
  contain = false,
  maxHeight = '160px',
}: {
  src: string;
  alt: string;
  className?: string;
  large?: boolean;
  imgClassName?: string;
  contain?: boolean;
  maxHeight?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [fallbackSrc, setFallbackSrc] = useState<string | null>(null);

const handleError = () => {
  if (!fallbackSrc) {
    const kw = alt.toLowerCase().split(' ').slice(0, 2).join('-');
    setFallbackSrc(getProductImageByKeyword(kw));
  } else {
    setError(true);
  }
};

  const displaySrc = error ? getFallbackImage() : (fallbackSrc || src);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ maxHeight }}
    >
      {!loaded && !error && (
        <div className="absolute inset-0 bg-white/5 animate-pulse rounded-inherit">
          <div className="h-full w-full bg-gradient-to-r from-transparent via-white/5 to-transparent bg-[length:200%_100%] animate-shine" />
        </div>
      )}
      <motion.img
        src={displaySrc}
        alt={alt}
        loading="lazy"
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded || error ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        onLoad={() => setLoaded(true)}
        onError={handleError}
        className={`w-full h-full ${contain ? 'object-contain' : 'object-cover'} ${!loaded && !error ? 'invisible' : ''} ${imgClassName}`}
        style={{ maxHeight }}
      />
    </div>
  );
}
