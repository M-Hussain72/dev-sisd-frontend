import KeyFeaturedCard from './KeyFeaturedCard';
import { cardArray } from '../utils/Data';

export default function KeyFeaturedSection() {
  return (
    <div className="xs:mx-10 mx-6 xs:my-24 my-12">
      <h1 className=" sm:text-[42px] xs:my-8 mb-6 transition-all duration-500 text-2xl font-semibold">
        What Makes us the Best
      </h1>
      <div className=" grid gap-4  xl:grid-cols-5 lg:grid-cols-4 min-[710px]:grid-cols-3 grid-cols-2 xs:mt-16 mt-0   justify-between">
        {cardArray.map((props) => (
          <KeyFeaturedCard
            title={props.title}
            description={props.description}
            icon={props.icon}
            bgIconColor={props.bgIconColor}
          ></KeyFeaturedCard>
        ))}
      </div>
    </div>
  );
}
