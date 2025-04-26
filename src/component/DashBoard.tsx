import CourseSlider from './helper/CourseSlider';
import BoardSelection from './LandingPageComponent/BoardSelection';
import DiverseCoursesStn from './LandingPageComponent/DiverseCoursesStn';
import { useAuth } from '../context/AuthContext';
import { Tabs } from '@mantine/core';

import MyLearning from './MyLearning';
import { useNavigate, useSearch } from '@tanstack/react-router';
import CompletedCourse from './CompletedCourse';

export default function DashBoard() {
  // const [activeTab, setActiveTab] = useState<string | null>('home');
  const { user } = useAuth();
  const navigate = useNavigate();

  const { tab } = useSearch({ from: '/' });
  const handleTabChange = (value: string | null) => {
    navigate({ to: '/', search: { tab: value || 'home' } });
  };
  // Retrieve active tab from URL; default to 'home' if not set.

  // Update URL when tab changes.
  //  const handleTabChange = (value: string|null) => {
  //    setSearchParams({ tab: value||'home' });
  //  };
  return (
    <div>
      <h1 className=" text-[42px] font-semibold mt-12 capitalize"> Welcome Back, {user?.name}! </h1>
      <Tabs value={tab || 'home'} onChange={handleTabChange} className="mt-4">
        <Tabs.List>
          {['home', 'my-learning', 'completed'].map((item) => (
            <Tabs.Tab
              key={item}
              value={item}
              className={`md:text-xl text-md capitalize ${tab === item ? 'text-blue-500' : 'text-[#949697] '}`}
            >
              {item}
            </Tabs.Tab>
          ))}
        </Tabs.List>
        <div className=" my-12">
          <Tabs.Panel value="home">
            {/* <RecentViewCourses /> */}
            <CourseSlider heading="Featured Courses" />
            <DiverseCoursesStn />
            <CourseSlider heading="Get Started with these Free Courses" />
            <BoardSelection />
          </Tabs.Panel>
          <Tabs.Panel value="my-learning">
            <MyLearning />
          </Tabs.Panel>
          <Tabs.Panel value="completed">
            <CompletedCourse />
          </Tabs.Panel>
        </div>
      </Tabs>
    </div>
  );
}
