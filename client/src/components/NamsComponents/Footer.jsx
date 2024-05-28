import { useState } from 'react';
import { Link } from 'react-router-dom';
import useLogout from '../../hooks/useLogout';
import { useForm } from 'react-hook-form';

const Footer = () => {
  const {
    handleSubmit,
    //formState: { errors },
  } = useForm();

  //const navigate = useNavigate();

  const { logout } = useLogout(); // Use the logout function and loading state from useLogoutHook

  const onLogout = async () => {
    try {
      await logout(); // Call logout
    } catch (error) {
      console.error('logout error:', error); // Handle errors gracefully (log for debugging)
    }
  };
  // const handleSearch = async (data) => {};

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <footer className="footer bg-bgColor bg-opacity-50 text-ascent-2 px-4 py-8">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <div className="footer-links flex flex-wrap justify-between mt-4 lg:mt-0">
          <ul className="flex flex-wrap justify-between mt-4 lg:mt-0">
            {/* Links based on login state (Optional) */}
            <li>
              <Link to="/" className="menu-link lg:mr-4">
                Home
              </Link>
            </li>
            <li>
              <Link to="/map" className="menu-link lg:mr-4">
                Map
              </Link>
            </li>
            <li>
              <Link to="/chat" className="menu-link lg:mr-4">
                Chat Room
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-row items-center">
          <ul>
            <li className="dropdown">
              <button className="menu-link" onClick={toggleDropdown}>
                Settings.
              </button>
              {isDropdownOpen && (
                <div className="dropdown-content">
                  <button
                    className="menu-link"
                    onClick={handleSubmit(onLogout)}
                  >
                    Logout
                  </button>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
