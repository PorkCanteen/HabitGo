import { useState, useCallback } from 'react';

export const useClickAnimation = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = useCallback((callback?: () => void) => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      if (callback) {
        callback();
      }
    }, 200);
  }, []);

  return {
    isAnimating,
    handleClick,
    animationClass: isAnimating ? 'click-shrink-animate' : ''
  };
}; 