import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Logout } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { resetAfterRegisteredData } from '../features/emailSent/afterRegisterDataSlice';
import { apiUrl } from '../utils/api';

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();
  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/socials/auth/logout`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      const data = await res.json();
      if (!data.status === 200) {
        throw new Error(data.error);
      }

      //localStorage.removeItem('chat-user');
      dispatch(resetAfterRegisteredData());
      dispatch(Logout());
      setAuthUser(null);
      navigate('/login');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};
export default useLogout;
