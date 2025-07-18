import { Spoiler } from '@mantine/core';
import React, { useState, ReactNode } from 'react';

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
      {!expanded && (
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent" />
      )}
    </Spoiler>
  );
}
