import { useState } from 'react';
import { motion } from 'framer-motion';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80';

export function ProductImage({
  src,
  alt,
  className = '',
  large = false,
}: {
  src: string;
  alt: string;
  className?: string;
  large?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && !error && (
        <div className="absolute inset-0 bg-white/5 animate-pulse rounded-inherit">
          <div className="h-full w-full bg-gradient-to-r from-transparent via-white/5 to-transparent bg-[length:200%_100%] animate-shine" />
        </div>
      )}
      <motion.img
        src={error ? FALLBACK_IMG : src}
        alt={alt}
        loading="lazy"
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded || error ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`w-full h-full object-cover ${!loaded && !error ? 'invisible' : ''}`}
      />
    </div>
  );
}
