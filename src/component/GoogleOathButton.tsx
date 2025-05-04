import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { Loading } from './ui/Loading';
import { Loader } from '@mantine/core';

const GoogleAuthButton = ({ onSuccess }: { onSuccess: () => void }) => {
  const { googleLogin } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSuccess = async (tokenResponse: any) => {
    try {
      setIsSubmitting(true);
      await googleLogin({ token: tokenResponse.credential });
      setIsSubmitting(false);
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || 'An unexpected error occurred during Google login.');
      setIsSubmitting(false);
    }
  };

  const handleError = () => {
    toast.error('Google Login Failed');
  };
  if (isSubmitting) {
    return <Loader size={'md'} />;
  }

  return <GoogleLogin onSuccess={handleSuccess} onError={handleError} />;
};

export default GoogleAuthButton;
