// import { Navigate, Link } from 'react-router-dom';
import './ChatApp.css';
import Home from './pages/home/OrigHome';
import Login from './pages/login/OrigLogin';
// import SignUp from './pages/ChatPages/pages/signup/SignUp';
import { Toaster } from 'react-hot-toast';
//import { useAuthContext } from './context/AuthContext';
import { useSelector } from 'react-redux';

function ChatApp() {
  //const { authUser } = useAuthContext();
  const { user } = useSelector((store) => store.user);
  console.log(user);
  return (
    <div className="app-container">
      {user.regUser ? <Home /> : <Login />}

      <Toaster />
    </div>
  );
}

export default ChatApp;
