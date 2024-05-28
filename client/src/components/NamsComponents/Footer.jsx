import { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <footer className="footer bg-bgColor bg-opacity-50 text-ascent-2 px-4 py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-row items-center justify-between">
          {/* Mobile menu button (Optional) */}
          <div className="mobile-btn hidden md:block">
            <ion-icon name="grid"></ion-icon>
          </div>
          <div className="logo">
            <img
              src="https://www.fenews.co.uk/wp-content/uploads/2022/01/social-media-1200x800.jpg"
              alt=""
              className="w-30 h-30 rounded-full object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold ml-2">CastMelocal</h1>
        </div>
        <div className="footer-links flex flex-wrap justify-between mt-4 md:mt-0">
          <ul className="flex flex-wrap justify-between mt-4 md:mt-0">
            {/* Links based on login state (Optional) */}
            <li>
              <Link to="/" className="menu-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/map" className="menu-link">
                Map
              </Link>
            </li>
            <li>
              <Link to="/chat" className="menu-link">
                Chat Room
              </Link>
            </li>
            <li className="dropdown">
              <button className="menu-link" onClick={toggleDropdown}>
                Settings
              </button>
              {isDropdownOpen && (
                <div className="dropdown-content">
                  <button className="menu-link">Logout</button>
                  <button className="menu-link">Something Else</button>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom rounded-full py-4 justify-center text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} TRIPLE 3. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
