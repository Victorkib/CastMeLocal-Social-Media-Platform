import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAfterRegisteredData } from '../features/emailSent/afterRegisterDataSlice';
import { useAuthContext } from '../context/AuthContext';
import { UserLogin } from '../redux/userSlice';
import { apiUrl } from '../utils/api';

const useSignup = () => {
  const dispatch = useDispatch();
  const { setAuthUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signup = async ({
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    gender,
  }) => {
    const inputErrors = handleInputErrors({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      gender,
    });
    if (inputErrors.length > 0) {
      return { success: false, errors: inputErrors };
    }

    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/socials/auth/register`, {
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
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }

      dispatch(UserLogin(data));
      dispatch(setAfterRegisteredData(data));
      localStorage.setItem('chat-user', JSON.stringify(data));
      setAuthUser(data);
      navigate('/verification');
      return { success: true };
    } catch (error) {
      toast.error(error.message);
      return { success: false, backendError: error.message };
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

function handleInputErrors({
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  gender,
}) {
  const errors = [];

  if (!firstName) {
    errors.push('First Name is required');
  }
  if (!lastName) {
    errors.push('Last Name is required');
  }
  if (!email) {
    errors.push('Email Address is required');
  }
  if (!password) {
    errors.push('Password is required');
  }
  if (!confirmPassword) {
    errors.push('Confirm Password is required');
  }
  if (!gender) {
    errors.push('Gender is required');
  }
  if (password !== confirmPassword) {
    errors.push('Passwords do not match');
  }
  if (password.length < 6) {
    errors.push('Password must be at least 6 characters');
  }

  return errors;
}

export default useSignup;
