import BoardSelection from './LandingPageComponent/BoardSelection';
import CourseSlider from './helper/CourseSlider';
import DiverseCoursesStn from './LandingPageComponent/DiverseCoursesStn';
import HeroSection from './LandingPageComponent/HeroSection';
import KeyFeaturedSection from './LandingPageComponent/KeyFeaturedSection';
import PromotionalBanner from './LandingPageComponent/PromotionalBanner';
import ReviewCarousel from './LandingPageComponent/ReviewCarousel';
import SecondPromotionalBanner from './LandingPageComponent/SecondPromotionalBanner';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function LandingPage() {
  const { notify } = useSearch({ from: '/' });
  const navigate = useNavigate();

  useEffect(() => {
    if (notify) {
      // 1. Show the toast
      if (notify === 'logout-success') {
        toast.success('You have been logged out successfully.');
      } else if (notify === 'section-expire') {
        toast.error('Session expired. Please login again.');
      }

      // 2. Clear the param so it doesn’t re-appear on refresh/back
      navigate({
        to: '.',
        search: {}, // reset all search params
        replace: true,
      });
    }
  }, [notify]);

  return (
    <>
      <HeroSection />
      <CourseSlider featured={true} search="" heading="Featured Courses" />
      <KeyFeaturedSection />
      <BoardSelection />
      <DiverseCoursesStn />
      <PromotionalBanner />
      <ReviewCarousel />
      <SecondPromotionalBanner />
    </>
  );
}
