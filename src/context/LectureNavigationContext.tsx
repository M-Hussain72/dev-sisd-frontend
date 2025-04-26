import { createContext, useContext } from 'react';

interface LectureNavContextType {
  handleForwardLecture: () => void;
  handlePrevLecture: () => void;
  setSelectedLectureId: (id: string) => void;
  selectedLectureId: string;
}

export const LectureNavigationContext = createContext<LectureNavContextType | null>(null);

export function useLectureNav() {
  const ctx = useContext(LectureNavigationContext);
  if (!ctx) throw new Error('useLectureNav must be used inside a LectureNavigationProvider');
  return ctx;
}
