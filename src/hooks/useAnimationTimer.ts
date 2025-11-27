import { useEffect, useRef, useState } from "react";

export const useAnimationTimer = (duration: number) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const timerRef = useRef<number | null>(null);

  const startAnimation = () => {
    setIsAnimating(true);

    timerRef.current = setTimeout(() => setIsAnimating(false), duration);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return { isAnimating, startAnimation };
};
