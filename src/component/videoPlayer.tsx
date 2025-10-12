// import { useEffect, useRef, useState } from 'react';
// import { Settings, Volume2, VolumeX, Play, Pause, SkipBack, SkipForward, Minimize } from 'lucide-react';
// import { getAuthToken } from '../utils/auth';
// import { motion, AnimatePresence } from 'framer-motion';

// export default function VideoPlayer({
//   url,
//   previewMode,
//   startTime = 0,
//   id,
//   handleForwardLecture,
//   setLectureProgress,
// }: {
//   url: string;
//   previewMode: boolean;
//   startTime: number;
//   sectionId: string;
//   courseSlug: string;
//   id: string;
//   handleForwardLecture: () => void;
//   handlePrevLecture: () => void;
//   setLectureProgress: ({
//     lastViewTime,
//     completed,
//   }: {
//     lastViewTime: number;
//     completed: boolean;
//   }) => Promise<void> | undefined;
// }) {
//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const progressInterval = useRef<number | null>(null);
//   const hasMarkedComplete = useRef(false);

//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [volume, setVolume] = useState(1);
//   const [isMuted, setIsMuted] = useState(false);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [showSettings, setShowSettings] = useState(false);
//   const [settingsTab, setSettingsTab] = useState<'speed' | 'quality'>('speed');
//   const [playbackRate, setPlaybackRate] = useState(1);
//   const [qualities, setQualities] = useState<Array<{ label: string; height: number; index: number }>>([]);
//   const [currentQuality, setCurrentQuality] = useState<number>(-1);
//   const [selectQuality, setSelectQuality] = useState<number>(-1);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [showControls, setShowControls] = useState(true);
//   const [buffered, setBuffered] = useState(0);
//   const [isHlsLoaded, setIsHlsLoaded] = useState(false);

//   const hlsRef = useRef<any>(null);
//   const hideControlsTimeout = useRef<number | null>(null);
//   const lastSavedTime = useRef<number>(0);
//   const saveDebounceTimeout = useRef<number | null>(null);

//   const token = getAuthToken();
//   const refreshToken = token?.refresh.token || '';

//   // Load HLS.js dynamically
//   useEffect(() => {
//     const loadHls = async () => {
//       try {
//         if ((window as any).Hls) {
//           setIsHlsLoaded(true);
//           return;
//         }

//         const script = document.createElement('script');
//         script.src = 'https://cdn.jsdelivr.net/npm/hls.js@1.5.7/dist/hls.min.js';
//         script.async = true;

//         script.onload = () => {
//           setIsHlsLoaded(true);
//         };

//         script.onerror = () => {
//           setError('Failed to load video player library');
//         };

//         document.body.appendChild(script);
//       } catch (err) {
//         console.error('Error loading HLS.js:', err);
//         setError('Failed to load video player library');
//       }
//     };

//     loadHls();
//   }, []);

//   // Get authenticated M3U8 URL (if your backend requires an Authorization header to return an m3u8)
//   // const getAuthenticatedUrl = async (baseUrl: string, refreshToken: string) => {
//   //   try {
//   //     const response = await fetch(baseUrl, {
//   //       headers: {
//   //         Authorization: `Bearer ${refreshToken}`,
//   //       },
//   //     });

//   //     if (!response.ok) throw new Error('Failed to authenticate video URL');

//   //     const data = await response.json();
//   //     return data.m3u8Url || data.url || baseUrl;
//   //   } catch (err) {
//   //     console.error('Error getting authenticated URL:', err);
//   //     throw err;
//   //   }
//   // };

//   useEffect(() => {
//     const handleOnline = () => {
//       // console.log('🌐 Connection restored');
//       setError(null);

//       const hls = hlsRef.current;
//       if (hls) {
//         try {
//           hls.startLoad();
//         } catch (e) {}
//       }

//       // Resume playback if it was playing before
//       if (videoRef.current && !videoRef.current.paused) {
//         videoRef.current.play().catch((err) => {
//           console.error('Failed to resume playback:', err);
//         });
//       }
//     };

//     const handleOffline = () => {
//       // console.log('📡 Connection lost');
//       const hls = hlsRef.current;
//       if (hls) {
//         try {
//           hls.stopLoad();
//         } catch (e) {}
//       }
//     };

