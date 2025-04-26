// SectionNavigationContext.tsx
import { createContext, useContext } from 'react';

export interface SectionNavContextType {
  handleSectionComplete: () => void;
}

export const SectionNavigationContext = createContext<SectionNavContextType | null>(null);

export function useSectionNav() {
  const context = useContext(SectionNavigationContext);
  if (!context) {
    throw new Error('useSectionNav must be used within a SectionNavigationProvider');
  }
  return context;
}
