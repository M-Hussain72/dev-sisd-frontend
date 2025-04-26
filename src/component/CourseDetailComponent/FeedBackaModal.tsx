import FeedBackCard from './FeedBackCard';
import reviewMan from '../../public/reviewMen.png';
import { Modal, Rating } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import { useState } from 'react';
import DrawerComponent from '../LandingPageComponent/DrawerComponent';
import RatingFilter from './RatingFilter';
import Button from '../ui/Button';

export default function FeedBackModal({ opened, close }: { opened: boolean; close: () => void }) {
  const [selectedRating, setSelectedRating] = useState(0);
  const isMobile = useMediaQuery('(max-width:640px)');

  const ModalTitle = (
    <div className=" flex gap-2 items-center">
      {isMobile && (
        <DrawerComponent>
          <div className="min-w-[165px]">
            <RatingFilter selectedRating={selectedRating} setSelectedRating={setSelectedRating} isMobile={isMobile} />
          </div>
        </DrawerComponent>
      )}
      <h1 className=" text-resHeading font-semibold text-themeBlack">FeedBack</h1>
    </div>
  );
  return (
    <Modal opened={opened} onClose={close} fullScreen={isMobile} size={'auto'} title={ModalTitle}>
      <div className=" max-w-[950px] mx-5">
        <div className=" flex gap-4 mt-4">
          {!isMobile && (
            <div className="min-w-[180px]">
              <RatingFilter selectedRating={selectedRating} setSelectedRating={setSelectedRating} />
            </div>
          )}
          <div>
            <ul className="  space-y-6 mb-6">
              {[...Array(8)].map((review, index) => (
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
            <Button>Read More Reviews</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
