import Button from '../ui/Button';
import bookHoldingWomenPic from '../../assets/bookHoldingWomen.png';

export default function SecondPromotionalBanner() {
  return (
    <div className=" max-w-[1200px] xl:mx-auto  flex min-[845px]:flex-nowrap flex-wrap-reverse  mb-24 gap-10 justify-normal">
      <div className=" relative z-0 mt-4 max-w-[650px] xs:min-w-[450px] w-full ">
        <div className=" z-[-1] absolute -left-[20px] sm:-left-[50px] -top-8 w-[120px] h-[120px]  sm:w-[200px] sm:h-[200px] rounded-full bg-[#FFD05A]"></div>
        <img src={bookHoldingWomenPic} alt="bookHoldingWomen" className=" z-10" />
      </div>
      <div className=" min-[845px]:max-w-[550px] max-w-[600px] ">
        <h1 className=" min-[845px]:mt-16 xs:text-[52px] text-3xl xs:leading-[71px] font-semibold text-[#2B2B2B]">
          Advance towards your professional and personal goals today!
        </h1>
        <p className=" my-4 text-[#949697] font-medium text-lg leading-6">
          Join now and become a part of dynamic learning platform. Embark on a journey of knowledge and growth with us.
        </p>
        <Button>get started</Button>
      </div>
    </div>
  );
}
