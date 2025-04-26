import { useNavigate, useParams, useSearch } from '@tanstack/react-router';
import CourseCard from './helper/CourseCard.tsx';
import Filter from './Filter';
import CourseHorizontalCard from './helper/CourseHorizontalCard.tsx';
import { Loader, Switch } from '@mantine/core';
import ListViewIcon from '../assets/ListViewIcon.tsx';
import { useEffect, useState } from 'react';
import GridViewIcon from '../assets/GridViewIcon.tsx';
import { useQuery } from '@tanstack/react-query';
import { getCoursesByCategory, getCoursesBySearch } from '../http/courseHttp.ts';
import Button from './ui/Button.tsx';
import NotFound from './helper/NotFound.tsx';
import { filterIn } from '../interface/filterInterface.ts';
import CategoryCoursesSection from './CategoryCoursesSection.tsx';

export default function CoursesPage() {
  const { search } = useParams({ from: '/courses/search/$search/' });
  const [selectedFilters, setSelectedFilters] = useState<filterIn | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['search', search],
    queryFn: async () => await getCoursesBySearch({ search, filters: selectedFilters }),
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

  console.log(data);
  if (isError || (data && !(data?.length > 0))) {
    return <NotFound search={search} message="Please try refining your search term." />;
  }

  async function handleGetCourses() {
    return await getCoursesBySearch({ filters: selectedFilters, search: search });
  }

  return (
    <div className="mx-10 my-10">
      <div>
        <h1 className=" mt-[50px] mb-[30px] text-[42px] font-semibold text-themeBlack">
          {data?.length} results for "{search}"
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
    </div>
  );
}
