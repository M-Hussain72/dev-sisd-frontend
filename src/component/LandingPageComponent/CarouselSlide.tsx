import { Carousel, Embla } from '@mantine/carousel';
import CourseCard from '../helper/CourseCard';
import { EmblaCarouselType } from 'embla-carousel-react';
import { useQuery } from '@tanstack/react-query';
import { getCoursesByCategory } from '../../http/courseHttp';
import { Loader } from '@mantine/core';
import { CourseCardIn, getCoursesIn } from '../../interface/courseInterface';
import { useNavigate } from '@tanstack/react-router';
export default function CarouselSlide({
  setEmbla,
  slug,
  handleGetCourses,
}: {
  setEmbla: React.Dispatch<React.SetStateAction<EmblaCarouselType | null>>;
  slug: string;
  handleGetCourses: () => Promise<getCoursesIn>;
}) {
  const navigate = useNavigate();
  const { isLoading, data } = useQuery({
    queryKey: ['carousel/category', slug],
    queryFn: () => handleGetCourses(),
    // getCoursesByCategory({
    //   categorySlug: slug,
    //   filters: {
    //     rating: undefined,
    //     totalDuration: undefined,
    //     language: undefined,
    //     price: undefined,
    //     level: undefined,
    //   },
    // }),
    refetchOnWindowFocus: false,
    retry: 2,
    // Adjust staleTime as needed; here we're caching for 10 minutes.
    staleTime: 1000 * 60 * 10,
  });

  if (isLoading) {
    return (
      <div className=" py-12 w-fit mx-auto">
        <Loader size={'lg'} color="blue" />
      </div>
    );
  }

  return (
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
      {data?.courses && data.courses.length > 0 ? (
        data?.courses.map((item, index) => (
          <Carousel.Slide key={`slide-${item.id}`} className="mb-2">
            <CourseCard isPaid={false} {...item} onClick={() => navigate({ to: `/course/${item.slug}` })} />
          </Carousel.Slide>
        ))
      ) : (
        <div className="w-full text-center mx-2 p-8  bg-white border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500 ">
            No <span className=" capitalize">{data?.category?.categoryName || slug.replaceAll('-', ' ')}</span> courses
            available at the moment!
          </p>
        </div>
      )}
    </Carousel>
  );
}
