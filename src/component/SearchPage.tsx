import { useParams } from '@tanstack/react-router';
import Filter from './Filter';
import { Loader } from '@mantine/core';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCoursesBySearch } from '../http/courseHttp.ts';

import NotFound from './helper/NotFound.tsx';
import { filterIn } from '../interface/filterInterface.ts';
import CategoryCoursesSection from './CategoryCoursesSection.tsx';
import { Element } from 'react-scroll';

export default function CoursesPage() {
  const { search } = useParams({ from: '/courses/search/$search/' });
  const [selectedFilters, setSelectedFilters] = useState<filterIn | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['search', search, 1],
    queryFn: async () =>
      await getCoursesBySearch({
        search,
        filters: selectedFilters,
        paginate: {
          limit: '10',
          page: '1',
        },
      }),
    refetchOnWindowFocus: false,
    retry: false,
  });

  if (isLoading) {
    return (
      <div className=" w-fit mx-auto h-dvh mt-24">
        <Loader size={'lg'} className="" />
      </div>
    );
  }
  if (isError || (data && !(data.pagination.totalResults > 0))) {
    return <NotFound search={search} message="Please try refining your search term." />;
  }

  async function handleGetCourses({ page, limit }: { page: number; limit: string }) {
    return await getCoursesBySearch({
      filters: selectedFilters,
      search: search,
      paginate: { page: page.toString(), limit },
    });
  }

  return (
    <Element name="courseSection" className="md:mx-10 px-6 mb-10">
      <div>
        <h1 className=" mt-[20px] mb-[30px] text-[42px] font-semibold text-themeBlack">
          {data?.pagination.totalResults} results for "{search}"
        </h1>
        <div className="flex gap-4">
          <div className=" w-[255px] min-w-[165px] h-fit py-4 rounded-md px-4 shadow-lg min-[1050px]:block hidden">
            <Filter onChange={setSelectedFilters} />
          </div>
          <CategoryCoursesSection
            handleGetCourses={handleGetCourses}
            selectedFilters={selectedFilters}
            initialCourses={data}
            componentKey={search}
          />
        </div>
      </div>
    </Element>
  );
}