//     window.addEventListener('online', handleOnline);
//     window.addEventListener('offline', handleOffline);

//     return () => {
//       window.removeEventListener('online', handleOnline);
//       window.removeEventListener('offline', handleOffline);
//     };
//   }, [isHlsLoaded]); // Add dependency to track loading state
//   // Initialize HLS player
//   useEffect(() => {
//     if (!isHlsLoaded) return;

//     const video = videoRef.current;
//     if (!video) return;

//     // Reset state for new video
//     setIsLoading(true);
//     setError(null);
//     setCurrentTime(0);
//     setDuration(0);
//     setQualities([]);
//     setCurrentQuality(-1);
//     hasMarkedComplete.current = false;
//     lastSavedTime.current = 0;

//     const initPlayer = async () => {
//       try {
//         // Clean up existing HLS instance
//         if (hlsRef.current) {
//           try {
//             hlsRef.current.destroy();
//           } catch (e) {
//             /* ignore */
//           }
//           hlsRef.current = null;
//         }

//         // Try to get token from a global helper if available

//         let videoUrl = url;

//         // if (token?.refresh?.token && url.includes('.m3u8')) {
//         //   try {
//         //     videoUrl = await getAuthenticatedUrl(url, token.refresh.token);
//         //   } catch (err) {
//         //     console.log('Using direct URL');
//         //   }
//         // }

//         const Hls = (window as any).Hls;

//         if (Hls && Hls.isSupported()) {
//           const hls = new Hls({
//             backBufferLength: 90,
//             maxBufferLength: 30,
//             xhrSetup: (xhr: { setRequestHeader: (arg0: string, arg1: string) => void }) => {
//               if (refreshToken) xhr.setRequestHeader('Authorization', `Bearer ${refreshToken}`);
//             },
//             maxMaxBufferLength: 60,
//           });

//           hlsRef.current = hls;

//           hls.loadSource(videoUrl);
//           hls.attachMedia(video);

//           hls.on(Hls.Events.MANIFEST_PARSED, (event: any, data: any) => {
//             const levelsList = (data.levels || []).map((level: any, index: number) => ({
//               label: level.height ? `${level.height}p` : `${level.bitrate || index}bps`,
//               height: level.height || 0,
//               index,
//             }));

//             setQualities(levelsList);
//             setIsLoading(false);

//             // Set start time if provided
//             if (startTime && video.currentTime === 0) {
//               try {
//                 video.currentTime = startTime;
//               } catch (e) {
//                 // ignore if setting time fails before metadata
//               }
//             }

//             // Try to autoplay
//             video.play().catch(() => {});
//           });

//           hls.on(Hls.Events.LEVEL_SWITCHED, (event: any, data: any) => {
//             setCurrentQuality(data.level ?? -1);
//           });

//           hls.on(Hls.Events.ERROR, (event: any, data: any) => {
//             console.error('HLS Error:', data);

//             if (data && data.fatal) {
//               switch (data.type) {
//                 case Hls.ErrorTypes.NETWORK_ERROR:
//                   setTimeout(() => {
//                     try {
//                       hls.startLoad();
//                       setError(null);
//                     } catch (e) {
//                       setError(' Network error');
//                     }
//                   }, 1000);
//                   break;
//                 default:
//                   setError('Cannot play video. Please try again.');
//                   break;
//               }
//             }
//           });
//         } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
//           // Native HLS support (Safari, some mobile browsers)
//           video.src = videoUrl;
//           if (startTime) video.currentTime = startTime;
//           setIsLoading(false);
//         } else {
//           setError('Your browser does not support HLS video playback. Please try Chrome, Firefox, or Safari.');
//         }
//       } catch (err) {
//         console.error('Error initializing player:', err);
//         setError('Failed to load video. Please check the URL.');
//         setIsLoading(false);
//       }
//     };

//     initPlayer();

//     return () => {
//       if (hlsRef.current) {
//         try {
//           hlsRef.current.destroy();
//         } catch (e) {}
//         hlsRef.current = null;
//       }
//     };
//   }, [url, id, refreshToken, isHlsLoaded]);

