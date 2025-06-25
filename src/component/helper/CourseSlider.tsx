import { useCallback, useRef, useState } from 'react';
import CourseCard from './CourseCard';
import { Carousel, Embla } from '@mantine/carousel';
import ControlCarousel from '../ui/ControlCarousel';
import CarouselSlide from '../LandingPageComponent/CarouselSlide';
import { getCoursesBySearch } from '../../http/courseHttp';

interface prop {
  heading: string;
  search: string;
  featured: boolean | undefined;
}

const CourseSlider = ({ heading, search, featured }: prop) => {
  const [embla, setEmbla] = useState<Embla | null>(null);

  async function handleCourse() {
    return await getCoursesBySearch({
      search: search,
      filters: {
        featured: featured,
        rating: undefined,
        totalDuration: undefined,
        language: undefined,
        price: undefined,
        level: undefined,
      },
      paginate: {
        limit: '15',
        page: '1',
      },
    });
  }
  return (
    <div className=" mb-20">
      <ControlCarousel heading={heading} embla={embla} />
      <div className=" mt-12">
        <CarouselSlide setEmbla={setEmbla} handleGetCourses={handleCourse} slug={search} />
      </div>
    </div>
  );
};

export default CourseSlider;
