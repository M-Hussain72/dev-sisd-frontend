import BoardSelection from './LandingPageComponent/BoardSelection';
import CourseSlider from './CourseSlider';
import DiverseCoursesStn from './LandingPageComponent/DiverseCoursesStn';
import HeroSection from './LandingPageComponent/HeroSection';
import KeyFeaturedSection from './LandingPageComponent/KeyFeaturedSection';
import PromotionalBanner from './LandingPageComponent/PromotionalBanner';
import ReviewCarousel from './LandingPageComponent/ReviewCarousel';
import SecondPromotionalBanner from './LandingPageComponent/SecondPromotionalBanner';

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <CourseSlider heading="Featured Courses" courses="" />
      <KeyFeaturedSection />
      <BoardSelection />
      <DiverseCoursesStn />
      <PromotionalBanner />
      <ReviewCarousel />
      <SecondPromotionalBanner />
    </>
  );
}
