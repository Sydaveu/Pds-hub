import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getRealProductImageUrl, getFallbackImage } from '../../lib/imageService';

export function ProductImage({
  src,
  alt,
  className = '',
  large = false,
  imgClassName = '',
  contain = false,
  maxHeight = '160px',
  productId,
  productName,
  category,
}: {
  src: string;
  alt: string;
  className?: string;
  large?: boolean;
  imgClassName?: string;
  contain?: boolean;
  maxHeight?: string;
  productId?: string;
  productName?: string;
  category?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isLoadingApi, setIsLoadingApi] = useState(!!(productId && productName));

  useEffect(() => {
    if (productId && productName) {
      setIsLoadingApi(true);
      getRealProductImageUrl(productId, productName, category || '')
        .then((url) => {
          if (url) setCurrentSrc(url);
        })
        .catch(() => {})
        .finally(() => setIsLoadingApi(false));
    }
  }, [productId, productName, category]);

  const handleError = () => {
    if (productId && productName && !isLoadingApi) {
      getRealProductImageUrl(productId, productName, category || '')
        .then((url) => {
          if (url && url !== currentSrc) setCurrentSrc(url);
          else setError(true);
        })
        .catch(() => setError(true));
    } else {
      setError(true);
    }
  };

  const displaySrc = error ? getFallbackImage() : currentSrc;

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
