import { useEffect, useRef, useState, MutableRefObject } from 'react';

const useIntersectionObserver = (): [
  MutableRefObject<HTMLDivElement | null>,
  boolean,
] => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return [elementRef, isVisible];
};

export default useIntersectionObserver;
