import CourseCard from './helper/CourseCard';

export default function RecentViewCourses() {
  return (
    <div className="mb-8">
      <h1 className=" sm:text-resHeading  text-2xl font-semibold cursor-default mb-10">Recently Viewed</h1>
      <div className=" grid gap-8 grid-cols-1  min-[848px]:grid-cols-3  min-[1370px]:grid-cols-5  min-[1110px]:grid-cols-4  sm:grid-cols-2  ">
        {/* {[...Array(3)].map((item) => (
          // <CourseCard />
        ))} */}
      </div>
    </div>
  );
}
