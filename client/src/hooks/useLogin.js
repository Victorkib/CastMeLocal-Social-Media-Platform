import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { UserLogin } from '../redux/userSlice';
import { setAfterRegisteredData } from '../features/emailSent/afterRegisterDataSlice';
import { apiUrl } from '../utils/api';

const useLogin = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const login = async (email, password) => {
    setError(null); // Reset error state
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/socials/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      const data = await res.json();
      if (!res.ok) {
        // Backend error
        throw new Error(data.error);
      }

      dispatch(UserLogin(data));
      dispatch(setAfterRegisteredData(data));
      localStorage.setItem('chat-user', JSON.stringify(data));
      setAuthUser(data);
      navigate('/');
    } catch (error) {
      // Backend error
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, login };
};

export default useLogin;
