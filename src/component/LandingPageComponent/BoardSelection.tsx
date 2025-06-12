import { Tabs } from '@mantine/core';
import { Embla } from '@mantine/carousel';
import { useEffect, useState } from 'react';

import ControlCarousel from '../ui/ControlCarousel';
import { useQuery } from '@tanstack/react-query';
import categoryHttp from '../../http/categoriesHttp';
import CarouselSlide from './CarouselSlide';
import { getCoursesByCategory } from '../../http/courseHttp';

export default function BoardSelection() {
  const [embla, setEmbla] = useState<Embla | null>(null);

  const { isLoading: categoryLoading, data } = useQuery({
    queryKey: ['categories', 'board'],
    queryFn: categoryHttp.getBoardSelectedCategories,
    // Adjust staleTime as needed; here we're caching for 10 minutes.
    staleTime: Infinity,
  });

  const [activeTab, setActiveTab] = useState<string | null>(data && data?.length > 0 ? data[0].id : 'all');

  useEffect(() => {
    if (data && data.length > 0) {
      // if activeTab is 'all' or not present in the new data, update it
      if (activeTab === 'all' || !data.some((item) => item.id === activeTab)) {
        setActiveTab(data[0].id);
      }
    }
  }, [data, activeTab]);

  const renderCarousel = (tabId: string, slug: string) => {
    return activeTab === tabId ? (
      <CarouselSlide slug={slug} setEmbla={setEmbla} handleGetCourses={() => handleGetCourses(slug)} />
    ) : null;
  };

  async function handleGetCourses(slug: string) {
    console.log('slug', slug);
    return await getCoursesByCategory({
      categorySlug: slug,
      filters: {
        rating: undefined,
        totalDuration: undefined,
        language: undefined,
        price: undefined,
        level: undefined,
        featured: false,
      },
      paginate: {
        limit: '15',
        page: '1',
      },
    });
  }

  return (
    <div className="  my-20">
      <ControlCarousel heading="A Broad Selection of Courses" embla={embla} />
      <Tabs value={activeTab} onChange={setActiveTab} className="sm:mt-10 mt-4">
        <Tabs.List>
          {data &&
            data.map(
              (item) =>
                item.onBoard && (
                  <Tabs.Tab
                    key={item.id}
                    value={item.id}
                    className={`md:text-xl text-md capitalize ${activeTab === item.id ? 'text-blue-500' : 'text-[#949697] '}`}
                  >
                    {item.categoryName}
                  </Tabs.Tab>
                ),
            )}
        </Tabs.List>
        <div className="mt-8">
          {/* <Tabs.Panel value="all">{renderCarousel('all', '')}</Tabs.Panel> */}

          {data &&
            data.map((item, index) => (
              <Tabs.Panel key={item.id} value={item.id}>
                {renderCarousel(item.id, item.categorySlug)}
              </Tabs.Panel>
            ))}
        </div>
      </Tabs>
    </div>
  );
}
