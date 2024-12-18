import { useCallback, useRef, useState } from 'react';
import CourseCard from './CourseCard';
import { Carousel, Embla } from '@mantine/carousel';
import ControlCarousel from './ui/ControlCarousel';

interface prop {
  heading: string;
  courses: string;
}

const CourseSlider = ({ heading, courses }: prop) => {
  const [embla, setEmbla] = useState<Embla | null>(null);
  return (
    <div className=" mb-20">
      <ControlCarousel heading={heading} embla={embla} />
      <div className=" mt-12">
        {' '}
        <Carousel
          withControls={false}
          withIndicators={false}
          height="100%"
          slideSize={{
            base: '50%',
            xs: '45%',
            sm: '33%',
            md: '24.8%',
            lg: '20.333333%',
          }}
          slideGap="sm"
          align="start"
          slidesToScroll={'auto'}
          getEmblaApi={setEmbla}
        >
          {[1, 2, 3, 4, 5, 6, 7].map((item) => (
            <Carousel.Slide key={item}>
              <CourseCard />
            </Carousel.Slide>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default CourseSlider;
