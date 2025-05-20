import { Card, Rating } from '@mantine/core';
import CourseHorizontalCard from './helper/CourseHorizontalCard';
import Button from './ui/Button';
import CartCard from './helper/CartCard';

import { Link, useNavigate } from '@tanstack/react-router';
import Divider from './ui/divider';
import { useCart } from '../hook/useCart';

export default function Cart() {
  // const { cartItems } = useCart();
  const { data } = useCart();
  const navigate = useNavigate();

  return (
    <div className="md:mx-10 min-h-dvh mx-4 my-5 mb-20 ">
      <h1 className=" text-resHeading font-bold text-themeBlack md:block hidden">Shopping Cart</h1>
      {data && data?.cart?.items.length > 0 ? (
        <div className="md:mt-8 md:flex md:flex-row-reverse  justify-between lg:gap-16 gap-6">
          <div className="md:max-w-[330px] w-full mb-4">
            <Card radius={'md'} className=" md:shadow-md  md:p-4 p-0 md:bg-white bg-transparent">
              <div className=" w-full ">
                <span className=" text-lg font-bold text-themeGray">Total:</span>
                <h1 className=" text-resHeading mt-1 font-bold text-themeBlack">&#8360; {data.cart.total}</h1>

                {/* for discount */}
                {/* {Total != subTotal && (
                  <>
                    <p className=" text-xl text-themeGray line-through">&#8360; {Total}</p>
                    <p className=" text-lg text-themeBlack ">70% off</p>
                  </>
                )} */}
                <div className="mt-4">
                  <button
                    onClick={() => navigate({ to: '/payment/checkout' })}
                    className=" w-full py-3 bg-[#307EE1] hover:bg-[#3c67ca] capitalize  rounded-lg text-white "
                  >
                    CheckOut
                  </button>
                </div>
              </div>
            </Card>
          </div>

          <div className=" flex-1 md:mt-0 mt-6">
            <h2 className=" text-themeBlack font-bold">{data.cart.items.length} Courses in Cart</h2>
            <div className="border-b-[1px] my-2 w-full border-gray-300"></div>
            <ul className=" space-y-4">
              {data.cart.items.map((value, index) => (
                <>
                  <li key={value.course.id}>
                    <CartCard product={value} type="cart" />
                  </li>
                  {data.cart.items.length != 1 && data.cart.items.length != index + 1 && <Divider />}
                </>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className=" text-center">
          <h2 className=" mt-28 mb-6 text-center font-semibold text-black/50">Your cart is empty.Keep shopping</h2>
          <Button onClick={() => navigate({ to: '/' })}>Continue Shopping</Button>
        </div>
      )}
    </div>
  );
}
