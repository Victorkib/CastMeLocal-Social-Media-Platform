import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
//import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { setAfterRegisteredData } from '../features/emailSent/afterRegisterDataSlice';
import { useAuthContext } from '../context/AuthContext';
import { UserLogin } from '../redux/userSlice';

const useSignup = () => {
  const dispatch = useDispatch();
  const { setAuthUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  //const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const signup = async ({
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    gender,
  }) => {
    const success = handleInputErrors({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      gender,
    });
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch(
        'https://castmelocal.onrender.com/api/socials/auth/register',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            password,
            gender,
          }),
          credentials: 'include',
        }
      );

      const data = await res.json();
      console.log(data);

      if (!res.status === 201) {
        throw new Error(data.message);
      }

      if (res.status === 201) {
        //alert('all is success');
        dispatch(UserLogin(data));
        dispatch(setAfterRegisteredData(data));
        localStorage.setItem('chat-user', JSON.stringify(data));
        setAuthUser(data);
        navigate('/');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;

function handleInputErrors({
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  gender,
}) {
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !confirmPassword ||
    !gender
  ) {
    toast.error('Please fill in all fields');
    return false;
  }

  if (password !== confirmPassword) {
    toast.error('Passwords do not match');
    return false;
  }

  if (password.length < 6) {
    toast.error('Password must be at least 6 characters');
    return false;
  }

  return true;
}
