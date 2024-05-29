import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; //useSelector
import { UserLogin } from '../redux/userSlice';
import { setAfterRegisteredData } from '../features/emailSent/afterRegisterDataSlice';

const useLogin = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  //const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const login = async (email, password) => {
    const success = handleInputErrors(email, password);
    if (!success) return;
    setLoading(true);
    try {
      const res = await fetch(
        'https://castmelocal.onrender.com/api/socials/auth/login',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
          credentials: 'include',
        }
      );

      const data = await res.json();
      if (!res.status === 200) {
        throw new Error(data.message);
      }
      console.log(data.message);
      console.log(data);
      if (res.status === 200) {
        // alert('all is success in login');
        dispatch(UserLogin(data));
        dispatch(setAfterRegisteredData(data));
        localStorage.setItem('chat-user', JSON.stringify(data));
        setAuthUser(data);
        navigate('/');
      }
    } catch (error) {
      toast.error(error);
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
