import { Card, Rating } from '@mantine/core';
import CourseHorizontalCard from './CourseHorizontalCard';
import Button from './ui/Button';
import CartCard from './CartCard';
import { useCart } from '../context/CartContext';
import { Link } from '@tanstack/react-router';

export default function Cart() {
  const { cartItems } = useCart();
  const subTotal =
    Math.round(cartItems.reduce((a, b) => a + (b.discountPrice > 0 ? b.discountPrice : b.originalPrice), 0) * 100) / 100;

  const Total = Math.round(cartItems.reduce((a, b) => a + b.originalPrice, 0) * 100) / 100;

  return (
    <div className="md:mx-10 mx-4 my-5 mb-20 ">
      <h1 className=" text-resHeading font-bold text-themeBlack sm:block hidden">Shopping Cart</h1>
      {cartItems.length > 0 ? (
        <div className="sm:mt-8 sm:flex sm:flex-row-reverse  justify-between lg:gap-16 gap-6">
          <div className="sm:max-w-[330px] w-full mb-4">
            <Card radius={'md'} className=" sm:shadow-md  sm:p-4 p-0 sm:bg-white bg-transparent">
              <div className=" w-full ">
                <span className=" text-lg font-bold text-themeGray">Total:</span>
                <h1 className=" text-resHeading mt-1 font-bold text-themeBlack">${subTotal}</h1>
                {Total != subTotal && (
                  <>
                    <p className=" text-xl text-themeGray line-through">${Total}</p>
                    <p className=" text-lg text-themeBlack ">70% off</p>
                  </>
                )}
                <div className="mt-4">
                  <button className=" w-full py-3 bg-[#307EE1] hover:bg-[#3c67ca] capitalize  rounded-lg text-white ">
                    CheckOut
                  </button>
                </div>
              </div>
            </Card>
          </div>

          <div className=" flex-1">
            <h2 className=" text-themeBlack font-bold">{cartItems.length} Courses in Cart</h2>
            <div className="border-b-[1px] my-2 w-full border-gray-300"></div>
            <ul className=" space-y-4">
              {cartItems.map((value, index) => (
                <>
                  <li key={value.id}>
                    <CartCard product={value} />
                  </li>
                  {cartItems.length != 1 && cartItems.length != index + 1 && (
                    <div className="border-b-[1px] w-full border-gray-300"></div>
                  )}
                </>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className=" text-center">
          <h2 className=" mt-28 mb-6 text-center font-semibold text-black/50">Your cart is empty.Keep shopping</h2>
          <Link to={'/'}>
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
