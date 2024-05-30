import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { CustomButton, Loading } from '..';
import toast from 'react-hot-toast';
import './verification.css';
import { useSelector } from 'react-redux';
import { apiUrl } from '../../utils/api';

const VerificationPage = () => {
  const afterRegisterData = useSelector(
    (store) => store.afterRegDt.afterRegisterData
  );
  //const location = useLocation();
  const navigate = useNavigate();
  const { setAuthUser } = useAuthContext();
  //const data = afterRegisterData;
  console.log('data recieved from useSignup.js' + afterRegisterData);
  useEffect(() => {
    if (afterRegisterData) {
      localStorage.setItem('chat-user', JSON.stringify(afterRegisterData.user));
      setAuthUser(afterRegisterData.user);
    }
  }, [afterRegisterData, setAuthUser]);

  const handleResendEmail = async () => {
    try {
      const res = await fetch(
        `${apiUrl}/api/socials/auth/resend-verification`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: afterRegisterData.user.email }),
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
      {afterRegisterData ? (
        <>
          <p>{afterRegisterData.VerificationMessage.message}</p>
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
