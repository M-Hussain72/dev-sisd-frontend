import { Loader, Switch } from '@mantine/core';
import ListViewIcon from '../assets/ListViewIcon.tsx';
import CourseHorizontalCard from './helper/CourseHorizontalCard.tsx';
import GridViewIcon from '../assets/GridViewIcon.tsx';
import { CourseCardIn } from '../interface/courseInterface.ts';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { filterIn } from '../interface/filterInterface.ts';
import { useNavigate, useParams } from '@tanstack/react-router';
import { getCoursesByCategory } from '../http/courseHttp.ts';
import CourseCard from './helper/CourseCard.tsx';

export default function CategoryCoursesSection({
  initialCourses,
  selectedFilters,
  handleGetCourses,
  componentKey,
}: {
  initialCourses: CourseCardIn[] | undefined;
  selectedFilters: filterIn | null;
  handleGetCourses: () => Promise<CourseCardIn[]>;
  componentKey: string;
}) {
  // const { categorySlug } = useParams({ from: '/courses/category/$categorySlug/' });
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ['category/', selectedFilters, componentKey],
    queryFn: () => handleGetCourses(),
    initialData: initialCourses,
    enabled: false,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 600,
  });

  useEffect(() => {
    if (selectedFilters) {
      refetch();
    }
  }, [selectedFilters, refetch]);

  function handelSwitch(e: React.ChangeEvent<HTMLInputElement>) {
    if (window.matchMedia('(min-width: 640px)').matches) setChecked(e.currentTarget.checked);
    else setChecked(true);
  }

  if (isLoading || isFetching || isError) {
    return (
      <div className=" mt-16 w-fit mx-auto h-dvh">
        <Loader size={'xl'} className="" />
      </div>
    );
  }

  return (
    <div className="max-w-[1091px] flex-1">
      <div className="flex justify-between mb-8 text-[24px] w-full font-semibold text-themeBlack">
        <h2>{data?.length} Courses</h2>
        <Switch
          checked={checked}
          onChange={(event) => handelSwitch(event)}
          size="lg"
          color="#EEEEEE"
          radius="md"
          onLabel={<ListViewIcon themeColor="themeGray" />}
          offLabel={<GridViewIcon themeColor="themeGray" />}
          thumbIcon={checked ? <GridViewIcon themeColor="#307EE1" /> : <ListViewIcon themeColor="#307EE1" />}
        />
      </div>

      {data && data?.length > 0 ? (
        <div>
          {checked ? (
            <div className=" grid gap-8 grid-cols-1 min-[600px]:grid-cols-2  xl:grid-cols-4  min-[900px]:grid-cols-3 auto-rows-fr">
              {data?.map((item) => (
                <CourseCard isPaid={false} {...item} onClick={() => navigate({ to: `/course/${item.slug}` })} />
              ))}
            </div>
          ) : (
            <div className="space-y-8 sm:block hidden ">{data?.map((item) => <CourseHorizontalCard {...item} />)}</div>
          )}
        </div>
      ) : (
        <div>
          <div className="max-w-[1091px]  flex items-center justify-center pt-24">
            <p className="text-lg text-gray-600">No courses found. Please adjust your filters or check back later.</p>
          </div>
        </div>
      )}
    </div>
  );
}
