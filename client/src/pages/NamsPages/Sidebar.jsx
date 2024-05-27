import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <div className="logo">Logo</div>
      </div>
      <div className="sidebar-menu">
        <div className="menu-item">
          {' '}
          <Link to="/">Home</Link>
        </div>
        <div className="menu-item">
          {' '}
          <Link to="/profile">Profile</Link>
        </div>
        <div className="menu-item">
          {' '}
          <Link to="/map">Map</Link>
        </div>
        <div className="menu-item">
          {' '}
          <Link to="/chat">Chat Room</Link>
        </div>
        <br />
        <hr />
        <div className="menu-item">
          {' '}
          <Link to="/settings">Settings</Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
