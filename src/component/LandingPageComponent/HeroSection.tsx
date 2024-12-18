import Button from '../ui/Button';
import asianWomen from '../../assets/asianWomen1.png';
import arabWomen from '../../assets/arabWomen.png';
import blueMen from '../../assets/blueMen.png';
import crispHairMen from '../../assets/crisphairMen.png';

const HeroSection = () => {
  return (
    <div className=" min-[845px]:flex  gap-8 xs:mt-20 my-10 xs:mx-8   justify-between">
      <div className=" md:w-[546px] w-full xs:mt-16 mt-6 ">
        <h1 className=" relative    xs:text-[52px] text-3xl xs:leading-[71px] font-semibold text-[#2B2B2B] ">
          <div className=" -z-10 absolute xs:-left-3 xs:top-1 -left-1 top-[2px] w-[15px] h-[15px] xs:w-[30px] xs:h-[30px] rounded-full bg-[#FEA9CA]"></div>
          Providing the Best Learning Experience, Let's{' '}
          <span className="relative text-nowrap ">
            Start Today!
            <svg
              className=" -z-10 absolute xs:-bottom-2 -bottom-1 xs:right-4 right-2 xs:w-[278px] xs:h-[20px] w-[160px] "
              viewBox="0 0 278 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M262.852 0.00212719C262.852 0.00212719 262.853 0.00212812 262.848 1.98401L262.852 0.00212719C264.525 0.00378541 265.881 0.893356 265.878 1.98904C265.876 3.08472 264.517 3.9716 262.843 3.96994L262.848 1.98603C262.843 3.96994 262.843 3.96994 262.843 3.96994L261.971 3.96927C261.397 3.9689 260.549 3.96845 259.452 3.96816C257.258 3.96756 254.069 3.96755 250.088 3.9699C242.126 3.97461 230.998 3.98878 218.333 4.02662C193 4.10231 161.54 4.2727 136.987 4.65113C112.046 5.03553 80.1135 5.85216 54.4037 6.57317C41.5515 6.93359 30.2594 7.26998 22.1804 7.51625C18.141 7.63939 14.905 7.73999 12.6791 7.8098C11.5661 7.84471 10.7057 7.87192 10.1236 7.8904L9.23925 7.91858C9.23925 7.91858 9.23841 7.9186 9.09004 5.93707C8.94167 3.95554 8.94261 3.95551 8.94261 3.95551L9.83013 3.92723C10.4133 3.90872 11.2749 3.88148 12.3891 3.84653C14.6174 3.77664 17.8562 3.67595 21.8986 3.55273C29.9832 3.30628 41.2831 2.96967 54.1443 2.60898C79.8614 1.88777 111.842 1.06975 136.844 0.684409C161.458 0.305047 192.965 0.13456 218.306 0.0588403C230.979 0.0209725 242.115 0.00679417 250.083 0.00208273C254.066 -0.000273172 257.259 -0.000262056 259.455 0.000337827C260.553 0.000637946 261.402 0.00108517 261.977 0.00145766L262.852 0.00212719ZM6.06343 6.03421C5.98149 4.93984 7.27106 4.00916 8.94261 3.95551L9.09004 5.93707L9.23925 7.91858C7.5677 7.97222 6.14538 7.12858 6.06343 6.03421ZM275.006 12.5607C275.006 12.5607 275.007 12.5607 274.97 14.5445C274.933 16.5282 274.932 16.5282 274.932 16.5282L273.999 16.521C273.384 16.5163 272.476 16.5096 271.302 16.5012C268.953 16.4844 265.538 16.4612 261.276 16.4354C252.751 16.3838 240.836 16.3219 227.277 16.2806C200.151 16.1981 166.469 16.1982 140.181 16.528C113.436 16.8636 79.1928 17.7306 51.6202 18.5144C37.8373 18.9062 25.7275 19.2769 17.0636 19.5498C12.7318 19.6862 9.26155 19.7981 6.87457 19.8759C5.68109 19.9148 4.75843 19.9452 4.13431 19.9659L3.18612 19.9974C3.18612 19.9974 3.18523 19.9974 3.03031 18.0161C2.87538 16.0348 2.8764 16.0347 2.8764 16.0347L3.82851 16.0031C4.45404 15.9824 5.37817 15.952 6.5732 15.913C8.96323 15.8351 12.4369 15.7231 16.7725 15.5865C25.4435 15.3135 37.5629 14.9424 51.3573 14.5503C78.9391 13.7663 113.243 12.8975 140.065 12.561C166.429 12.2302 200.17 12.2303 227.305 12.3129C240.876 12.3542 252.8 12.4161 261.332 12.4678C265.598 12.4936 269.016 12.5168 271.368 12.5336C272.544 12.542 273.453 12.5488 274.069 12.5534L275.006 12.5607ZM3.03031 18.0161L2.8764 16.0347C1.20503 16.0907 -0.0815297 17.0233 0.00403197 18.1175C0.0895939 19.2118 1.51476 20.0534 3.18612 19.9974L3.03031 18.0161ZM278 14.5688C277.979 15.6644 276.605 16.5417 274.932 16.5282L274.97 14.5445L275.006 12.5607C276.679 12.5742 278.02 13.4732 278 14.5688Z"
                fill="#307EE1"
              />
            </svg>
          </span>
        </h1>
        <p className=" xs:mt-8 mt-4 xs:text-lg text-sm text-[#949697] font-normal">
          Let’s take on online course to improve your skills in a different and set your own study time according to your
          learning speed with the best teaching instructors in the world!
        </p>
        <div className=" mt-6">
          <Button>get started</Button>
        </div>
      </div>
      <div className=" relative z-0 w-fit h-fit ">
        <div className="   absolute -right-[20px] sm:-right-[50px] -top-5 w-[120px] h-[120px]  sm:w-[200px] sm:h-[200px] rounded-full bg-[#FFD05A]"></div>
        <div className="  absolute right-[55%] -top-5  w-[20px] h-[20px] rounded-full bg-[#FFD05A]"></div>
        <div className=" -z-10 absolute bottom-[55%] w-[20px] h-[20px] rounded-full bg-[#FEA9CA]"></div>
        <div className=" -z-10 absolute bottom-0 right-0 w-[20px] h-[20px] rounded-full bg-[#FEA9CA]"></div>
        <div className=" -z-10 sm:block absolute hidden  bottom-2 -left-12 w-[45px] h-[45px] rounded-full bg-[#61B5D1]"></div>

        <div className=" max-w-[556px] min-[845px]:max-w-[256px] lg:max-w-[556px]   w-full   mt-8 gap-4 grid grid-cols-2 min-[845px]:grid-rows-2 min-[845px]:grid-cols-none lg:grid-cols-2 ">
          <img src={asianWomen} className=" lg:block min-[845px]:hidden block" />
          <img src={blueMen} className="z-10" />
          <img src={arabWomen} className=" lg:block min-[845px]:hidden block" />
          <img src={crispHairMen} />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
