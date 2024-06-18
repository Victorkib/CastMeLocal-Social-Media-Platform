import { Outlet, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import LandingPage from './pages/NamsPages/LandingPage';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';

import OrigHome from './pages/home/OrigHome';
import OrigLogin from './pages/login/OrigLogin';
import OrigSignUp from './pages/signup/OrigSignUp';
import Map from './components/NamsComponents/Map';
import UserSearch from './components/NamsComponents/UserSearch';
//import OrigProfile from './components/NamsComponents/OrigProfile';
import Explore from './components/NamsComponents/Explore';
import NotFound from './pages/NamsPages/NotFound';
import ChatApp from './ChatApp';
//import { useAuthContext } from './context/AuthContext';
import VerificationPage from './components/verification/VerificationPage';
import EmailClickVerification from './components/verification/EmailClickVerification';
import TestChatApp from './components/TestChatApp';
import Deve from './components/underDeve/Deve';

function Layout() {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();

  return user && user.regUser ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

function App() {
  const { user } = useSelector((state) => state.user);
  // const afterRegisterData = useSelector(
  //   (store) => store.afterRegisterData?.afterRegisterData
  // );
  const [verifData, setVerifData] = useState(false);

  // const { authUser } = useAuthContext();
  useEffect(() => {
    setVerifData(!!user);
  }, [user]);

  const { theme } = useSelector((state) => state.theme);

  return (
    <div data-theme={theme} className="w-full min-h-[100vh]">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<TestChatApp />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/landingPage" element={<LandingPage />} />
          <Route path="/map" element={<Map />} />
          <Route
            path="/chat"
            element={
              user && user.regUser ? <ChatApp /> : <Navigate to="/login" />
            }
          />
          <Route path="/userSearch" element={<UserSearch />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/explore" element={<Explore />} />
          <Route
            path="/home"
            element={
              user && user.regUser ? <OrigHome /> : <Navigate to="/login" />
            }
          />

          <Route path="/*" element={<NotFound />} />
        </Route>
        <Route path="/profile" element={<Deve />} />
        <Route path="/createUpload" element={<Deve />} />
        <Route
          path="/verification"
          element={verifData ? <VerificationPage /> : <Register />} //the page the user is sent after registering/Logging In
        />
        <Route //page user is to be sent after clinking the link in Email.
          path={`/api/socials/users/verify/:userId/:token`}
          element={<EmailClickVerification />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/origLogin" element={<OrigLogin />} />
        <Route path="/origSignup" element={<OrigSignUp />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
