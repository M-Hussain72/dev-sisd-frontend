import tempImg from '../public/robot.png';

export default function BlogDetail() {
  return (
    <>
      <div className="max-w-[900px] mx-auto px-4 mt-10 mb-20">
        <h1 className=" text-2xl font-semibold mt-4">5 ways to become and authentic leader</h1>
        <div className=" mt-4 mb-4 flex items-center gap-1 text-themeGray6">
          <img src={tempImg} className=" rounded-full h-[45px] w-[45px] ml-1 " />
          <h3>Vako Shvili</h3>
          <h1>•</h1>
          <p> Sep 19, 23</p>
        </div>

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

        <div>
          <p className=" mt-8 text-themeGray text-lg">
            Organizations around the world are facing a common problem — a crisis of employee engagement. A recent survey
            from The Conference Board found that 30% of polled workers report that their level of engagement at work — that
            is, the commitment and connection that employees feel to their work — is lower than six months ago. With low
            employee engagement comes decreased productivity and retention.
          </p>
          <h1 className=" text-2xl font-semibold mt-4">Small is the new big in social</h1>
          <p className=" mt-3 text-themeGray text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </>
  );
}
