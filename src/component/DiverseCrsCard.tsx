import { Card, Text } from '@mantine/core';
type props = {
  title: string;
  noOfCourses: number;
  bgIconColor?: string;
  icon: JSX.Element;
};
export default function DiverseCrsCard({
  title,
  noOfCourses,
  bgIconColor,
  icon,
}: props) {
  return (
    <Card
      padding="lg"
      radius="md"
      shadow="sm"
      className=" max-w-[400px] drop-shadow-sm "
    >
      <div className=" flex max-h-[75px] ">
        <div
          className=" mr-4 h-fit xs:p-4 p-3 rounded"
          style={{ background: bgIconColor }}
        >
          {icon}
        </div>
        <div>
          <h1 className="font-semibold xs:text-2xl text-xl text-[#2B2B2B]">
            {title}
          </h1>
          {noOfCourses > 0 && (
            <p className=" xs:text-lg text-base text-[#949697] ">
              {noOfCourses}+ courses available
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
