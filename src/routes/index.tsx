import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import HeroSection from '../component/HeroSection';
import FeaturedCourses from '../component/FeaturedCourses';
import KeyFeaturedSection from '../component/KeyFeturedSection';
import BoardSelection from '../component/BoardSelection';
import DiverseCoursesStn from '../component/DiverseCoursesStn';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedCourses />
      <KeyFeaturedSection />
      <BoardSelection />
      <DiverseCoursesStn />
    </>
  );
}
