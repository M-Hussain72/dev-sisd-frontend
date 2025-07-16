import DiverseCrsCard from './DiverseCrsCard';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import categoriesHttp from '../../http/categoriesHttp';
import { useNavigate } from '@tanstack/react-router';

export default function DiverseCoursesStn() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['diverseCourse'],
    queryFn: categoriesHttp.getDiverseCourseCategory,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
  return (
    <div className=" my-20 min-h-32 ">
      <h1 className=" min-[650px]:text-resHeading transition-all duration-500 text-2xl font-semibold">
        Choose from Diverse Courses
      </h1>
      <ul className=" mt-10  grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {data &&
          data.length > 0 &&
          data.map((item, index) => {
            return (
              <li
                key={index}
                onClick={() => {
                  navigate({ to: `/courses/category/${item.categorySlug}` });
                }}
              >
                <DiverseCrsCard
                  icon={item.icon}
                  bgIconColor={
                    ((index === 0 || index === 4 || index === 6) && '#307EE1') ||
                    ((index === 1 || index === 5 || index === 7) && '#EC732F') ||
                    '#9747FF'
                  }
                  title={item.categoryName}
                  noOfCourses={item.courseCount}
                />
              </li>
            );
          })}
      </ul>
    </div>
  );
}
