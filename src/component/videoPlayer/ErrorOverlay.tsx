export const ErrorOverlay = ({ message }: { message: string }) => (
  <div className=" aspect-video max-h-[580px] w-full bg-black flex items-center justify-center rounded-lg">
    <p className="  text-white md:text-lg text-base text-center px-4">{message}</p>
  </div>
);
