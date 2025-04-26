import { useQueryClient } from '@tanstack/react-query';
import { CategoryIn } from '../interface/courseInterface';

export function useCategories() {
  const queryClient = useQueryClient();
  const categories = queryClient.getQueryData<CategoryIn[] | undefined>(['categories']);

  return categories;
}
