// import { useEffect, useRef, useState } from 'react';
// import 'plyr/dist/plyr.css';
// import Hls, { ErrorData, ErrorTypes, Events } from 'hls.js';
// import Plyr, { APITypes, PlyrInstance } from 'plyr-react';
// import { Loader } from '@mantine/core';
// import useAuthAxios from '../hook/useAuthAxios';
// import { getAuthToken } from '../utils/auth';
// import { usePersistedLectureProgress } from '../hook/usePersistedLectureProgress';

// export default function VideoPlayer({
//   url,
//   previewMode,
//   startTime = 0,
//   id,
//   setLectureProgress,
// }: {
//   url: string;
//   previewMode: boolean;
//   startTime: number;
//   id: string;
//   setLectureProgress: ({
//     lastViewTime,
//     completed,
//   }: {
//     lastViewTime: number;
//     completed: boolean;
//   }) => Promise<void> | undefined;
// }) {
//   const playerRef = useRef<APITypes>(null);
//   const hlsRef = useRef<Hls | null>(null);
//   const [opts, setOpts] = useState<any>(null);
//   const [errorMsg, setErrorMsg] = useState<string | null>(null);
//   const authAxios = useAuthAxios();

//   // extract primitive token value to avoid object reference changes
//   const token = getAuthToken();
//   const accessToken = token?.access?.token || '';

//   const handlePause = async () => {
//     const currentTime = playerRef.current?.plyr.currentTime || 0;
//     await setLectureProgress({ lastViewTime: currentTime, completed: false });
//   };
//   const handleEnded = async () => {
//     await setLectureProgress({ lastViewTime: 0, completed: true });
//   };

//   // 1) Preload & parse HLS manifest to discover quality levels

//   useEffect(() => {
//     let hls: Hls | null = null;
//     let errorHandled = false;
//     setErrorMsg(null);

//     if (url.endsWith('.m3u8')) {
//       if (Hls.isSupported()) {
//         const dummy = document.createElement('video');
//         dummy.crossOrigin = 'anonymous';

//         hls = new Hls({
//            maxBufferLength: 30, // Buffer ahead 20s
//            maxMaxBufferLength: 40, // Hard max buffer
//            backBufferLength: 20,
//           xhrSetup: (xhr) => xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`),
//           manifestLoadingMaxRetry: 3,
//           levelLoadingMaxRetry: 3,
//           fragLoadingMaxRetry: 5,

//           // Optional: Better timeout settings
//           fragLoadingTimeOut: 20000,
//           levelLoadingTimeOut: 15000,
//           manifestLoadingTimeOut: 15000,
//         });
//         hlsRef.current = hls;

//         hls.attachMedia(dummy);
//         hls.loadSource(url);

//         const onManifest = () => {
//           if (errorHandled) return;
//           const heights = Array.from(new Set(hls!.levels.map((l) => l.height))).sort((a, b) => b - a);
//           const qualityOptions = ['auto', ...heights.map(String)];

//           setOpts({
//             controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'settings', 'fullscreen'],
//             settings: ['speed', 'quality'],
//             speed: { selected: 1, options: [0.5, 1, 1.25, 1.5, 2] },
//             quality: {
//               default: 0,
//               options: qualityOptions,
//               forced: true,
//               onChange: (q: string) => {
//                 if (!hlsRef.current) return;
//                 hlsRef.current.currentLevel =
//                   q === 'auto' ? -1 : hlsRef.current.levels.findIndex((l) => String(l.height) === q);
//               },
//             },
//             ratio: '16:9',
//             autoplay: true,
//             keyboard: { global: true },
//             html5: { attributes: { crossorigin: 'anonymous', playsinline: '' } },
//           });
//         };
//         hls.on(Events.MANIFEST_PARSED, onManifest);

//         hls.on(Hls.Events.ERROR, (event, data) => {
//           console.warn('HLS.js error event:', data);

//           if (data.fatal) {
//             const responseCode = (data.response as any)?.code;
//             const isAuthError = responseCode === 401;

//             if (isAuthError && !errorHandled) {
//               errorHandled = true;
//               hls?.off(Events.MANIFEST_PARSED, onManifest);
//               hls?.stopLoad();
//               hls?.detachMedia();
//               hls?.destroy();
//               setErrorMsg('Unauthorized: You do not have permission to view this video.');
//               return;
//             }
//             switch (data.type) {
//               case Hls.ErrorTypes.NETWORK_ERROR:
//                 hls?.startLoad();
//                 break;
//               case Hls.ErrorTypes.MEDIA_ERROR:
//                 hls?.recoverMediaError();
//                 break;
//               default:
//                 hls?.destroy();
//                 break;
//             }
//           }
//         });

