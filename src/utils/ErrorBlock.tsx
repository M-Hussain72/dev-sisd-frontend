type props = {
  title: string;
  message: string;
};

export default function ErrorBlock({ title, message }: props) {
  return (
    <div className=" bg-[#f0d9e5] my-4 p-4 rounded flex gap-8 items-center text-[#890b35] text-left">
      <div>
        <div className=" flex justify-center items-center text-3xl w-[3rem] h-[3rem] text-[#fff] bg-[#890b35] rounded-full">
          !
        </div>
      </div>
      <div className="error-block-text">
        <h2 className=" text-inherit text-xl m-0">{title}</h2>
        <p className="m-0 text-sm">{message}</p>
      </div>
    </div>
  );
}
