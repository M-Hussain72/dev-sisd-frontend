import { useState, useRef, useEffect, useCallback } from 'react';

export function useCountdown() {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const start = useCallback((duration: number) => {
    clearInterval(intervalRef.current!);
    setSecondsLeft(duration);
    setRunning(true);

    intervalRef.current = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current!);
    };
  }, []);

  return { secondsLeft, running, start };
}
