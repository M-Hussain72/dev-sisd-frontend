// File: src/components/VideoPlayer/Controls.tsx
import React from 'react';
import { Settings, Volume2, VolumeX, Play, Pause, SkipBack, SkipForward, Minimize } from 'lucide-react';
import { SettingsPanel } from './SettingsPanel';

export const Controls = ({
  isPlaying,
  togglePlay,
  skipBack,
  skipForward,
  isMuted,
  volume,
  toggleMute,
  handleVolumeChange,
  formatTime,
  currentTime,
  duration,
  showSettings,
  setShowSettings,
  settingsTab,
  setSettingsTab,
  qualities,
  currentQuality,
  selectQuality,
  changeQuality,
  playbackRates,
  playbackRate,
  changePlaybackRate,
  isFullscreen,
  toggleFullscreen,
}: any) => {
  return (
    <div className="flex items-center justify-between text-white gap-2">
      <div className="flex items-center gap-1 md:gap-3 flex-1">
        <button onClick={togglePlay} className=" transition p-1" aria-label={isPlaying ? 'Pause' : 'Play'}>
          {isPlaying ? (
            <Pause className="w-5 h-5 md:w-7 fill-white  md:h-7" />
          ) : (
            <Play className="w-5 h-5 md:w-7  fill-white  md:h-7" />
          )}
        </button>

        <button
          onClick={skipBack}
          className="hover:text-themeBlue transition p-1 hidden sm:block"
          aria-label="Rewind 10 seconds"
        >
          <SkipBack className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <button
          onClick={skipForward}
          className="hover:text-themeBlue transition p-1 hidden sm:block"
          aria-label="Forward 10 seconds"
        >
          <SkipForward className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <div className="hidden md:flex items-center gap-2 group/volume">
          <button
            onClick={toggleMute}
            className="hover:text-themeBlue transition p-1"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted || volume === 0 ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
          </button>

          <div className="w-0 group-hover/volume:w-20 transition-all overflow-hidden">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={(e) => handleVolumeChange(Number(e.target.value))}
              className="w-full accent-[#307ee1]"
              style={{
                background: `linear-gradient(to right, #307ee1 20%, #307ee1 ${(isMuted ? 0 : volume) * 100}%, #4b5563 ${(isMuted ? 0 : volume) * 100}%, #4b5563 100%)`,
              }}
            />
          </div>
        </div>

        <span className="text-xs md:text-sm whitespace-nowrap">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>

      <div className="flex items-center gap-1 md:gap-3">
        <div className="relative">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="hover:text-themeBlue transition p-1"
            aria-label="Settings"
          >
            <Settings className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {showSettings && (
            <SettingsPanel
              key="settings-panel"
              onClose={() => setShowSettings(false)}
              settingsTab={settingsTab}
              setSettingsTab={setSettingsTab}
              qualities={qualities}
              currentQuality={currentQuality}
              selectQuality={selectQuality}
              changeQuality={changeQuality}
              playbackRates={playbackRates}
              playbackRate={playbackRate}
              changePlaybackRate={changePlaybackRate}
            />
          )}
        </div>

        <button
          onClick={toggleFullscreen}
          className=" transition p-1"
          aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
        >
          {isFullscreen ? (
            <Minimize className="w-5 h-5 md:w-6 md:h-6" />
          ) : (
            <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M3 9V5a2 2 0 0 1 2-2h4" />
              <path d="M21 9V5a2 2 0 0 0-2-2h-4" />
              <path d="M3 15v4a2 2 0 0 0 2 2h4" />
              <path d="M21 15v4a2 2 0 0 1-2 2h-4" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};
