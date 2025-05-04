// hooks/useCartMutations.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import cartHttp from '../http/cartHttp';
import useAuthAxios from './useAuthAxios';
import { CartIn, CartItemIn } from '../interface/cartInterface';

interface MutationContext {
  previousCart?: CartIn;
}

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  const authAxios = useAuthAxios();

  return useMutation<void, Error, string, MutationContext>({
    // Accepts the courseId to remove
    mutationFn: (courseId: string) => {
      return cartHttp.removeCartItem({ courseId, authAxios });
    },
    onMutate: async (courseId: string) => {
      // Optionally cancel outgoing queries if necessary
      await queryClient.cancelQueries({ queryKey: ['cart'] });
      const previousCart = queryClient.getQueryData<CartIn>(['cart']);

      queryClient.setQueryData<CartIn>(['cart'], (prev) => {
        if (!prev) {
          return {
            cart: { id: 'a1', items: [], total: 0 },
          };
        }
        const removedItem = prev.cart.items.find((item) => item.course.id === courseId);

        // Get the price of the removed course; if not found, default to 0
        const removedPrice = removedItem ? removedItem.course.price : 0;
        // Filter out the item whose course id matches the provided courseId
        return {
          cart: {
            ...prev.cart,
            items: prev.cart.items.filter((item) => item.course.id !== courseId),
            total: prev.cart.total - removedPrice,
          },
        };
      });

      return { previousCart };
    },
    onError: (err, courseId, context) => {
      console.log('Error during removal', err);
      if (context?.previousCart) {
        queryClient.setQueryData<CartIn>(['cart'], context.previousCart);
      }
      // Optional: add additional error handling (e.g., toast notification)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};
