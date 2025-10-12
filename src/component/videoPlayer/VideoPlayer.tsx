// File: src/components/VideoPlayer/index.tsx
import { useEffect, useRef, useState } from 'react';
import { getAuthToken } from '../../utils/auth';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorOverlay } from './ErrorOverlay';
import { ProgressBar } from './ProgressBar';
import { Controls } from './Controls';

import { Play } from 'lucide-react';

export default function VideoPlayer({
  url,
  previewMode,
  startTime = 0,
  id,
  handleForwardLecture,
  setLectureProgress,
}: {
  url: string;
  previewMode: boolean;
  startTime: number;
  sectionId?: string;
  courseSlug?: string;
  id: string;
  handleForwardLecture: () => void;
  handlePrevLecture?: () => void;
  setLectureProgress: ({
    lastViewTime,
    completed,
  }: {
    lastViewTime: number;
    completed: boolean;
  }) => Promise<void> | undefined;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const progressInterval = useRef<number | null>(null);
  const hasMarkedComplete = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settingsTab, setSettingsTab] = useState<'speed' | 'quality'>('speed');
  const [playbackRate, setPlaybackRate] = useState(1);
  const [qualities, setQualities] = useState<Array<{ label: string; height: number; index: number }>>([]);
  const [currentQuality, setCurrentQuality] = useState<number>(-1);
  const [selectQuality, setSelectQuality] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showControls, setShowControls] = useState(true);
  const [buffered, setBuffered] = useState(0);
  const [isHlsLoaded, setIsHlsLoaded] = useState(false);

  const hlsRef = useRef<any>(null);
  const hideControlsTimeout = useRef<number | null>(null);
  const lastSavedTime = useRef<number>(0);
  const saveDebounceTimeout = useRef<number | null>(null);

  const token = getAuthToken();
  const refreshToken = token?.refresh.token || '';

  // Load HLS.js dynamically
  useEffect(() => {
    const loadHls = async () => {
      try {
        if ((window as any).Hls) {
          setIsHlsLoaded(true);
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/hls.js@1.5.7/dist/hls.min.js';
        script.async = true;

        script.onload = () => {
          setIsHlsLoaded(true);
        };

        script.onerror = () => {
          setError('Failed to load video player library');
        };

        document.body.appendChild(script);
      } catch (err) {
        console.error('Error loading HLS.js:', err);
        setError('Failed to load video player library');
      }
    };

    loadHls();
  }, []);

  // Online/offline handling
  useEffect(() => {
    const handleOnline = () => {
      setError(null);

      const hls = hlsRef.current;
      if (hls) {
        try {
          hls.startLoad();
        } catch (e) {}
      }

      if (videoRef.current && !videoRef.current.paused) {
        videoRef.current.play().catch((err) => {
          console.error('Failed to resume playback:', err);
        });
      }
    };

    const handleOffline = () => {
      const hls = hlsRef.current;
      if (hls) {
        try {
          hls.stopLoad();
        } catch (e) {}
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isHlsLoaded]);

  // Initialize HLS player
  useEffect(() => {
    if (!isHlsLoaded) return;

    const video = videoRef.current;
    if (!video) return;

    setIsLoading(true);
    setError(null);
    setCurrentTime(0);
    setDuration(0);
    setQualities([]);
    setCurrentQuality(-1);
    hasMarkedComplete.current = false;
    lastSavedTime.current = 0;

    const initPlayer = async () => {
      try {
        if (hlsRef.current) {
          try {
            hlsRef.current.destroy();
          } catch (e) {}
          hlsRef.current = null;
        }

        let videoUrl = url;

        const Hls = (window as any).Hls;

        if (Hls && Hls.isSupported()) {
          const hls = new Hls({
            backBufferLength: 90,
            maxBufferLength: 30,
            xhrSetup: (xhr: { setRequestHeader: (arg0: string, arg1: string) => void }) => {
              if (refreshToken) xhr.setRequestHeader('Authorization', `Bearer ${refreshToken}`);
            },
            maxMaxBufferLength: 60,
          });

          hlsRef.current = hls;

          hls.loadSource(videoUrl);
          hls.attachMedia(video);

          hls.on(Hls.Events.MANIFEST_PARSED, (event: any, data: any) => {
            const levelsList = (data.levels || []).map((level: any, index: number) => ({
              label: level.height ? `${level.height}p` : `${level.bitrate || index}bps`,
              height: level.height || 0,
              index,
            }));

            setQualities(levelsList);
            setIsLoading(false);

            if (startTime && video.currentTime === 0) {
              try {
                video.currentTime = startTime;
              } catch (e) {}
            }

            video.play().catch(() => {});
          });

          hls.on(Hls.Events.LEVEL_SWITCHED, (event: any, data: any) => {
            setCurrentQuality(data.level ?? -1);
          });

          hls.on(Hls.Events.ERROR, (event: any, data: any) => {
            console.error('HLS Error:', data);

            if (data && data.fatal) {
              switch (data.type) {
                case Hls.ErrorTypes.NETWORK_ERROR:
                  setTimeout(() => {
                    try {
                      hls.startLoad();
                      setError(null);
                    } catch (e) {
                      setError(' Network error');
                    }
                  }, 1000);
                  break;
                default:
                  setError('Cannot play video. Please try again.');
                  break;
              }
            }
          });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = videoUrl;
          if (startTime) video.currentTime = startTime;
          setIsLoading(false);
        } else {
          setError('Your browser does not support HLS video playback. Please try Chrome, Firefox, or Safari.');
        }
      } catch (err) {
        console.error('Error initializing player:', err);
        setError('Failed to load video. Please check the URL.');
        setIsLoading(false);
      }
    };

    initPlayer();

    return () => {
      if (hlsRef.current) {
        try {
          hlsRef.current.destroy();
        } catch (e) {}
        hlsRef.current = null;
      }
    };
  }, [url, id, refreshToken, isHlsLoaded]);

  // Start time sync when metadata available
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !startTime) return;

    const handleCanPlay = () => {
      if (video.currentTime === 0 && video.readyState >= 2) {
        try {
          video.currentTime = startTime;
        } catch (e) {}
      }
    };

    video.addEventListener('loadedmetadata', handleCanPlay);
    video.addEventListener('canplay', handleCanPlay);

    return () => {
      video.removeEventListener('loadedmetadata', handleCanPlay);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [startTime, url, id]);

  // Save progress periodically (debounced)
  useEffect(() => {
    if (previewMode || !setLectureProgress) return;

    const saveProgress = () => {
      const video = videoRef.current;
      if (!video || !isFinite(video.duration)) return;

      const now = video.currentTime;
      const dur = video.duration;

      if (now < 0) return;
      if (Math.abs(now - lastSavedTime.current) < 5) {
        return;
      }

      lastSavedTime.current = now;

      if (saveDebounceTimeout.current) clearTimeout(saveDebounceTimeout.current);

      saveDebounceTimeout.current = window.setTimeout(() => {
        if (dur - now <= 30 && !hasMarkedComplete.current) {
          hasMarkedComplete.current = true;
          setLectureProgress({ lastViewTime: now, completed: true });
        } else if (!hasMarkedComplete.current) {
          setLectureProgress({ lastViewTime: now, completed: false });
        }
      }, 1000);
    };

    progressInterval.current = window.setInterval(saveProgress, 15000);

    const video = videoRef.current;

    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
      if (saveDebounceTimeout.current) clearTimeout(saveDebounceTimeout.current);

      if (video && !hasMarkedComplete.current && !previewMode) {
        const now = video.currentTime;
        const dur = video.duration;
        if (now > 0 && isFinite(dur)) {
          setLectureProgress({ lastViewTime: now, completed: dur - now <= 30 });
        }
      }
    };
  }, [previewMode, setLectureProgress, url, id]);

  const updateBuffered = () => {
    const video = videoRef.current;
    if (!video || !isFinite(video.duration) || video.duration <= 0) return;

    // Use the largest buffered end (not only the range that contains currentTime)
    let bufferedEnd = 0;
    for (let i = 0; i < video.buffered.length; i++) {
      try {
        bufferedEnd = Math.max(bufferedEnd, video.buffered.end(i));
      } catch (e) {
        // some browsers may throw if ranges are empty — ignore safely
      }
    }

    // convert to percentage
    setBuffered((bufferedEnd / video.duration) * 100);
  };

  // Video event listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let pollInterval: number | null = null;

    const startPollingBuffered = () => {
      if (pollInterval) return;
      let polls = 0;
      const maxPolls = 15;
      // poll every 800–1200ms while paused to catch background buffering
      pollInterval = window.setInterval(() => {
        polls++;
        updateBuffered();
        if (polls >= maxPolls) stopPollingBuffered();
      }, 2000);
    };
    const stopPollingBuffered = () => {
      if (pollInterval) {
        clearInterval(pollInterval);
        pollInterval = null;
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      updateBuffered();
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };
    const handlePlay = () => {
      setIsPlaying(true);
      stopPollingBuffered();
    };
    const handlePause = () => {
      setIsPlaying(false);
      startPollingBuffered();
    };
    const handleWaiting = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handlePlaying = () => setIsLoading(false);
    const handelEnded = () => {
      handleForwardLecture();
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('ended', handelEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('playing', handlePlaying);
    };
  }, [handleForwardLecture]);

  // Fullscreen handling
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Auto-hide controls
  const handleMouseMove = () => {
    setShowControls(true);

    if (hideControlsTimeout.current) clearTimeout(hideControlsTimeout.current);

    if (isPlaying) {
      hideControlsTimeout.current = window.setTimeout(() => setShowControls(false), 3000);
    }
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch((e) => console.log('Play error:', e));
    } else {
      video.pause();
    }
  };

  const handleVolumeChange = (value: number) => {
    const video = videoRef.current;
    if (!video) return;

    setVolume(value);
    video.volume = value;
    setIsMuted(value === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      const restored = volume || 0.5;
      video.volume = restored;
      setVolume(restored);
      setIsMuted(false);
    } else {
      video.volume = 0;
      setIsMuted(true);
    }
  };

  const handleSeek = (value: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = value;
    setCurrentTime(value);
  };

  const skip = (seconds: number) => {
    const video = videoRef.current;
    if (!video || !isFinite(video.duration)) return;

    video.currentTime = Math.max(0, Math.min(video.duration, video.currentTime + seconds));
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen?.() || (container as any).webkitRequestFullscreen?.();
    } else {
      document.exitFullscreen?.() || (document as any).webkitExitFullscreen?.();
    }
  };

  const changePlaybackRate = (rate: number) => {
    const video = videoRef.current;
    if (!video) return;

    setPlaybackRate(rate);
    video.playbackRate = rate;
    setShowSettings(false);
  };

  const changeQuality = (levelIndex: number) => {
    const hls = hlsRef.current;
    if (!hls) return;

    if (levelIndex === -1) {
      try {
        hls.currentLevel = -1;
        hls.autoLevelEnabled = true;
      } catch (e) {}
      setCurrentQuality(-1);
      setSelectQuality(-1);
    } else {
      try {
        hls.currentLevel = levelIndex;
        hls.autoLevelEnabled = false;
      } catch (e) {}
      setCurrentQuality(levelIndex);
      setSelectQuality(levelIndex);
    }

    setShowSettings(false);
  };

  // Keep playbackRate & volume in sync with the video element
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = playbackRate;
  }, [playbackRate]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const active = document.activeElement as HTMLElement | null;
      if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        skip(-5);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        skip(5);
      } else if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key.toLowerCase() === 'm') {
        e.preventDefault();
        toggleMute();
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [volume, isMuted, playbackRate, isPlaying]);

  const formatTime = (time: number) => {
    if (!time || !isFinite(time)) return '0:00';

    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const playbackRates = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-black overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      style={{ aspectRatio: '16/9' }}
    >
      <video
        ref={videoRef}
        className="w-full h-full"
        onClick={() => {
          if (showSettings) {
            setShowSettings(false);
          } else {
            togglePlay();
          }
        }}
        playsInline
        preload="metadata"
      />

      {isLoading && !error && <LoadingSpinner />}

      {error && <ErrorOverlay message={error} />}

      {!isPlaying && !isLoading && !error && showControls && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 m-auto w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-themeBlue rounded-full hover:bg-[#1368d8] transition-all hover:scale-110 shadow-2xl"
          aria-label="Play"
        >
          <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="white" />
        </button>
      )}

      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent px-3 md:px-4 pt-8 pb-2 md:pb-3 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div
          className="mb-3 group cursor-pointer"
          onClick={(e) => {
            const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percentage = Math.max(0, Math.min(1, x / rect.width));
            handleSeek(percentage * duration);
          }}
        >
          <ProgressBar buffered={buffered} currentTime={currentTime} duration={duration} />
        </div>
        <Controls
          isPlaying={isPlaying}
          togglePlay={togglePlay}
          skipBack={() => skip(-10)}
          skipForward={() => skip(10)}
          isMuted={isMuted}
          volume={volume}
          toggleMute={toggleMute}
          handleVolumeChange={handleVolumeChange}
          formatTime={formatTime}
          currentTime={currentTime}
          duration={duration}
          showSettings={showSettings}
          setShowSettings={setShowSettings}
          settingsTab={settingsTab}
          setSettingsTab={setSettingsTab}
          qualities={qualities}
          currentQuality={currentQuality}
          selectQuality={selectQuality}
          changeQuality={changeQuality}
          playbackRates={playbackRates}
          playbackRate={playbackRate}
          changePlaybackRate={changePlaybackRate}
          isFullscreen={isFullscreen}
          toggleFullscreen={toggleFullscreen}
        />
      </div>
    </div>
  );
}
