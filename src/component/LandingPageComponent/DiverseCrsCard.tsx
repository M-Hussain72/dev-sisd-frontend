import { Card, Image } from '@mantine/core';
type props = {
  title: string;
  noOfCourses: number;
  bgIconColor?: string;
  icon: string;
};

export default function DiverseCrsCard({ title, noOfCourses, bgIconColor, icon }: props) {
  const bgcolor = ' text-[' + bgIconColor + ']';
  console.log(bgcolor);
  return (
    <Card
      padding="lg"
      radius="md"
      shadow="sm"
      className=" max-w-[400px] drop-shadow-sm hover:drop-shadow-md bg-[#FAFAFA] cursor-pointer "
    >
      <div className=" flex max-h-[75px] items-center ">
        {icon ? (
          <div className=" mr-4 h-fit xs:p-4 p-3 rounded" style={{}}>
            {/* <div className={clsx('p-3 rounded-lg flex-shrink-0')}> */}
            <Image src={icon} alt={`${title} icon`} width={32} height={32} />
            {/* </div> */}
          </div>
        ) : (
          <div className=" mr-4 h-fit xs:p-4 p-3 rounded"></div>
        )}
        <div>
          <h1 className="font-medium xs:text-2xl text-xl capitalize" style={{ color: bgIconColor }}>
            {title}
          </h1>
          <p className=" xs:text-lg text-base text-[#949697] ">
            {noOfCourses}
            {noOfCourses > 0 && <span>+</span>} courses available
          </p>
        </div>
      </div>
    </Card>
  );
}
