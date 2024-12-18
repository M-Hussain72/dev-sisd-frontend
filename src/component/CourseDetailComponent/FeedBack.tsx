import FeedBackCard from './FeedBackCard';
import reviewMan from '../../public/reviewMen.png';
import { Modal, Rating } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import starIcon from '../assets/starIcon.svg';
import { useState } from 'react';
import DrawerComponent from '../LandingPageComponent/DrawerComponent';
import FeedBackModal from './FeedBackaModal';

export default function FeedBack() {
  const [opened, { close, open }] = useDisclosure(false);

  return (
    <>
      <FeedBackModal opened={opened} close={close} />
      <h1 className="text-resHeading font-semibold ">Feedback</h1>
      <span className=" text-lg text-[#626465] mt-3">
        {'4.0'} course rating <span className="text-3xl">.</span> {'24K'} rating & reviews
      </span>
      <ul className=" mt-12 space-y-6 ">
        {[1, 2, 3, 4].map((review, index) => (
          <FeedBackCard
            key={index}
            name="Daniel Harvey"
            iat=" 6 day ago"
            rating={4}
            message="Buying this course to start my journey in UI/UX was the best decision i made. The lessons were easy to understand and I usually recommend this course to my friends who want to start their UI/UX journey. I am grateful to the instructors of this course!"
            image={reviewMan}
          />
        ))}
      </ul>
      <button onClick={open} className=" text-themeBlue hover:underline font-medium mt-12">
        Show All Reviews
      </button>
    </>
  );
}