//         const onError = (_event: string, data: ErrorData) => {
//           if (errorHandled || !hls) return;
//           errorHandled = true;
//           console.error('HLS fatal error', data);

//           let msg = 'Error loading video.';
//           if (data.type === ErrorTypes.NETWORK_ERROR) {
//             msg = 'Network error: failed to load video.';
//           } else if (data.type === ErrorTypes.MEDIA_ERROR) {
//             msg = 'Media error: corrupted stream.';
//           } else {
//             msg = `Error: ${data.details}`;
//           }

//           hls.off(Events.MANIFEST_PARSED, onManifest);
//           hls.off(Events.ERROR, onError);
//           hls.stopLoad();
//           hls.detachMedia();
//           hls.destroy();

//           setErrorMsg(msg);
//         };
//         // hls.on(Events.ERROR, onError);
//       }
//     } else {
//       // non-HLS fallback
//       setOpts({
//         controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'settings', 'fullscreen'],
//         settings: ['speed'],
//         speed: { selected: 1, options: [0.5, 1, 1.25, 1.5, 2] },
//         ratio: '16:9',
//         autoplay: true,
//         keyboard: { global: true },
//         html5: { attributes: { crossorigin: 'anonymous', playsinline: '' } },
//       });
//     }

//     return () => {
//       (hls || hlsRef.current)?.destroy();
//     };
//   }, [url, accessToken]);

//   // 2) Attach HLS to the actual video element
//   useEffect(() => {
//     if (errorMsg) return;

//     const init = () => {
//       if (!opts) return;
//       const plyrInst = playerRef.current?.plyr as PlyrInstance;
//       if (!plyrInst) return;
//       const media = document.getElementById(`plyr${id}`) as HTMLVideoElement | null;
//       if (hlsRef.current && media) {
//         media.crossOrigin = 'anonymous';
//         hlsRef.current.attachMedia(media);
//       }

//       // plyrInst.on('ended', handleEnded);

//       let earlyFired = false;
//       const onTimeUpdate = () => {
//         const current = plyrInst.currentTime;
//         const total = plyrInst.duration;
//         if (!earlyFired && total - current <= 5) {
//           earlyFired = true;
//           handleEnded();
//         }
//       };
//       if (!previewMode) {
//         plyrInst.on('pause', handlePause);
//         plyrInst.on('timeupdate', onTimeUpdate);
//       }
//       if (media && startTime > 0) {
//         const onLoaded = () => {
//           media.currentTime = Math.min(startTime, media.duration);
//           media.removeEventListener('loadedmetadata', onLoaded);
//         };
//         media.addEventListener('loadedmetadata', onLoaded);
//       }

//       plyrInst.play();
//       return () => {
//         plyrInst.off('pause', handlePause);
//         // plyrInst.off('ended', handleEnded);
//         plyrInst.off('timeupdate', onTimeUpdate);
//       };
//     };

//     const timer = setTimeout(init, 100);
//     return () => clearTimeout(timer);
//   }, [opts, id, startTime, url, errorMsg]);

//   // useEffect(() => {
//   //   // 1) When the page is about to unload…
//   //   const onBeforeUnload = (e: BeforeUnloadEvent) => {
//   //     // Fire-and-forget; you can’t await here
//   //     handlePause();
//   //     // Chrome requires you set returnValue to show the prompt,
//   //     // but if you don’t need a confirmation dialog you can omit it.
//   //     // e.returnValue = '';
//   //   };

//   //   // // 2) Also catch when the tab goes to background / user switches away
//   //   // const onVisibilityChange = () => {
//   //   //   if (document.visibilityState === 'hidden') {
//   //   //     handlePause();
//   //   //   }
//   //   // };

//   //   window.addEventListener('beforeunload', onBeforeUnload);
//   //   // document.addEventListener('visibilitychange', onVisibilityChange);

//   //   return () => {
//   //     window.removeEventListener('beforeunload', onBeforeUnload);
//   //     // document.removeEventListener('visibilitychange', onVisibilityChange);
//   //     // also fire one last time on React unmount
//   //     handlePause();
//   //   };
//   // }, [handlePause]);

//   if (errorMsg) {
//     return (
//       <div className="relative aspect-video max-h-[580px] bg-black flex items-center justify-center">
//         <p className="text-white text-lg text-center px-4">{errorMsg}</p>
//       </div>
//     );
//   }

//   if (!opts) {
//     return (
//       <div className="aspect-video max-h-[580px] bg-white border-[1px] rounded-xl flex items-center justify-center">
//         <Loader size="xl" />
//       </div>
//     );
//   }

