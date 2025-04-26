import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { useCountdown } from '../hook/countDown';
import useAuthAxios from '../hook/useAuthAxios';
import authHttp from '../http/authHttp';

export default function VerifiedEmail() {
  const { user } = useAuth();
  const authAxios = useAuthAxios();
  const { start, running, secondsLeft } = useCountdown();
  async function sendVerifyEmail() {
    if (user) {
      try {
        await authHttp.sendVerifyEmail({ email: user.email, authAxios });
        start(60);
        toast.success('Email Verify link sent to your email.');
      } catch (error) {
        //@ts-ignore
        toast.error(err.message || 'Failed to send Verify link.');
      }
    }
  }
  return (
    <>
      {!(!user || user.isEmailVerified) && (
        <div className="bg-yellow-50 text-yellow-800 border border-yellow-300 rounded-xl p-4 mb-6 flex items-center space-x-3">
          {/* Information / warning icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 1010 10A10 10 0 0012 2z"
            />
          </svg>

          <div className="flex-1 text-sm font-medium">
            Your email <span className="font-semibold">{user?.email}</span> is not verified.{' '}
            <button type="button" className="underline hover:text-yellow-600" onClick={sendVerifyEmail} disabled={running}>
              {running ? `Resend in ${secondsLeft}s` : 'send verification email'}
            </button>
            .
          </div>
        </div>
      )}
    </>
  );
}
