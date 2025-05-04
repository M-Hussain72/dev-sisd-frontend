// hooks/useCartMutations.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import cartHttp from '../http/cartHttp';
import useAuthAxios from './useAuthAxios';
import { CartIn, CartItemIn } from '../interface/cartInterface';

interface MutationContext {
  previousCart?: CartIn;
}

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  const authAxios = useAuthAxios();
  return useMutation<void, Error, CartItemIn, MutationContext>({
    mutationFn: (course) => {
      return cartHttp.addCartItem({ courseId: course.course.id, authAxios });
    },
    onMutate: async (course) => {
      // await queryClient.cancelQueries({ queryKey: ['cart'] });

      const previousCart = queryClient.getQueryData<CartIn>(['cart']);

      queryClient.setQueryData<CartIn>(['cart'], (prev: CartIn | undefined) => {
        const newItem: CartItemIn = course;
        if (!prev) {
          return {
            cart: {
              id: previousCart?.cart.id || '0',
              items: [newItem],
              total: newItem.course.price,
            },
          };
        }
        return {
          ...prev,
          cart: {
            ...prev.cart,
            items: [...prev.cart.items, newItem],
            total: prev.cart.total + newItem.course.price,
          },
        };
      });

      return { previousCart };
    },
    onError: (err, _, context) => {
      console.log('In error for course', err);

      if (context?.previousCart) {
        queryClient.setQueryData<CartIn>(['cart'], context.previousCart);
      }
      // Consider adding error handling here (e.g., toast notification)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};
