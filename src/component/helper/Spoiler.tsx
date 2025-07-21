import { Spoiler } from '@mantine/core';
import React, { useState, ReactNode, useEffect, useRef } from 'react';

interface CustomSpoilerProps {
  children: ReactNode;
  maxHeight?: number;
  showLabel?: string;
  hideLabel?: string;
}

export default function CustomSpoiler({
  children,
  maxHeight = 226,
  showLabel = 'Show More',
  hideLabel = 'Show Less',
}: CustomSpoilerProps) {
  const [expanded, setExpanded] = useState(false);
  const [shouldSpoil, setShouldSpoil] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const { scrollHeight, clientHeight } = contentRef.current;
      setShouldSpoil(scrollHeight > maxHeight);
    }
  }, [children, maxHeight]);

  return (
    <Spoiler
      maxHeight={maxHeight}
      showLabel={showLabel}
      hideLabel={hideLabel}
      expanded={expanded}
      onExpandedChange={setExpanded}
      styles={{
        content: { position: 'relative' },
        control: { fontWeight: 500 },
      }}
    >
      {children}
      {!expanded && shouldSpoil && (
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent" />
      )}
    </Spoiler>
  );
}
