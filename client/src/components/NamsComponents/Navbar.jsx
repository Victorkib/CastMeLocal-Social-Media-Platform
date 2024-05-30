import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header className="Navlinks">
      <h2 className="logo">
        <Link to="/">CastMeLocal</Link>
      </h2>
      <nav className="nav-links">
        {currentPath !== '/' && <Link to="/">Home</Link>}
        {currentPath !== '/chat' && <Link to="/chat">Chat Room</Link>}
        {currentPath !== '/profile' && <Link to="/profile">Profile</Link>}
        {currentPath !== '/map' && <Link to="/map">Map</Link>}
      </nav>
    </header>
  );
};

export default NavBar;
