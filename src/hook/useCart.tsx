// hooks/useCart.ts
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import cartHttp from '../http/cartHttp';
import { useRouteContext } from '@tanstack/react-router';
import { useAuth } from '../context/AuthContext';
import useAuthAxios from './useAuthAxios';

export const useCart = () => {
  // const { authAxios } = useRouteContext({ from: '/' });
  const authAxios = useAuthAxios();
  const { user, isAuthenticate } = useAuth();
  return useQuery({
    queryKey: ['cart'],
    queryFn: () => cartHttp.getCartItem({ authAxios }),
    refetchOnWindowFocus: false, // Disable if not needed
    // refetchOnMount: 'always',
    enabled: isAuthenticate && !!user,
  });
};
