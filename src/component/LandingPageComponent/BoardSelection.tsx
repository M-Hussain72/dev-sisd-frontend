import { Tabs } from '@mantine/core';
import { Carousel, Embla } from '@mantine/carousel';
import CourseCard from '../CourseCard';
import { useState } from 'react';
import robot from '../../public/robot.png';
import colorPick from '../../public/colorPick.png';
import drawing from '../../public/drawing.png';
import wenImage from '../../public/webImage.png';
import ControlCarousel from '../ui/ControlCarousel';

export default function BoardSelection() {
  const [embla, setEmbla] = useState<Embla | null>(null);
  const [activeTab, setActiveTab] = useState<string | null>('drawing');

  const renderCarousel = (tabId: string, image?: string | null) => {
    return activeTab === tabId ? (
      <Carousel
        withControls={false}
        withIndicators={false}
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
    <div className="  my-20">
      <ControlCarousel heading="A Broad Selection of Courses" embla={embla} />
      <Tabs value={activeTab} onChange={setActiveTab} className="sm:mt-10 mt-4">
        <Tabs.List>
          <Tabs.Tab
            value="all"
            className={`md:text-xl text-md ${activeTab === 'all' ? 'text-blue-500 ' : 'text-[#949697] '}`}
          >
            All Courses
          </Tabs.Tab>
          {['engineering', 'medical', 'drawing', 'management'].map((item) => (
            <Tabs.Tab
              key={item}
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
            { tabName: 'engineering', image: robot },
            { tabName: 'medical', image: colorPick },
            { tabName: 'drawing', image: drawing },
            { tabName: 'management', image: wenImage },
          ].map((item, index) => (
            <Tabs.Panel key={index} value={item.tabName}>
              {renderCarousel(item.tabName, item.image)}
            </Tabs.Panel>
          ))}
        </div>
      </Tabs>
    </div>
  );
}