//   return <Plyr id={`plyr${id}`} source={{ type: 'video', sources: [] }} options={opts} ref={playerRef} />;
// }

import { getAuthToken } from '../utils/auth';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import Hls, { ErrorData, ErrorTypes, Events } from 'hls.js';
import { useLectureNav } from '../context/LectureNavigationContext';
import config from '../utils/config';

// --- Dependency Imports from CDN ---
// We'll dynamically load these to avoid build-time resolution issues.
const loadScript = (src: string) => {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error(`Script load error for ${src}`));
    document.body.appendChild(script);
  });
};

const loadStylesheet = (href: string) => {
  if (document.querySelector(`link[href="${href}"]`)) {
    return;
  }
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
};

// A self-contained Loader to avoid external dependencies
const Loader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
    <style>{`
      .spinner {
        border: 5px solid rgba(0, 0, 0, 0.1);
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border-left-color: #09f;
        animation: spin 1s ease infinite;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
    <div className="spinner"></div>
  </div>
);

export default function VideoPlayer({
  url,
  previewMode,
  startTime = 0,
  id,
  setLectureProgress,
  handleForwardLecture,
}: {
  url: string;
  previewMode: boolean;
  startTime: number;
  id: string;
  handleForwardLecture: () => void;
  setLectureProgress: ({
    lastViewTime,
    completed,
  }: {
    lastViewTime: number;
    completed: boolean;
  }) => Promise<void> | undefined;
}) {
  const playerRef = useRef<HTMLVideoElement>(null);
  const plyrInstanceRef = useRef<any>(null); // To hold the Plyr instance
  const hlsRef = useRef<Hls | null>(null);
  const [opts, setOpts] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [libsLoaded, setLibsLoaded] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false); // <--- NEW STATE

  const token = getAuthToken();
  const accessToken = token?.access?.token || '';

  // Effect to load external libraries (Plyr CSS and JS)
  useEffect(() => {
    loadStylesheet('https://cdn.plyr.io/3.7.8/plyr.css');
    loadScript('https://cdn.plyr.io/3.7.8/plyr.js')
      .then(() => setLibsLoaded(true))
      .catch((err) => setErrorMsg('Failed to load video player library.'));
  }, []);

  const handlePause = useCallback(async () => {
    if (previewMode || !plyrInstanceRef.current) return;
    const currentTime = plyrInstanceRef.current.currentTime || 0;
    const duration = plyrInstanceRef.current.duration || 0;
    if (duration > 0 && duration - currentTime < 5) return;
    await setLectureProgress({ lastViewTime: currentTime, completed: false });
  }, [setLectureProgress, previewMode]);

  const handleEnded = useCallback(async () => {
    // if (previewMode) return;
    handleForwardLecture();
  }, [handleForwardLecture]);

  // Effect to initialize HLS and determine player options
  useEffect(() => {
    if (!url) return;
    let hls: Hls | null = null;
    setErrorMsg(null);

    if (url.endsWith('.m3u8')) {
      if (Hls.isSupported()) {
        hls = new Hls({
          maxBufferLength: 30,
          maxMaxBufferLength: 60,
          xhrSetup: (xhr) => {
            if (accessToken) xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);
          },
          startPosition: startTime > 0 ? startTime : -1,
        });
        hlsRef.current = hls;

        hls.on(Hls.Events.MANIFEST_PARSED, (_event, data) => {
          const heights = Array.from(new Set(hls!.levels.map((l) => l.height))).sort((a, b) => b - a);
          const qualityOptions = [0, ...heights];
          setOpts({
            quality: {
              default: 0,
              options: qualityOptions,
              forced: true,
              onChange: (q: number) => {
                if (!hlsRef.current) return;
                hlsRef.current.currentLevel = q === 0 ? -1 : hlsRef.current.levels.findIndex((l) => l.height === q);
              },
            },
          });
        });

        hls.on(Hls.Events.ERROR, (event, data: ErrorData) => {
          console.error('HLS.js Error:', data);
          if (data.fatal) {
            if (data.response?.code === 401 || data.response?.code === 403) {
              setErrorMsg('Unauthorized: You do not have permission to view this video.');
            } else {
              setErrorMsg('An error occurred while loading the video.');
            }
            hls?.destroy();
          }
        });

        hls.loadSource(url);
      } else {
        setErrorMsg('HLS is not supported in your browser.');
      }
    } else {
      setOpts({}); // Set empty opts for non-HLS media
    }

    return () => {
      hls?.destroy();
      hlsRef.current = null;
    };
  }, [url, accessToken]);

  // Effect to initialize Plyr and bind all events
  useEffect(() => {
    // Wait for libraries to load, options to be set, and the video element to be available
    if (!libsLoaded || !opts || !playerRef.current) {
      return;
    }

    const videoElement = playerRef.current;
    const hls = hlsRef.current;

    if (hls) {
      hls.attachMedia(videoElement);
    } else if (!url.endsWith('.m3u8')) {
      videoElement.src = url;
    }

    const player = new (window as any).Plyr(videoElement, {
      ...opts,
      autoplay: false, // **FIX**: Disable autoplay to control it manually
      controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'settings', 'fullscreen', 'forward'],
      settings: ['speed', 'quality'],
      speed: { selected: 1, options: [0.5, 1, 1.25, 1.5, 2] },
      keyboard: { global: true },
      ratio: '16:9',
    });

    plyrInstanceRef.current = player;
    setIsBuffering(true);

    const onReady = () => {
      player.play().catch(() => {});
    };
    player.on('ready', onReady);
    // **FIX**: Use the 'canplay' event which is more reliable for seeking.
    const onCanPlay = () => {
      // This listener should only run once to set the initial time.
      player.off('canplay', onCanPlay);

      setIsBuffering(false);
    };

    const onWaiting = () => {
      setIsBuffering(true);
    };

    const onPlaying = () => {
      setIsBuffering(false);
    };

    const onSeeked = () => {
      // Often indicates buffering after a seek
      setIsBuffering(false); // Will immediately hide, but if it needs more data, 'waiting' will fire again
    };
    let earlyFired = false;
    const onTimeUpdate = async () => {
      const current = player.currentTime;
      const total = player.duration;
      if (!earlyFired && total - current <= 5) {
        earlyFired = true;
        await setLectureProgress({ lastViewTime: 0, completed: true });
      }
    };
    if (!previewMode) {
      // player.on('pause', handlePause);
      player.on('timeupdate', onTimeUpdate);
    }
    player.on('canplay', onCanPlay);
    player.on('waiting', onWaiting);
    player.on('playing', onPlaying);
    player.on('seeked', onSeeked);
    player.on('ended', handleEnded);

    return () => {
      if (player && player.destroy) {
        player.off('canplay', onCanPlay);
        player.off('waiting', onWaiting);
        player.off('playing', onPlaying);
        player.off('seeked', onSeeked);
        player.destroy();
      }
      plyrInstanceRef.current = null;
    };
  }, [libsLoaded, opts, previewMode, startTime, handlePause, handleEnded]);

  const saveProgressKeepalive = () => {
    if (previewMode) return;
    const el = playerRef.current;
    if (!el) return;
    const lastViewTime = el.currentTime || 0;
    if (el.duration > 0 && el.duration - lastViewTime < 5) return;

    fetch(`${config.BASE_URL}/v1/user/${'test-preview-2'}/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // attach your Bearer token here:
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ lectureId: id, type: 'video', last_watched_second: lastViewTime, completed: false }),
      keepalive: true, // ← lets this request out on unload
    });
  };

  // useEffect(() => {
  //   if (previewMode) return;
  //   const onPageHide = () => {
  //     console.log('[VideoPlayer] pagehide fired, saving progress…');
  //     saveProgressKeepalive();
  //   };

  //   window.addEventListener('beforeunload', onPageHide);
  //   window.addEventListener('unload', onPageHide);
  //   window.addEventListener('pagehide', onPageHide);

  //   return () => {
  //     window.removeEventListener('beforeunload', onPageHide);
  //     window.removeEventListener('unload', onPageHide);
  //     window.removeEventListener('pagehide', onPageHide);
  //   };
  // }, [saveProgressKeepalive, previewMode, id]);

  // --- Render Logic ---
  if (errorMsg) {
    return (
      <div className="relative aspect-video max-h-[580px] w-full bg-black flex items-center justify-center rounded-lg">
        <p className="text-white text-lg text-center px-4">{errorMsg}</p>
      </div>
    );
  }

  // Show loader while libraries are loading or options are being determined
  if (!libsLoaded || !opts) {
    return (
      <div className="aspect-video max-h-[580px] w-full bg-gray-200 border rounded-lg flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="aspect-video relative max-h-[580px] w-full">
      <video ref={playerRef} id={`player-${id}`} playsInline controls />
      {isBuffering && (
        <div className="absolute inset-0 flex items-center justify-center z-10" style={{ pointerEvents: 'none' }}>
          <Loader />
        </div>
      )}
    </div>
  );
}
