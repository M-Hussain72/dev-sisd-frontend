export const ErrorOverlay = ({ message }: { message: string }) => (
  <div className="relative aspect-video max-h-[580px] w-full bg-black flex items-center justify-center rounded-lg">
    <p className="text-white text-lg text-center px-4">{message}</p>
  </div>
);
