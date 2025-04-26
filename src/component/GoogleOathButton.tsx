import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const GoogleAuthButton = ({ onSuccess }: { onSuccess: () => void }) => {
  const { googleLogin } = useAuth();

  const handleSuccess = async (tokenResponse: any) => {
    console.log('Google Login Success:', tokenResponse);
    try {
      await googleLogin({ token: tokenResponse.credential });
      onSuccess();
    } catch (error: any) {
      toast.error(error || 'An unexpected error occurred during Google login.');
    }
  };

  const handleError = () => {
    console.error('Google Login Failed');
  };

  return <GoogleLogin onSuccess={handleSuccess} onError={handleError} />;
};

export default GoogleAuthButton;
