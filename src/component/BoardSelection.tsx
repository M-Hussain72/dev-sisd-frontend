import { getThemeColor, Tabs } from '@mantine/core';
import { Carousel, Embla } from '@mantine/carousel';
import CourseCard from './CourseCard';
import { useState } from 'react';

export default function BoardSelection() {
  const [embla, setEmbla] = useState<Embla | null>(null);
  const [activeTab, setActiveTab] = useState<string | null>('all');

  const handleNext = () => {
    embla?.canScrollNext();
    embla?.scrollNext(); // Move to the next slide
  };

  const handlePrev = () => {
    embla?.scrollPrev(); // Move to the next slide
  };

  const renderCarousel = (tabId: string, image?: string | null) => {
    return activeTab === tabId ? (
      <Carousel
        withControls={false}
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
        {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
          <Carousel.Slide key={`slide-${index}`}>
            <CourseCard image={image} />
          </Carousel.Slide>
        ))}
      </Carousel>
    ) : null;
  };

  return (
    <div className=" mx-8 my-20">
      <div className=" flex justify-between mb-16">
        <h1 className=" sm:text-[42px] transition-all duration-500 text-2xl font-semibold">
          Featured Courses
        </h1>
        <div className=" flex items-center gap-4">
          <button
            onClick={handlePrev}
            className=" group hover:border-[#307EE1] p-2 h-fit border-[1px] border-[#D1D7DC] rounded-full "
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              className="fill-[#949697] group-hover:fill-[#307EE1] "
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7.39077 0.943401C7.60659 0.727585 7.60659 0.377678 7.39077 0.161862C7.17495 -0.053954 6.82505 -0.0539541 6.60923 0.161862L0.161862 6.60923C-0.053954 6.82505 -0.053954 7.17495 0.161862 7.39077L6.60923 13.8381C6.82505 14.054 7.17495 14.054 7.39077 13.8381C7.60659 13.6223 7.60659 13.2724 7.39077 13.0566L1.8868 7.55263H13.4474C13.7526 7.55263 14 7.30521 14 7C14 6.69479 13.7526 6.44737 13.4474 6.44737H1.8868L7.39077 0.943401Z" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="  group hover:border-[#307EE1] p-2 h-fit border-[1px] border-[#D1D7DC] rounded-full "
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              className="fill-[#949697] group-hover:fill-[#307EE1] "
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6.60923 0.943401C6.39341 0.727585 6.39341 0.377678 6.60923 0.161862C6.82505 -0.053954 7.17495 -0.0539541 7.39077 0.161862L13.8381 6.60923C14.054 6.82505 14.054 7.17495 13.8381 7.39077L7.39077 13.8381C7.17495 14.054 6.82505 14.054 6.60923 13.8381C6.39341 13.6223 6.39341 13.2724 6.60923 13.0566L12.1132 7.55263H0.552632C0.247421 7.55263 0 7.30521 0 7C0 6.69479 0.247421 6.44737 0.552632 6.44737H12.1132L6.60923 0.943401Z" />
            </svg>
          </button>
        </div>
      </div>
      <Tabs
        value={activeTab}
        onChange={setActiveTab}
        // styles={{
        //   tab: {
        //
        //   },
        // }}
      >
        <Tabs.List>
          <Tabs.Tab
            value="all"
            className={`md:text-xl text-md ${activeTab === 'all' ? 'text-blue-500 ' : 'text-[#949697] '}`}
          >
            All Courses
          </Tabs.Tab>
          {['engineering', 'medical', 'drawing', 'management'].map((item) => (
            <Tabs.Tab
              value={item}
              className={`md:text-xl text-md capitalize ${activeTab === item ? 'text-blue-500' : 'text-[#949697] '}`}
            >
              {item}
            </Tabs.Tab>
          ))}
        </Tabs.List>
        <div className="mt-8">
          <Tabs.Panel value="all">{renderCarousel('all')}</Tabs.Panel>

          {[
            { tabName: 'engineering', image: '../public/robot.png' },
            { tabName: 'medical', image: '../public/colorPick.png' },
            { tabName: 'drawing', image: '../public/drawing.png' },
            { tabName: 'management', image: '../public/webImage.png' },
          ].map((item) => (
            <Tabs.Panel value={item.tabName}>
              {renderCarousel(item.tabName, item.image)}
            </Tabs.Panel>
          ))}
        </div>
      </Tabs>
    </div>
  );
}
