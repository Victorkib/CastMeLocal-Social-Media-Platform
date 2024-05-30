import { useNavigate } from 'react-router-dom';
import useLogout from '../../hooks/useLogout';

const UnderDev = () => {
  const { logout } = useLogout();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };
  return (
    <div className="not-found">
      <p>The page you are looking for is under Development.</p>
      <p>From CastMeLocal.</p>
      <div className="not-found-animation">
        <div className="not-found-circle"></div>
        <div className="not-found-circle not-found-circle-secondary"></div>
      </div>
      <a href="/" className="home-link">
        Go Home
      </a>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UnderDev;
