import { Modal } from '@mantine/core';
import { useCart } from '../context/CartContext';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useNavigate } from '@tanstack/react-router';

import sampleImage from '../public/python.png';

export default function AddToCartBtn() {
  const { addToCart } = useCart();
  const [opened, { open, close }] = useDisclosure();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:640px)');

  function handleAddToCart() {
    const product = {
      image: '',
      originalPrice: 74.99,
      discountPrice: 0,
      id: 'id' + Math.random(),
      rating: 3.5,
      name: 'Master Digital Product Design: UX Research & UI Design',
    };
    addToCart(product);
    open();
  }
  return (
    <>
      <Modal
        opened={opened}
        fullScreen={isMobile}
        title={<h1 className=" font-semibold text-lg">Added to cart</h1>}
        onClose={close}
        size={'auto'}
        yOffset={'20dvh'}
      >
        <div className="  ">
          <div className=" mx-auto p-5 w-fit rounded-full bg-[#50a18d]">
            <svg width="30" height="28" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 4L4 7L9 1" stroke="#eeeeee" stroke-width="2" />
            </svg>
          </div>
          <p className=" w-fit mx-auto mt-2 font-medium text-sm my-auto text-black">success fully added to your cart</p>
        </div>

        <div className="flex mt-4 gap-2">
          <img src={sampleImage} className=" w-[60px]" />
          <div className=" max-w-[450px]">
            <h2 className="  text-themeBlack font-semibold line-clamp-2">
              {' '}
              {'Master Digital Product Design: UX Research & UI Design '}
            </h2>
            <p>By {'Watson Holmes'}</p>
          </div>
        </div>
        <div className=" w-fit ml-auto mt-4">
          <button
            className=" py-3 px-6 bg-[#307EE1]  font-semibold text-nowrap text-white   hover:bg-[#3c67ca]  rounded-lg"
            onClick={() => navigate({ to: '/cart' })}
          >
            Go to Cart
          </button>
        </div>
      </Modal>
      <button
        onClick={handleAddToCart}
        className=" py-3 px-6 w-full bg-[#307EE1]  text-lg font-semibold text-nowrap text-white   hover:bg-[#3c67ca]  rounded-lg"
      >
        Add to Cart
      </button>
    </>
  );
}