//   // Set start time when metadata is available
//   useEffect(() => {
//     const video = videoRef.current;
//     if (!video || !startTime) return;

//     const handleCanPlay = () => {
//       if (video.currentTime === 0 && video.readyState >= 2) {
//         try {
//           video.currentTime = startTime;
//         } catch (e) {}
//       }
//     };

//     video.addEventListener('loadedmetadata', handleCanPlay);
//     video.addEventListener('canplay', handleCanPlay);

//     return () => {
//       video.removeEventListener('loadedmetadata', handleCanPlay);
//       video.removeEventListener('canplay', handleCanPlay);
//     };
//   }, [startTime, url, id]);

//   // Save progress periodically (optimized with debouncing)
//   useEffect(() => {
//     if (previewMode || !setLectureProgress) return;

//     const saveProgress = () => {
//       const video = videoRef.current;
//       if (!video || !isFinite(video.duration)) return;

//       const now = video.currentTime;
//       const dur = video.duration;

//       if (now < 0) return;
//       if (Math.abs(now - lastSavedTime.current) < 5) {
//         return;
//       }

//       lastSavedTime.current = now;

//       if (saveDebounceTimeout.current) clearTimeout(saveDebounceTimeout.current);

//       saveDebounceTimeout.current = setTimeout(() => {
//         if (dur - now <= 30 && !hasMarkedComplete.current) {
//           hasMarkedComplete.current = true;
//           setLectureProgress({ lastViewTime: now, completed: true });
//         } else if (!hasMarkedComplete.current) {
//           setLectureProgress({ lastViewTime: now, completed: false });
//         }
//       }, 1000);
//     };

//     progressInterval.current = setInterval(saveProgress, 15000);

//     const video = videoRef.current;

//     return () => {
//       if (progressInterval.current) clearInterval(progressInterval.current);
//       if (saveDebounceTimeout.current) clearTimeout(saveDebounceTimeout.current);

//       // Final save on unmount
//       if (video && !hasMarkedComplete.current && !previewMode) {
//         const now = video.currentTime;
//         const dur = video.duration;
//         if (now > 0 && isFinite(dur)) {
//           setLectureProgress({ lastViewTime: now, completed: dur - now <= 30 });
//         }
//       }
//     };
//   }, [previewMode, setLectureProgress, url, id]);

//   // Video event listeners
//   useEffect(() => {
//     const video = videoRef.current;
//     if (!video) return;

//     const handleTimeUpdate = () => {
//       setCurrentTime(video.currentTime);

//       if (video.buffered.length > 0 && isFinite(video.duration) && video.duration > 0) {
//         // Find the buffered range that contains the current time
//         let bufferedEnd = 0;

//         for (let i = 0; i < video.buffered.length; i++) {
//           const start = video.buffered.start(i);
//           const end = video.buffered.end(i);

//           // If current time is within this range, use this buffered end
//           if (video.currentTime >= start && video.currentTime <= end) {
//             bufferedEnd = end;
//             break;
//           }
//         }

//         // If we found a relevant buffered range
//         if (bufferedEnd > 0) {
//           setBuffered((bufferedEnd / video.duration) * 100);
//         }
//       }
//     };

//     const handleLoadedMetadata = () => setDuration(video.duration);
//     const handlePlay = () => setIsPlaying(true);
//     const handlePause = () => setIsPlaying(false);
//     const handleWaiting = () => setIsLoading(true);
//     const handleCanPlay = () => setIsLoading(false);
//     const handlePlaying = () => setIsLoading(false);
//     const handelEnded = () => {
//       handleForwardLecture();
//     };

//     video.addEventListener('timeupdate', handleTimeUpdate);
//     video.addEventListener('loadedmetadata', handleLoadedMetadata);
//     video.addEventListener('play', handlePlay);
//     video.addEventListener('pause', handlePause);
//     video.addEventListener('waiting', handleWaiting);
//     video.addEventListener('canplay', handleCanPlay);
//     video.addEventListener('playing', handlePlaying);
//     video.addEventListener('ended', handelEnded);

