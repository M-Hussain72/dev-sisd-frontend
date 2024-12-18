import CourseSlider from './CourseSlider';
import BoardSelection from './LandingPageComponent/BoardSelection';
import DiverseCoursesStn from './LandingPageComponent/DiverseCoursesStn';
import { useAuth } from '../context/AuthContext';
import { Tabs } from '@mantine/core';
import { useState } from 'react';
import CourseCard from './CourseCard';
import RecentViewCourses from './RecentViewCourses';

export default function DashBoard() {
  const [activeTab, setActiveTab] = useState<string | null>('home');
  const { user } = useAuth();
  return (
    <div>
      <h1 className=" text-[42px] font-semibold mt-12 capitalize"> Welcome Back, {user?.name}! </h1>
      <Tabs value={activeTab} onChange={setActiveTab} className="mt-4">
        <Tabs.List>
          {['home', 'all courses', 'completed'].map((item) => (
            <Tabs.Tab
              key={item}
              value={item}
              className={`md:text-xl text-md capitalize ${activeTab === item ? 'text-blue-500' : 'text-[#949697] '}`}
            >
              {item}
            </Tabs.Tab>
          ))}
        </Tabs.List>
        <div className=" my-10">
          <Tabs.Panel value="home">
            <RecentViewCourses />
            <CourseSlider heading="Featured Courses" courses="" />
            <DiverseCoursesStn />
            <CourseSlider heading="Get Started with these Free Courses" courses="" />
            <BoardSelection />
          </Tabs.Panel>
          <Tabs.Panel value="all courses">
            <div className="  grid gap-8 grid-cols-1  min-[848px]:grid-cols-3  min-[1370px]:grid-cols-5  min-[1110px]:grid-cols-4  sm:grid-cols-2 ">
              {[...Array(4)].map((item) => (
                <CourseCard />
              ))}
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="completed">
            <div className=" grid gap-8 grid-cols-1  min-[848px]:grid-cols-3  min-[1370px]:grid-cols-5  min-[1110px]:grid-cols-4  sm:grid-cols-2 ">
              {[...Array(2)].map((item) => (
                <CourseCard />
              ))}
            </div>
          </Tabs.Panel>
        </div>
      </Tabs>
    </div>
  );
}
