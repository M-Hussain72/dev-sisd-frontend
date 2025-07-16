import { Modal } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useNavigate } from '@tanstack/react-router';
import cartHttp from '../http/cartHttp';
import defaultCourseImg from '../assets/defaultCourseImg.png';
import { useMutation, useQuery } from '@tanstack/react-query';
import useAuthAxios from '../hook/useAuthAxios';
import { useAddToCart } from '../hook/useAddToCart';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

export default function AddToCartBtn({
  title,
  poster,
  author,
  addToCart,
}: {
  title: string;
  poster: string;
  author: string;
  addToCart: () => void;
}) {
  const [opened, { open, close }] = useDisclosure();
  const navigate = useNavigate();
  const { isAuthenticate } = useAuth();
  const isMobile = useMediaQuery('(max-width:640px)');
  // const authAxios =useAuthAxios()
  // const { mutate, isError, data, isSuccess, isPending, error } = useMutation({
  //   mutationFn: cartHttp.addCartItem,
  //   onMutate: async (courseId) => {
  //     await queryClient.cancelQueries('cart');

  //     const previousCart = queryClient.getQueryData('cart');

  //     queryClient.setQueryData('cart', (old) => ({
  //       ...old,
  //       items: [...(old?.items || []), { id: courseId }],
  //     }));

  //     return { previousCart };
  //   },
  //   onError: (err, _, context) => {
  //     if (context?.previousCart) {
  //       queryClient.setQueryData('cart', context.previousCart);
  //     }
  //   },
  //   onSettled: () => {
  //     queryClient.invalidateQueries('cart');
  //   },
  // });

  function handleAddToCart() {
    if (!isAuthenticate) {
      toast.info('Please log in to your account before adding courses to your cart.');
      // Optionally, send them to the login page:
      return;
    }
    addToCart();
    // addToCart(product);
    open();
  }
  return (
    <>
      <Modal
        opened={opened}
        fullScreen={isMobile}
        title={<h1 className=" font-semibold text-lg">Added to cart</h1>}
        onClose={close}
        size={'lg'}
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
          <img
            src={poster ? poster : defaultCourseImg}
            onError={(e) => {
              // Prevent infinite loop in case default image also fails
              e.currentTarget.onerror = null;
              e.currentTarget.src = defaultCourseImg;
            }}
            alt="poster"
            className=" w-[60px] rounded"
          />
          <div className=" max-w-[450px]">
            <h2 className="  text-themeBlack text-lg font-semibold line-clamp-2">{title}</h2>
            <p className=" text-sm">By {author}</p>
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
