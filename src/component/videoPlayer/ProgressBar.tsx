export const ProgressBar = ({
  buffered,
  currentTime,
  duration,
}: {
  buffered: number;
  currentTime: number;
  duration: number;
}) => {
  return (
    <div className="relative h-1 bg-white/30 hover:h-1.5 transition-all rounded-full overflow-visible">
      <div className="absolute h-full bg-white/50 rounded-full transition-all" style={{ width: `${buffered}%` }} />
      <div
        className="absolute h-full bg-themeBlue rounded-full transition-all flex items-center justify-end"
        style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
      >
        <div className="w-3 h-3 bg-themeBlue rounded-full scale-0 group-hover:scale-100 transition-transform shadow-lg -mr-1.5" />
      </div>
    </div>
  );
};
