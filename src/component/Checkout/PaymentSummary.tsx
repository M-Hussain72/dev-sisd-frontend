import Divider from '../ui/divider';
import Button from '../ui/Button';
import CouponInput from './CouponInput';
import usePayment from '../../hook/usePayment';

export default function PaymentSummary() {
  const { selectOption } = usePayment();

  return (
    <>
      <div className=" lg:static z-10 bottom-0 right-0 left-0 fixed  lg:min-w-[380px] min-w-[300px] bg-[#FAFAFA] lg:rounded-xl lg:shadow-lg lg:p-6 px-4 py-3 shadow-[rgba(43,43,43,0.14)_0px_-4px_14px_0px] ">
        <h1 className=" lg:block hidden text-[34px] text-themeBlack font-semibold capitalize">Summary</h1>
        <div className="flex justify-between lg:mt-4">
          <p className=" xs:text-lg text-base text-themeGray ">Original Price</p>
          <span className="  xs:text-lg text-base text-themeGray ">${'74.99'}</span>
        </div>
        <div className="flex justify-between lg:mt-4 ">
          <p className="  xs:text-lg text-base text-themeGray ">Discount ({'12'}%)</p>
          <span className="  xs:text-lg text-base text-themeGray ">-${'9'}</span>
        </div>
        <CouponInput />
        <div className="my-4">
          <Divider />
        </div>
        <div className=" flex justify-between lg:mb-6 mb-4">
          <h3 className=" xs:text-xl  text-lg text-themeBlack font-semibold ">Total Price</h3>
          <span className=" xs:text-xl text-lg text-themeBlack  font-semibold">${'65.99'}</span>
        </div>
        {selectOption === 'creditCard' ? (
          <Button className="w-full" form="creditPaymentForm">
            Checkout
          </Button>
        ) : (
          <Button className="w-full">Proceed</Button>
        )}
        <p className=" text-themeGray text-[12px]  font-light mt-2">
          By proceeding, you agree to these <span className=" text-themeBlue text-[12px] font-medium">Terms of Service</span>
        </p>
      </div>
      <div className=" h-[210px]"></div>
    </>
  );
}
