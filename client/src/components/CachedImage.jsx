import React, { useState, useRef, useEffect } from 'react';

/**
 * CachedImage — drop-in <img> replacement with:
 *  - Animated shimmer placeholder while loading
 *  - Smooth fade-in on load
 *  - Graceful fallback on error
 *  - IntersectionObserver-based lazy loading (only start fetching when near viewport)
 *
 * Props mirror a standard <img> element plus:
 *  @param {string}  fallback        - src to use when the image fails to load
 *  @param {string}  shimmerClass    - extra Tailwind classes for the shimmer box
 *  @param {boolean} eager           - set true to disable lazy loading (e.g. above-the-fold)
 */
const CachedImage = ({
  src,
  alt = '',
  fallback = '',
  className = '',
  shimmerClass = '',
  eager = false,
  onError: externalOnError,
  ...rest
}) => {
  const [loaded, setLoaded]     = useState(false);
  const [error, setError]       = useState(false);
  const [inView, setInView]     = useState(eager);
  const imgRef                  = useRef(null);
  const containerRef            = useRef(null);

  // IntersectionObserver: only load when image is near the viewport
  useEffect(() => {
    if (eager) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // start loading 200px before it enters view
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [eager]);

  // Reset state when src changes (e.g. navigating between items)
  useEffect(() => {
    setLoaded(false);
    setError(false);
  }, [src]);

  const handleLoad = () => setLoaded(true);

  const handleError = (e) => {
    setError(true);
    setLoaded(true);
    if (fallback && e.target.src !== fallback) {
      e.target.src = fallback;
    }
    externalOnError?.(e);
  };

  const effectiveSrc = error && fallback ? fallback : src;

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Shimmer placeholder — visible until image loads */}
      {!loaded && (
        <div
          className={`absolute inset-0 rounded-[inherit] overflow-hidden ${shimmerClass}`}
          aria-hidden="true"
        >
          <div className="w-full h-full bg-white/5 border border-white/5 relative overflow-hidden">
            {/* Sweep animation */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(21,216,179,0.06) 50%, transparent 100%)',
                animation: 'shimmer-sweep 1.6s ease-in-out infinite',
              }}
            />
          </div>
        </div>
      )}

      {/* Real image — only rendered when in viewport */}
      {inView && (
        <img
          ref={imgRef}
          src={effectiveSrc}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={`${className} transition-opacity duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          {...rest}
        />
      )}

      <style>{`
        @keyframes shimmer-sweep {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
};

export default CachedImage;