//     return () => {
//       video.removeEventListener('timeupdate', handleTimeUpdate);
//       video.removeEventListener('loadedmetadata', handleLoadedMetadata);
//       video.removeEventListener('play', handlePlay);
//       video.removeEventListener('pause', handlePause);
//       video.removeEventListener('waiting', handleWaiting);
//       video.removeEventListener('canplay', handleCanPlay);
//       video.removeEventListener('playing', handlePlaying);
//     };
//   }, []);

//   // Fullscreen handling
//   useEffect(() => {
//     const handleFullscreenChange = () => {
//       setIsFullscreen(!!document.fullscreenElement);
//     };

//     document.addEventListener('fullscreenchange', handleFullscreenChange);
//     document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

//     return () => {
//       document.removeEventListener('fullscreenchange', handleFullscreenChange);
//       document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
//     };
//   }, []);

//   // Auto-hide controls
//   const handleMouseMove = () => {
//     setShowControls(true);

//     if (hideControlsTimeout.current) clearTimeout(hideControlsTimeout.current);

//     if (isPlaying) {
//       hideControlsTimeout.current = setTimeout(() => setShowControls(false), 3000);
//     }
//   };

//   const togglePlay = () => {
//     const video = videoRef.current;
//     if (!video) return;

//     if (video.paused) {
//       video.play().catch((e) => console.log('Play error:', e));
//     } else {
//       video.pause();
//     }
//   };

//   const handleVolumeChange = (value: number) => {
//     const video = videoRef.current;
//     if (!video) return;

//     setVolume(value);
//     video.volume = value;
//     setIsMuted(value === 0);
//   };

//   const toggleMute = () => {
//     const video = videoRef.current;
//     if (!video) return;

//     if (isMuted) {
//       const restored = volume || 0.5;
//       video.volume = restored;
//       setVolume(restored);
//       setIsMuted(false);
//     } else {
//       video.volume = 0;
//       setIsMuted(true);
//     }
//   };

//   const handleSeek = (value: number) => {
//     const video = videoRef.current;
//     if (!video) return;

//     video.currentTime = value;
//     setCurrentTime(value);
//   };

//   const skip = (seconds: number) => {
//     const video = videoRef.current;
//     if (!video || !isFinite(video.duration)) return;

//     video.currentTime = Math.max(0, Math.min(video.duration, video.currentTime + seconds));
//   };

//   const toggleFullscreen = () => {
//     const container = containerRef.current;
//     if (!container) return;

//     if (!document.fullscreenElement) {
//       container.requestFullscreen?.() || (container as any).webkitRequestFullscreen?.();
//     } else {
//       document.exitFullscreen?.() || (document as any).webkitExitFullscreen?.();
//     }
//   };

//   const changePlaybackRate = (rate: number) => {
//     const video = videoRef.current;
//     if (!video) return;

//     setPlaybackRate(rate);
//     video.playbackRate = rate;
//     setShowSettings(false);
//   };

//   const changeQuality = (levelIndex: number) => {
//     const hls = hlsRef.current;
//     if (!hls) return;

//     if (levelIndex === -1) {
//       // Auto
//       try {
//         hls.currentLevel = -1;
//         hls.autoLevelEnabled = true;
//       } catch (e) {}
//       setCurrentQuality(-1);
//       setSelectQuality(-1);
//     } else {
//       try {
//         hls.currentLevel = levelIndex;
//         hls.autoLevelEnabled = false;
//       } catch (e) {}
//       setCurrentQuality(levelIndex);
//       setSelectQuality(levelIndex);
//     }

//     setShowSettings(false);
//   };

//   // Keep playbackRate & volume in sync with the video element
//   useEffect(() => {
//     const video = videoRef.current;
//     if (!video) return;
//     video.playbackRate = playbackRate;
//   }, [playbackRate]);

//   useEffect(() => {
//     const video = videoRef.current;
//     if (!video) return;
//     video.volume = isMuted ? 0 : volume;
//   }, [volume, isMuted]);

//   // Keyboard shortcuts: Space toggles play/pause, ArrowLeft/Right seek, F fullscreen, M mute
//   useEffect(() => {
//     const handler = (e: KeyboardEvent) => {
//       // Prevent interfering with inputs
//       const active = document.activeElement as HTMLElement | null;
//       if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable)) return;

