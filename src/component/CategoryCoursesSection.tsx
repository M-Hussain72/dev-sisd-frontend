import { Loader, Pagination, Switch } from '@mantine/core';
import ListViewIcon from '../assets/ListViewIcon.tsx';
import CourseHorizontalCard from './helper/CourseHorizontalCard.tsx';
import GridViewIcon from '../assets/GridViewIcon.tsx';
import { CourseCardIn, getCoursesIn } from '../interface/courseInterface.ts';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { filterIn } from '../interface/filterInterface.ts';
import { useNavigate, useParams } from '@tanstack/react-router';
import { Link as ScrollLink, Element, scroller } from 'react-scroll';
import CourseCard from './helper/CourseCard.tsx';

export default function CategoryCoursesSection({
  initialCourses,
  selectedFilters,
  handleGetCourses,
  componentKey,
}: {
  initialCourses: getCoursesIn | undefined;
  selectedFilters: filterIn | null;
  handleGetCourses: ({ page, limit }: { page: number; limit: string }) => Promise<getCoursesIn>;
  componentKey: string;
}) {
  // const { categorySlug } = useParams({ from: '/courses/category/$categorySlug/' });
  const [checked, setChecked] = useState(false);
  const [activePage, setPage] = useState(1);

  const navigate = useNavigate();
  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ['category/', selectedFilters, componentKey, activePage],
    queryFn: () => handleGetCourses({ page: activePage, limit: '10' }),
    initialData: initialCourses,
    enabled: false,
    refetchOnWindowFocus: false,
    retry: false,
    // staleTime: 600,
  });

  useEffect(() => {
    if (selectedFilters || activePage) {
      refetch();
    }
    // window.scrollTo({
    //   top: 50,
    //   left: 0,
    // });
  }, [selectedFilters, refetch, activePage]);

  function handelSwitch(e: React.ChangeEvent<HTMLInputElement>) {
    setChecked(e.currentTarget.checked);
  }

  // if (isLoading || isFetching) {
  //   return (
  //     <div className=" mt-16 w-fit mx-auto h-dvh">
  //       <Loader size={'xl'} className="" />
  //     </div>
  //   );
  // }

  return (
    <div className="max-w-[1091px] flex-1">
      <div className="flex justify-between mb-8 text-[24px] w-full font-semibold text-themeBlack">
        <h2>{data?.pagination?.totalResults} Courses</h2>
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

      {isLoading ||
        (isFetching && (
          <div className=" mt-16 w-fit mx-auto h-dvh">
            <Loader size={'xl'} className="" />
          </div>
        ))}

      {data && data.courses?.length > 0 ? (
        <div>
          {checked ? (
            <div className=" grid gap-8 grid-cols-1 min-[600px]:grid-cols-2  xl:grid-cols-4  min-[900px]:grid-cols-3 auto-rows-fr">
              {data?.courses?.map((item) => (
                <CourseCard isPaid={false} {...item} onClick={() => navigate({ to: `/course/${item.slug}` })} />
              ))}
            </div>
          ) : (
            <div className="space-y-8  ">{data.courses?.map((item) => <CourseHorizontalCard {...item} />)}</div>
          )}
          <div className=" mx-auto w-fit mt-16 ">
            {' '}
            <ScrollLink to="courseSection" smooth={true} duration={0}>
              <Pagination total={data.pagination.totalPages} value={activePage} onChange={setPage} mt="sm" />
            </ScrollLink>
          </div>
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
