import { Avatar, Rating, Spoiler } from '@mantine/core';
import moment from 'moment';

interface FeedBackType {
  name: string;
  rating: number;
  iat: Date;
  message: string;
  image?: string | null;
}

export default function FeedBackCard({ image, name, rating, iat, message }: FeedBackType) {
  return (
    <div className=" w-full  p-4 border-[1px] border-[#EEEEEE] shadow rounded-2xl">
      <div className="flex gap-3">
        <Avatar src={image ? image : null} size={'lg'} color="white" className="bg-[#626465]" alt={name}>
          {name[0]}
          {name.indexOf(' ') !== -1 && name[name.indexOf(' ') + 1]}
        </Avatar>
        <div>
          <h2 className=" text-lg text-themeBlack font-semibold">{name}</h2>
          <div className=" flex gap-2 items-center mt-1">
            <Rating value={rating} fractions={2} size={'xs'} readOnly color="#FFD05A" />
            <span className=" mt-1 text-themeGray text-[10px] font-medium ">{moment(iat).fromNow()}</span>
          </div>
        </div>
      </div>
      <Spoiler maxHeight={150} hideLabel={'show less'} className=" mt-6" showLabel={'show more'}>
        <p className=" text-themeGray">{message}</p>
      </Spoiler>
    </div>
  );
}
