import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <header className="Navlinks">
      <h2 className="logo">Logo</h2>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/chat">Chat Room</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/map">Map</Link>
      </nav>
    </header>
  );
};

export default NavBar;

/**
 * 

 */
