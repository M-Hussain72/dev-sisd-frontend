import { Card } from '@mantine/core';

type props = {
  title: string;
  description: string;
  icon: JSX.Element;
  bgIconColor: string;
};

export default function KeyFeaturedCard({
  icon,
  bgIconColor,
  description,
  title,
}: props) {
  return (
    <Card
      padding="lg"
      radius="md"
      className=" max-w-[255px] shadow-lg bg-[#FAFAFA] hover:shadow-xl transition-all duration-500 hover:drop-shadow-md  "
    >
      <div className=" mt-2 max-w-[210px] capitalize cursor-default">
        <div
          className="w-fit p-2 rounded"
          style={{ backgroundColor: bgIconColor }}
        >
          {icon}
        </div>
        <h1 className=" xs:text-xl text-sm font-semibold text-[#2B2B2B] mt-4 mb-3 cursor-default">
          {title}
        </h1>
        <p className="  text-[#949697] xs:text-base text-xs">{description}</p>
      </div>
    </Card>
  );
}
