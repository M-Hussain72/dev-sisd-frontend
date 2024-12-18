import { useRouter, RouterEvent, useLocation } from '@tanstack/react-router';
import { useEffect } from 'react';

const ScrollToTop = () => {
  const router = useRouter();
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when this component renders
  }, [pathname, search]);

  return null;
};

export default ScrollToTop;
