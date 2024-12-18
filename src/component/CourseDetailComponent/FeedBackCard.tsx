import { Avatar, Rating, Spoiler } from '@mantine/core';

interface FeedBackType {
  name: string;
  rating: number;
  iat: string;
  message: string;
  image?: string;
}

export default function FeedBackCard({ image, name, rating, iat, message }: FeedBackType) {
  return (
    <div className=" p-4 border-[1px] border-[#EEEEEE] rounded-2xl">
      <div className="flex gap-3">
        <Avatar src={image ? image : null} size={'lg'} color="white" className="bg-[#626465]" alt={name}>
          {name[0]}
          {name.indexOf(' ') !== -1 && name[name.indexOf(' ') + 1]}
        </Avatar>
        <div>
          <h2 className=" text-lg text-themeBlack font-semibold">{name}</h2>
          <div className=" flex gap-2 mt-1">
            <Rating value={rating} size={'sm'} readOnly color="#FFD05A" />
            <span className=" text-themeGray text-sm font-light ">a week ago</span>
          </div>
        </div>
      </div>
      <Spoiler maxHeight={150} hideLabel={'show less'} className=" mt-6" showLabel={'show more'}>
        <p className=" text-themeGray">{message}</p>
      </Spoiler>
    </div>
  );
}
