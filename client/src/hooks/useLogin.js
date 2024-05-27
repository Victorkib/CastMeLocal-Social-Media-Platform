import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UserLogin } from '../redux/userSlice';

const useLogin = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const login = async (email, password) => {
    const success = handleInputErrors(email, password);
    if (!success) return;
    setLoading(true);
    try {
      const res = await fetch('/api/socials/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error.message);
      }

      console.log(data);
      if (res.status === 201) {
        dispatch(UserLogin(data));
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

  return { loading, login };
};
export default useLogin;

function handleInputErrors(email, password) {
  if (!email || !password) {
    toast.error('Please fill in all fields');
    return false;
  }

  return true;
}
