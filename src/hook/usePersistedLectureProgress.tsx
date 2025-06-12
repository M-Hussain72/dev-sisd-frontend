import { useEffect, useRef, useCallback } from 'react';
import type { PlyrInstance } from 'plyr-react';

type ProgressMap = Record<string, number>;

function readProgressMap(): ProgressMap {
  try {
    return JSON.parse(localStorage.getItem('lectureProgressMap') || '{}');
  } catch {
    return {};
  }
}

function writeProgressMap(map: ProgressMap) {
  localStorage.setItem('lectureProgressMap', JSON.stringify(map));
}

export function usePersistedLectureProgress(
  playerRef: React.RefObject<{ plyr: PlyrInstance }>,
  lectureId: string,
  setLectureProgress: (args: { lastViewTime: number; completed: boolean }) => Promise<void> | void,
  startTime = 0,
) {
  const lastTimeRef = useRef(0);
  const lastWriteRef = useRef(0);

  // Attach onReady & timeupdate in one go
  const handleReady = useCallback(
    (event: PlyrInstance) => {
      // initial resume
      const map = readProgressMap();
      const resumeAt = map[lectureId] ?? startTime;
      if (resumeAt > 0) {
        event.currentTime = Math.min(resumeAt, event.duration);
        delete map[lectureId];
        writeProgressMap(map);
      }

      // keep live time
      const onTime = () => {
        lastTimeRef.current = event.currentTime;
      };
      event.on('timeupdate', onTime);

      // clean up on destroy
      return () => {
        event.off('timeupdate', onTime);
      };
    },
    [lectureId, startTime],
  );

  // Throttled save to localStorage
  const saveToStorage = useCallback(() => {
    const now = Date.now();
    if (now - lastWriteRef.current < 5000) return;
    lastWriteRef.current = now;

    const map = readProgressMap();
    map[lectureId] = lastTimeRef.current;
    writeProgressMap(map);
  }, [lectureId]);

  // Save on unload / tab hide / SPA unmount
  useEffect(() => {
    window.addEventListener('beforeunload', saveToStorage);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') saveToStorage();
    });
    return () => {
      window.removeEventListener('beforeunload', saveToStorage);
      document.removeEventListener('visibilitychange', saveToStorage);
      saveToStorage(); // final save on unmount
    };
  }, [saveToStorage]);

  // Persist to server when lecture changes or unmounts
  useEffect(() => {
    return () => {
      setLectureProgress({
        lastViewTime: lastTimeRef.current,
        completed: false,
      });
    };
  }, [setLectureProgress]);

  return { onReady: handleReady };
}
