// File: src/components/VideoPlayer/SettingsPanel.tsx
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export const SettingsPanel = ({
  onClose,
  settingsTab,
  setSettingsTab,
  qualities,
  currentQuality,
  selectQuality,
  changeQuality,
  playbackRates,
  playbackRate,
  changePlaybackRate,
}: any) => {
  return (
    <AnimatePresence>
      <>
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="md:hidden fixed inset-0 bg-black z-40"
          onClick={onClose}
        />

        <motion.div
          key="settings-panel"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 25,
          }}
          className={`fixed md:absolute md:bottom-full md:right-0 md:mb-2 bottom-0 left-0 right-0 md:left-auto bg-white md:bg-gray-900 md:rounded-xl rounded-t-2xl shadow-2xl overflow-hidden w-full md:w-80 z-50`}
        >
          <div className="md:hidden bg-gray-100 px-4 py-3 flex items-center justify-between border-b">
            <h3 className="font-semibold text-gray-900">Settings</h3>
            <button onClick={onClose} className="text-gray-600 hover:text-gray-900 text-2xl leading-none">
              ×
            </button>
          </div>

          <div className="flex bg-gray-100 md:bg-gray-800">
            <button
              onClick={() => setSettingsTab('quality')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition ${settingsTab === 'quality' ? 'bg-white md:bg-gray-700 text-gray-900 md:text-white border-b-2 border-themeBlue' : 'text-gray-600 md:text-gray-400'}`}
            >
              Quality
            </button>
            <button
              onClick={() => setSettingsTab('speed')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition ${settingsTab === 'speed' ? 'bg-white md:bg-gray-700 text-gray-900 md:text-white border-b-2 border-themeBlue' : 'text-gray-600 md:text-gray-400'}`}
            >
              Playback speed
            </button>
          </div>

          <div className="max-h-72 md:max-h-80 overflow-y-auto bg-white md:bg-gray-900">
            {settingsTab === 'quality' && (
              <div className="py-2">
                {qualities.length > 0 ? (
                  <>
                    <button
                      onClick={() => changeQuality(-1)}
                      className={`w-full px-4 py-3 text-sm text-left transition flex items-center justify-between hover:bg-gray-50 md:hover:bg-gray-800 ${currentQuality === -1 ? 'bg-blue-50 md:bg-gray-800 text-blue-600 md:text-white' : 'text-gray-900 md:text-gray-300'}`}
                    >
                      <span className="font-medium">Auto</span>
                      {selectQuality === -1 && <span className="text-blue-600 md:text-red-500 text-lg">✓</span>}
                    </button>

                    {qualities.map((quality: any) => (
                      <button
                        key={quality.index}
                        onClick={() => changeQuality(quality.index)}
                        className={`w-full px-4 py-3 text-sm text-left transition flex items-center justify-between hover:bg-gray-50 md:hover:bg-gray-800 ${currentQuality === quality.index ? 'bg-blue-50 md:bg-gray-800 text-blue-600 md:text-white' : 'text-gray-900 md:text-gray-300'}`}
                      >
                        <span className="font-medium">{quality.label}</span>
                        {selectQuality === quality.index && <span className="text-blue-600 md:text-red-500 text-lg">✓</span>}
                      </button>
                    ))}
                  </>
                ) : (
                  <div className="px-4 py-12 text-center text-gray-500 md:text-gray-400 text-sm">
                    No quality options available
                  </div>
                )}
              </div>
            )}

            {settingsTab === 'speed' && (
              <div className="py-2">
                {playbackRates.map((rate: number) => (
                  <button
                    key={rate}
                    onClick={() => changePlaybackRate(rate)}
                    className={`w-full px-4 py-3 text-sm text-left transition flex items-center justify-between hover:bg-gray-50 md:hover:bg-gray-800 ${playbackRate === rate ? 'bg-blue-50 md:bg-gray-800 text-blue-600 md:text-white' : 'text-gray-900 md:text-gray-300'}`}
                  >
                    <span className="font-medium">{rate === 1 ? 'Normal' : `${rate}x`}</span>
                    {playbackRate === rate && <span className="text-blue-600 md:text-red-500 text-lg">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </>
    </AnimatePresence>
  );
};
