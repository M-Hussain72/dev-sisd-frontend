import CourseSlider from './helper/CourseSlider';
import BoardSelection from './LandingPageComponent/BoardSelection';
import DiverseCoursesStn from './LandingPageComponent/DiverseCoursesStn';
import { useAuth } from '../context/AuthContext';
import { Tabs } from '@mantine/core';

import MyLearning from './MyLearning';
import { useNavigate, useSearch } from '@tanstack/react-router';
import CompletedCourse from './CompletedCourse';

export default function DashBoard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { tab } = useSearch({ from: '/' });
  const handleTabChange = (value: string | null) => {
    navigate({ to: '/', search: { tab: value || 'home' } });
  };
  // Retrieve active tab from URL; default to 'home' if not set.

  return (
    <div>
      <h1 className=" text-[42px] font-semibold mt-5 capitalize"> Welcome Back, {user?.name}! </h1>
      <Tabs value={tab || 'home'} onChange={handleTabChange} className="mt-4">
        <Tabs.List>
          {['home', 'my-learning', 'completed'].map((item) => (
            <Tabs.Tab
              key={item}
              value={item}
              className={`md:text-xl text-md capitalize ${(tab || 'home') === item ? 'text-blue-500' : 'text-[#949697] '}`}
            >
              {item}
            </Tabs.Tab>
          ))}
        </Tabs.List>
        <div className=" my-12">
          <Tabs.Panel value="home">
            {(tab || 'home') === 'home' && (
              <>
                {/* <RecentViewCourses /> */}
                <CourseSlider featured search="" heading="Featured Courses" />
                <DiverseCoursesStn />
                <CourseSlider featured={false} search="free" heading="Free Courses" />
                <BoardSelection />
              </>
            )}
          </Tabs.Panel>
          <Tabs.Panel value="my-learning">{tab === 'my-learning' && <MyLearning />}</Tabs.Panel>
          <Tabs.Panel value="completed">{tab === 'completed' && <CompletedCourse />}</Tabs.Panel>
        </div>
      </Tabs>
    </div>
  );
}