//       if (e.code === 'Space') {
//         e.preventDefault();
//         togglePlay();
//       } else if (e.key === 'ArrowLeft') {
//         e.preventDefault();
//         skip(-5);
//       } else if (e.key === 'ArrowRight') {
//         e.preventDefault();
//         skip(5);
//       } else if (e.key.toLowerCase() === 'f') {
//         e.preventDefault();
//         toggleFullscreen();
//       } else if (e.key.toLowerCase() === 'm') {
//         e.preventDefault();
//         toggleMute();
//       }
//     };

//     window.addEventListener('keydown', handler);
//     return () => window.removeEventListener('keydown', handler);
//   }, [volume, isMuted, playbackRate, isPlaying]);

//   const formatTime = (time: number) => {
//     if (!time || !isFinite(time)) return '0:00';

//     const hours = Math.floor(time / 3600);
//     const minutes = Math.floor((time % 3600) / 60);
//     const seconds = Math.floor(time % 60);

//     if (hours > 0) {
//       return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
//     }
//     return `${minutes}:${seconds.toString().padStart(2, '0')}`;
//   };

//   const playbackRates = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

//   return (
//     <div
//       ref={containerRef}
//       className="relative w-full bg-black overflow-hidden"
//       onMouseMove={handleMouseMove}
//       onMouseLeave={() => isPlaying && setShowControls(false)}
//       style={{ aspectRatio: '16/9' }}
//     >
//       {/* Video Element */}
//       <video
//         ref={videoRef}
//         className="w-full h-full"
//         onClick={() => {
//           if (showSettings) {
//             setShowSettings(false);
//           } else {
//             togglePlay();
//           }
//         }}
//         playsInline
//         preload="metadata"
//       />

//       {/* Loading Spinner */}
//       {isLoading && !error && (
//         <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//           <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin" />
//         </div>
//       )}

//       {/* Error Message */}
//       {error && (
//         <div className="relative aspect-video max-h-[580px] w-full bg-black flex items-center justify-center rounded-lg">
//           <p className="text-white text-lg text-center px-4">{error}</p>
//         </div>
//       )}

//       {/* Center Play Button */}
//       {!isPlaying && !isLoading && !error && showControls && (
//         <button
//           onClick={togglePlay}
//           className="absolute inset-0 m-auto w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-themeBlue rounded-full hover:bg-[#1368d8] transition-all hover:scale-110 shadow-2xl"
//           aria-label="Play"
//         >
//           <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="white" />
//         </button>
//       )}

//       {/* Controls */}
//       <div
//         className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent px-3 md:px-4 pt-8 pb-2 md:pb-3 transition-opacity duration-300 ${
//           showControls ? 'opacity-100' : 'opacity-0'
//         }`}
//       >
//         {/* Progress Bar - YouTube Style */}
//         <div
//           className="mb-3 group cursor-pointer"
//           onClick={(e) => {
//             const rect = e.currentTarget.getBoundingClientRect();
//             const x = e.clientX - rect.left;
//             const percentage = Math.max(0, Math.min(1, x / rect.width));
//             handleSeek(percentage * duration);
//           }}
//         >
//           <div className="relative h-1 bg-white/30 hover:h-1.5 transition-all rounded-full overflow-visible">
//             {/* Buffered */}
//             <div className="absolute h-full bg-white/50 rounded-full transition-all" style={{ width: `${buffered}%` }} />

//             {/* Progress */}
//             <div
//               className="absolute h-full bg-themeBlue rounded-full transition-all flex items-center justify-end"
//               style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
//             >
//               {/* Scrubber */}
//               <div className="w-3 h-3 bg-themeBlue rounded-full scale-0 group-hover:scale-100 transition-transform shadow-lg -mr-1.5" />
//             </div>
//           </div>
//         </div>

//         {/* Control Buttons */}
//         <div className="flex items-center justify-between text-white gap-2">
//           <div className="flex items-center gap-1 md:gap-3 flex-1">
//             {/* Play/Pause */}
//             <button onClick={togglePlay} className=" transition p-1" aria-label={isPlaying ? 'Pause' : 'Play'}>
//               {isPlaying ? (
//                 <Pause className="w-5 h-5 md:w-7 fill-white  md:h-7" />
//               ) : (
//                 <Play className="w-5 h-5 md:w-7  fill-white  md:h-7" />
//               )}
//             </button>

