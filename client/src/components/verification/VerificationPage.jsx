import { useNavigate } from 'react-router-dom';
//import { useAuthContext } from '../../context/AuthContext';
import { CustomButton, Loading } from '..';
import toast from 'react-hot-toast';
import './verification.css';
import { useSelector } from 'react-redux';
import { apiUrl } from '../../utils/api';
import { useEffect } from 'react';

const VerificationPage = () => {
  //const location = useLocation();
  const navigate = useNavigate();
  //const { setAuthUser } = useAuthContext();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {}, [user]);
  const handleResendEmail = async () => {
    try {
      const res = await fetch(
        `${apiUrl}/api/socials/auth/resend-verification`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: user.regUser.email }),
        }
      );
      const responseData = await res.json();
      if (responseData.error) {
        throw new Error(responseData.error);
      }
      toast.success('Verification email resent successfully.');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="verification-container">
      <h1>Verify Your Email</h1>
      {user.success ? (
        <>
          <p>{user.emailMessage.message}</p>
          <CustomButton
            onClick={() => navigate('/')}
            containerStyles="inline-flex justify-center rounded-md bg-blue px-8 py-3 text-sm font-medium text-white outline-none"
            title="Go to Home"
          />
          <CustomButton
            onClick={() => navigate('/register')}
            containerStyles="inline-flex justify-center rounded-md bg-blue px-8 py-3 text-sm font-medium text-white outline-none"
            title="Back to Register"
          />
          <CustomButton
            onClick={handleResendEmail}
            containerStyles="inline-flex justify-center rounded-md bg-blue px-8 py-3 text-sm font-medium text-white outline-none"
            title="Resend Verification Email"
          />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default VerificationPage;
