import DiverseCrsCard from './DiverseCrsCard';
import { Icon } from '../utils/Data';

export default function DiverseCoursesStn() {
  return (
    <div className=" mx-10 my-20 ">
      <h1 className=" min-[650px]:text-[42px] transition-all duration-500 text-2xl font-semibold">
        {' '}
        Choose from Diverse Courses
      </h1>
      <div className=" mt-10  grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        <DiverseCrsCard
          icon={Icon.pen}
          bgIconColor={'#307EE124'}
          title="Design & Development"
          noOfCourses={25}
        />
        <DiverseCrsCard
          icon={Icon.loudSpeaker}
          bgIconColor={'#EC732F1A'}
          title="Digital Marketing"
          noOfCourses={3005}
        />
        <DiverseCrsCard
          icon={Icon.graph}
          bgIconColor={'#9747FF1A'}
          title="Business & Consulting"
          noOfCourses={250}
        />

        <DiverseCrsCard
          icon={Icon.loudSpeaker}
          bgIconColor={'#EC732F1A'}
          title="Digital Marketing"
          noOfCourses={3005}
        />
        <DiverseCrsCard
          icon={Icon.pen}
          bgIconColor={'#307EE124'}
          title="Design & Development"
          noOfCourses={25}
        />
        <DiverseCrsCard
          icon={Icon.graph}
          bgIconColor={'#9747FF1A'}
          title="Business & Consulting"
          noOfCourses={250}
        />
        <DiverseCrsCard
          icon={Icon.pen}
          bgIconColor={'#307EE124'}
          title="Design & Development"
          noOfCourses={25}
        />
        <DiverseCrsCard
          icon={Icon.loudSpeaker}
          bgIconColor={'#EC732F1A'}
          title="Digital Marketing"
          noOfCourses={3005}
        />
        <DiverseCrsCard
          icon={Icon.graph}
          bgIconColor={'#9747FF1A'}
          title="Business & Consulting"
          noOfCourses={250}
        />
      </div>
    </div>
  );
}
