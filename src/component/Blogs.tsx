import tempImg from '../public/robot.png';
export default function Blogs() {
  return (
    <div className=" px-8 mb-20">
      <h1 className=" text-[42px] font-semibold text-themeBlack">Bolgs</h1>
      <p className=" text-lg text-themeGray mt-4 ">
        We’re a leading marketplace platform for learning and teaching online. Explore some of our most popular content and
        learn something new.
      </p>
      <ul className=" mt-6 grid gap-8 grid-cols-1    min-[1250px]:grid-cols-4  min-[950px]:grid-cols-3  sm:grid-cols-2 ">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <div className="flex flex-col  min-h-[380px] max-w-[324px] w-full mx-auto  cursor-pointer">
            <div className=" aspect-video  overflow-hidden rounded-[10px]  ">
              <img
                src={tempImg ? tempImg : tempImg}
                onError={(e) => {
                  // Prevent infinite loop in case default image also fails
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = tempImg;
                }}
                className=" h-full w-full    cursor-pointer"
              />
            </div>
            <h2 className=" flex-1 line-clamp-3 mt-4 text-xl">
              How to Make Your Own Data Science Portfolio - A Hands-On Guide
            </h2>
            <div className=" mt-2 mb-4 flex items-center gap-1 text-themeGray6">
              <img src={tempImg} className=" rounded-full h-[45px] w-[45px] " />
              <h3>Vako Shvili</h3>
              <h1>•</h1>
              <p> Sep 19, 23</p>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}
