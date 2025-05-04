import { useEffect, useRef, useState } from 'react';
import 'plyr/dist/plyr.css';
import Hls from 'hls.js';
import Plyr, { APITypes, PlyrInstance } from 'plyr-react';
import { Loader } from '@mantine/core';

export default function VideoPlayer({
  url,
  previewMode,
  startTime = 0,
  id,
  setLectureProgress,
}: {
  url: string;
  previewMode: boolean;
  startTime: number;
  id: string;
  setLectureProgress: ({
    lastViewTime,
    completed,
  }: {
    lastViewTime: number;
    completed: boolean;
  }) => Promise<void> | undefined;
}) {
  const playerRef = useRef<APITypes>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [opts, setOpts] = useState<any>(null);

  const handlePause = async () => {
    const currentTime = playerRef.current?.plyr.currentTime || 0;
    await setLectureProgress({ lastViewTime: currentTime, completed: false });
  };
  const handleEnded = () => {
    setLectureProgress({ lastViewTime: 0, completed: true });
  };

  // 1) Preload & parse HLS manifest to discover quality levels
  useEffect(() => {
    let hls: Hls | null = null;
    if (url.endsWith('.m3u8')) {
      if (Hls.isSupported()) {
        const dummy = document.createElement('video');
        dummy.crossOrigin = 'anonymous';

        hls = new Hls();
        hlsRef.current = hls;
        hls.loadSource(url);
        hls.attachMedia(dummy);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          const heights = Array.from(new Set(hls!.levels.map((l) => l.height))).sort((a, b) => b - a);
          const qualityOptions = ['auto', ...heights.map((h) => h)]; // use strings, not numbers

          setOpts({
            controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'settings', 'fullscreen'],
            settings: ['speed', 'quality'],
            speed: { selected: 1, options: [0.5, 1, 1.25, 1.5, 2] },
            quality: {
              default: 0,
              options: qualityOptions,
              forced: true,
              onChange: (q: string | number) => {
                if (!hlsRef.current) return;
                hlsRef.current.currentLevel = q === 'auto' ? 0 : hlsRef.current.levels.findIndex((l) => l.height === q);
                console.log(q);
              },
            },
            ratio: '16:9',
            autoplay: true,
            keyboard: { global: true },
            html5: { attributes: { crossorigin: 'anonymous', playsinline: '' } },
          });
        });
      }
    } else {
      setOpts({
        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'settings', 'fullscreen'],
        settings: ['speed'],
        speed: { selected: 1, options: [0.5, 1, 1.25, 1.5, 2] },
        ratio: '16:9',
        autoplay: true,
        keyboard: { global: true },
        html5: { attributes: { crossorigin: 'anonymous', playsinline: '' } },
      });
    }

    return () => {
      (hls || hlsRef.current)?.destroy();
    };
  }, [url]);

  // 2) Attach HLS to the actual Plyr video element and setup events
  useEffect(() => {
    const init = () => {
      if (!opts) return;
      const plyrInst = playerRef.current?.plyr as PlyrInstance;
      if (!plyrInst) return;
      const media = document.getElementById(`plyr${id}`) as HTMLVideoElement | null;
      if (hlsRef.current && media) {
        media.crossOrigin = 'anonymous';
        hlsRef.current.attachMedia(media);
      }

      plyrInst.on('pause', handlePause);
      plyrInst.on('ended', handleEnded);

      if (media && startTime > 0) {
        const onLoaded = () => {
          media.currentTime = Math.min(startTime, media.duration);
          media.removeEventListener('loadedmetadata', onLoaded);
        };
        media.addEventListener('loadedmetadata', onLoaded);
      }

      plyrInst.play();
      return () => {
        plyrInst.off('pause', handlePause);
        plyrInst.off('ended', handleEnded);
      };
    };

    const timer = setTimeout(init, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [opts, id, startTime, url]);

  if (!opts) {
    return (
      <div className="  aspect-video max-h-[580px] bg-white border-[1px] rounded-xl flex items-center justify-center">
        <Loader size="xl" />
      </div>
    );
  }

  // 3) Render Plyr with empty sources: HLS will feed segments
  return <Plyr id={`plyr${id}`} source={{ type: 'video', sources: [] }} options={opts} ref={playerRef} />;
}
