import { useEffect, useRef, useState } from 'react';
import 'plyr/dist/plyr.css';
import Hls, { ErrorData, ErrorTypes, Events } from 'hls.js';
import Plyr, { APITypes, PlyrInstance } from 'plyr-react';
import { Loader } from '@mantine/core';
import useAuthAxios from '../hook/useAuthAxios';
import { getAuthToken } from '../utils/auth';
import { usePersistedLectureProgress } from '../hook/usePersistedLectureProgress';

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
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const authAxios = useAuthAxios();

  // extract primitive token value to avoid object reference changes
  const token = getAuthToken();
  const accessToken = token?.access?.token || '';

  const handlePause = async () => {
    const currentTime = playerRef.current?.plyr.currentTime || 0;
    await setLectureProgress({ lastViewTime: currentTime, completed: false });
  };
  const handleEnded = async () => {
    await setLectureProgress({ lastViewTime: 0, completed: true });
  };

  // 1) Preload & parse HLS manifest to discover quality levels

  useEffect(() => {
    let hls: Hls | null = null;
    let errorHandled = false;
    setErrorMsg(null);

    if (url.endsWith('.m3u8')) {
      if (Hls.isSupported()) {
        const dummy = document.createElement('video');
        dummy.crossOrigin = 'anonymous';

        hls = new Hls({
          xhrSetup: (xhr) => xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`),
          manifestLoadingMaxRetry: 3,
          levelLoadingMaxRetry: 3,
          fragLoadingMaxRetry: 5,

          // Optional: Better timeout settings
          fragLoadingTimeOut: 20000,
          levelLoadingTimeOut: 15000,
          manifestLoadingTimeOut: 15000,
        });
        hlsRef.current = hls;

        hls.attachMedia(dummy);
        hls.loadSource(url);

        const onManifest = () => {
          if (errorHandled) return;
          const heights = Array.from(new Set(hls!.levels.map((l) => l.height))).sort((a, b) => b - a);
          const qualityOptions = ['auto', ...heights.map(String)];

          setOpts({
            controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'settings', 'fullscreen'],
            settings: ['speed', 'quality'],
            speed: { selected: 1, options: [0.5, 1, 1.25, 1.5, 2] },
            quality: {
              default: 0,
              options: qualityOptions,
              forced: true,
              onChange: (q: string) => {
                if (!hlsRef.current) return;
                hlsRef.current.currentLevel =
                  q === 'auto' ? -1 : hlsRef.current.levels.findIndex((l) => String(l.height) === q);
              },
            },
            ratio: '16:9',
            autoplay: true,
            keyboard: { global: true },
            html5: { attributes: { crossorigin: 'anonymous', playsinline: '' } },
          });
        };
        hls.on(Events.MANIFEST_PARSED, onManifest);

        hls.on(Hls.Events.ERROR, (event, data) => {
          console.warn('HLS.js error event:', data);

          if (data.fatal) {
            const responseCode = (data.response as any)?.code;
            const isAuthError = responseCode === 401;

            if (isAuthError && !errorHandled) {
              errorHandled = true;
              hls?.off(Events.MANIFEST_PARSED, onManifest);
              hls?.stopLoad();
              hls?.detachMedia();
              hls?.destroy();
              setErrorMsg('Unauthorized: You do not have permission to view this video.');
              return;
            }
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                hls?.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                hls?.recoverMediaError();
                break;
              default:
                hls?.destroy();
                break;
            }
          }
        });

        const onError = (_event: string, data: ErrorData) => {
          if (errorHandled || !hls) return;
          errorHandled = true;
          console.error('HLS fatal error', data);

          let msg = 'Error loading video.';
          if (data.type === ErrorTypes.NETWORK_ERROR) {
            msg = 'Network error: failed to load video.';
          } else if (data.type === ErrorTypes.MEDIA_ERROR) {
            msg = 'Media error: corrupted stream.';
          } else {
            msg = `Error: ${data.details}`;
          }

          hls.off(Events.MANIFEST_PARSED, onManifest);
          hls.off(Events.ERROR, onError);
          hls.stopLoad();
          hls.detachMedia();
          hls.destroy();

          setErrorMsg(msg);
        };
        // hls.on(Events.ERROR, onError);
      }
    } else {
      // non-HLS fallback
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
  }, [url, accessToken]);

  // 2) Attach HLS to the actual video element
  useEffect(() => {
    if (errorMsg) return;

    const init = () => {
      if (!opts) return;
      const plyrInst = playerRef.current?.plyr as PlyrInstance;
      if (!plyrInst) return;
      const media = document.getElementById(`plyr${id}`) as HTMLVideoElement | null;
      if (hlsRef.current && media) {
        media.crossOrigin = 'anonymous';
        hlsRef.current.attachMedia(media);
      }

      // plyrInst.on('ended', handleEnded);

      let earlyFired = false;
      const onTimeUpdate = () => {
        const current = plyrInst.currentTime;
        const total = plyrInst.duration;
        if (!earlyFired && total - current <= 5) {
          earlyFired = true;
          handleEnded();
        }
      };
      if (!previewMode) {
        plyrInst.on('pause', handlePause);
        plyrInst.on('timeupdate', onTimeUpdate);
      }
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
        // plyrInst.off('ended', handleEnded);
        plyrInst.off('timeupdate', onTimeUpdate);
      };
    };

    const timer = setTimeout(init, 100);
    return () => clearTimeout(timer);
  }, [opts, id, startTime, url, errorMsg]);

  // useEffect(() => {
  //   // 1) When the page is about to unload…
  //   const onBeforeUnload = (e: BeforeUnloadEvent) => {
  //     // Fire-and-forget; you can’t await here
  //     handlePause();
  //     // Chrome requires you set returnValue to show the prompt,
  //     // but if you don’t need a confirmation dialog you can omit it.
  //     // e.returnValue = '';
  //   };

  //   // // 2) Also catch when the tab goes to background / user switches away
  //   // const onVisibilityChange = () => {
  //   //   if (document.visibilityState === 'hidden') {
  //   //     handlePause();
  //   //   }
  //   // };

  //   window.addEventListener('beforeunload', onBeforeUnload);
  //   // document.addEventListener('visibilitychange', onVisibilityChange);

  //   return () => {
  //     window.removeEventListener('beforeunload', onBeforeUnload);
  //     // document.removeEventListener('visibilitychange', onVisibilityChange);
  //     // also fire one last time on React unmount
  //     handlePause();
  //   };
  // }, [handlePause]);

  if (errorMsg) {
    return (
      <div className="relative aspect-video max-h-[580px] bg-black flex items-center justify-center">
        <p className="text-white text-lg text-center px-4">{errorMsg}</p>
      </div>
    );
  }

  if (!opts) {
    return (
      <div className="aspect-video max-h-[580px] bg-white border-[1px] rounded-xl flex items-center justify-center">
        <Loader size="xl" />
      </div>
    );
  }

  return <Plyr id={`plyr${id}`} source={{ type: 'video', sources: [] }} options={opts} ref={playerRef} />;
}