//             {/* Skip Controls */}
//             <button
//               onClick={() => skip(-10)}
//               className="hover:text-themeBlue transition p-1 hidden sm:block"
//               aria-label="Rewind 10 seconds"
//             >
//               <SkipBack className="w-5 h-5 md:w-6 md:h-6" />
//             </button>

//             <button
//               onClick={() => skip(10)}
//               className="hover:text-themeBlue transition p-1 hidden sm:block"
//               aria-label="Forward 10 seconds"
//             >
//               <SkipForward className="w-5 h-5 md:w-6 md:h-6" />
//             </button>

//             {/* Volume */}
//             <div className="hidden md:flex items-center gap-2 group/volume">
//               <button
//                 onClick={toggleMute}
//                 className="hover:text-themeBlue transition p-1"
//                 aria-label={isMuted ? 'Unmute' : 'Mute'}
//               >
//                 {isMuted || volume === 0 ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
//               </button>

//               <div className="w-0 group-hover/volume:w-20 transition-all overflow-hidden">
//                 <input
//                   type="range"
//                   min="0"
//                   max="1"
//                   step="0.01"
//                   value={isMuted ? 0 : volume}
//                   onChange={(e) => handleVolumeChange(Number(e.target.value))}
//                   className="w-full accent-[#307ee1]"
//                   style={{
//                     background: `linear-gradient(to right, #307ee1 20%, #307ee1 ${(isMuted ? 0 : volume) * 100}%, #4b5563 ${(isMuted ? 0 : volume) * 100}%, #4b5563 100%)`,
//                   }}
//                 />
//               </div>
//             </div>

//             {/* Time */}
//             <span className="text-xs md:text-sm whitespace-nowrap">
//               {formatTime(currentTime)} / {formatTime(duration)}
//             </span>
//           </div>

//           <div className="flex items-center gap-1 md:gap-3">
//             {/* Settings */}
//             <div className="relative">
//               <button
//                 onClick={() => setShowSettings(!showSettings)}
//                 className="hover:text-themeBlue transition p-1"
//                 aria-label="Settings"
//               >
//                 <Settings className="w-5 h-5 md:w-6 md:h-6" />
//               </button>

//               {/* Settings Panel */}
//               {showSettings && (
//                 <AnimatePresence>
//                   <>
//                     {/* Overlay for mobile */}
//                     <motion.div
//                       key="overlay"
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 0.6 }}
//                       exit={{ opacity: 0 }}
//                       transition={{ duration: 0.25 }}
//                       className="md:hidden fixed inset-0 bg-black z-40"
//                       onClick={() => setShowSettings(false)}
//                     />

//                     {/* Settings panel */}
//                     <motion.div
//                       key="settings-panel"
//                       initial={{ y: '100%', opacity: 0 }}
//                       animate={{ y: 0, opacity: 1 }}
//                       exit={{ y: '100%', opacity: 0 }}
//                       transition={{
//                         type: 'spring',
//                         stiffness: 200,
//                         damping: 25,
//                       }}
//                       className={`fixed md:absolute md:bottom-full md:right-0 md:mb-2 bottom-0 left-0 right-0 md:left-auto bg-white md:bg-gray-900 md:rounded-xl rounded-t-2xl shadow-2xl overflow-hidden w-full md:w-80 z-50`}
//                     >
//                       {/* Mobile Header */}
//                       <div className="md:hidden bg-gray-100 px-4 py-3 flex items-center justify-between border-b">
//                         <h3 className="font-semibold text-gray-900">Settings</h3>
//                         <button
//                           onClick={() => setShowSettings(false)}
//                           className="text-gray-600 hover:text-gray-900 text-2xl leading-none"
//                         >
//                           ×
//                         </button>
//                       </div>

