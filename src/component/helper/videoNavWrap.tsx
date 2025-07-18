// components/VideoNavWrapper.tsx

import React, { ReactNode, useState, useRef, useEffect } from 'react';

interface VideoNavWrapperProps {
  handlePrevLecture?: () => void;
  handleForwardLecture: () => void;
  children: ReactNode;
  type: string;
}

const MemoizedContent = React.memo<{ children: ReactNode }>(({ children }) => <>{children}</>);

export default function VideoNavWrapper({ handlePrevLecture, handleForwardLecture, type, children }: VideoNavWrapperProps) {
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(true);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Show immediately on hover/touch, hide 5s after leave
  useEffect(() => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
    }
    if (hovering) {
      setVisible(true);
    } else {
      hideTimer.current = setTimeout(() => setVisible(false), 5000);
    }
    return () => {
      if (hideTimer.current) {
        clearTimeout(hideTimer.current);
      }
    };
  }, [hovering]);

  return (
    <div
      className="video-nav-group relative"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onTouchStart={() => setHovering(true)}
      onTouchEnd={() => setHovering(false)}
    >
      {handlePrevLecture && (
        <button
          onClick={handlePrevLecture}
          className={`
            absolute top-1/2 left-[1px] 
            -translate-y-1/2 z-20 p-2 
            bg-themeBlue bg-opacity-60 rounded-r-md 
            text-white hover:bg-opacity-75
            transition-opacity duration-300
            ${visible || type != 'video' ? 'opacity-100' : 'opacity-0'}
          `}
          aria-label="Previous Lecture"
        >
          ‹
        </button>
      )}

      {/* this is where your Outlet (or video) will go */}
      <MemoizedContent>{children}</MemoizedContent>

      <button
        onClick={handleForwardLecture}
        className={`
          absolute top-1/2 right-[1px]
          -translate-y-1/2 z-20 p-2 
          bg-themeBlue bg-opacity-60 rounded-l-md 
          text-white hover:bg-opacity-75
          transition-opacity duration-300
          ${visible || type != 'video' ? 'opacity-100' : 'opacity-0'}
        `}
        aria-label="Next Lecture"
      >
        ›
      </button>
    </div>
  );
}