//                       {/* Tabs */}
//                       <div className="flex bg-gray-100 md:bg-gray-800">
//                         <button
//                           onClick={() => setSettingsTab('quality')}
//                           className={`flex-1 px-4 py-3 text-sm font-medium transition ${
//                             settingsTab === 'quality'
//                               ? 'bg-white md:bg-gray-700 text-gray-900 md:text-white border-b-2 border-themeBlue'
//                               : 'text-gray-600 md:text-gray-400'
//                           }`}
//                         >
//                           Quality
//                         </button>
//                         <button
//                           onClick={() => setSettingsTab('speed')}
//                           className={`flex-1 px-4 py-3 text-sm font-medium transition ${
//                             settingsTab === 'speed'
//                               ? 'bg-white md:bg-gray-700 text-gray-900 md:text-white border-b-2 border-themeBlue'
//                               : 'text-gray-600 md:text-gray-400'
//                           }`}
//                         >
//                           Playback speed
//                         </button>
//                       </div>

//                       {/* Tab Content */}
//                       <div className="max-h-72 md:max-h-80 overflow-y-auto bg-white md:bg-gray-900">
//                         {settingsTab === 'quality' && (
//                           <div className="py-2">
//                             {qualities.length > 0 ? (
//                               <>
//                                 <button
//                                   onClick={() => changeQuality(-1)}
//                                   className={`w-full px-4 py-3 text-sm text-left transition flex items-center justify-between hover:bg-gray-50 md:hover:bg-gray-800 ${
//                                     currentQuality === -1
//                                       ? 'bg-blue-50 md:bg-gray-800 text-blue-600 md:text-white'
//                                       : 'text-gray-900 md:text-gray-300'
//                                   }`}
//                                 >
//                                   <span className="font-medium">Auto</span>
//                                   {selectQuality === -1 && <span className="text-blue-600 md:text-red-500 text-lg">✓</span>}
//                                 </button>
//                                 {qualities.map((quality) => (
//                                   <button
//                                     key={quality.index}
//                                     onClick={() => changeQuality(quality.index)}
//                                     className={`w-full px-4 py-3 text-sm text-left transition flex items-center justify-between hover:bg-gray-50 md:hover:bg-gray-800 ${
//                                       currentQuality === quality.index
//                                         ? 'bg-blue-50 md:bg-gray-800 text-blue-600 md:text-white'
//                                         : 'text-gray-900 md:text-gray-300'
//                                     }`}
//                                   >
//                                     <span className="font-medium">{quality.label}</span>
//                                     {selectQuality === quality.index && (
//                                       <span className="text-blue-600 md:text-red-500 text-lg">✓</span>
//                                     )}
//                                   </button>
//                                 ))}
//                               </>
//                             ) : (
//                               <div className="px-4 py-12 text-center text-gray-500 md:text-gray-400 text-sm">
//                                 No quality options available
//                               </div>
//                             )}
//                           </div>
//                         )}

//                         {settingsTab === 'speed' && (
//                           <div className="py-2">
//                             {playbackRates.map((rate) => (
//                               <button
//                                 key={rate}
//                                 onClick={() => changePlaybackRate(rate)}
//                                 className={`w-full px-4 py-3 text-sm text-left transition flex items-center justify-between hover:bg-gray-50 md:hover:bg-gray-800 ${
//                                   playbackRate === rate
//                                     ? 'bg-blue-50 md:bg-gray-800 text-blue-600 md:text-white'
//                                     : 'text-gray-900 md:text-gray-300'
//                                 }`}
//                               >
//                                 <span className="font-medium">{rate === 1 ? 'Normal' : `${rate}x`}</span>
//                                 {playbackRate === rate && <span className="text-blue-600 md:text-red-500 text-lg">✓</span>}
//                               </button>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                     </motion.div>
//                   </>
//                 </AnimatePresence>
//               )}
//             </div>

//             {/* Fullscreen Toggle */}
//             <button
//               onClick={toggleFullscreen}
//               className=" transition p-1"
//               aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
//             >
//               {isFullscreen ? (
//                 // Exit fullscreen icon (collapse inward)
//                 <Minimize className="w-5 h-5 md:w-6 md:h-6" />
//               ) : (
//                 // Enter fullscreen icon (expand outward)
//                 <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
//                   <path d="M3 9V5a2 2 0 0 1 2-2h4" />
//                   <path d="M21 9V5a2 2 0 0 0-2-2h-4" />
//                   <path d="M3 15v4a2 2 0 0 0 2 2h4" />
//                   <path d="M21 15v4a2 2 0 0 1-2 2h-4" />
//                 </svg>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

//save player it same but in one file
