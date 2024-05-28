import { Link, useNavigate } from 'react-router-dom';
import useLogout from '../../hooks/useLogout';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faMapMarkerAlt,
  faComments,
  faCog,
} from '@fortawesome/free-solid-svg-icons';

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

  const navigate = useNavigate();
  const handleSettingClick = () => {
    navigate('/chat');
  };

  return (
    <footer className="footer bg-bgColor bg-opacity-50 text-ascent-2 px-4 py-8">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <div className="footer-links flex flex-wrap justify-between mt-4 lg:mt-0">
          <ul className="flex flex-wrap justify-between mt-4 lg:mt-0">
            <li>
              <Link to="/" className="menu-link lg:mr-4">
                <FontAwesomeIcon icon={faHome} size="lg" />
              </Link>
            </li>
            <li>
              <Link to="/map" className="menu-link lg:mr-4">
                <FontAwesomeIcon icon={faMapMarkerAlt} size="lg" />
              </Link>
            </li>
            <li>
              <Link to="/chat" className="menu-link lg:mr-4">
                <FontAwesomeIcon icon={faComments} size="lg" />
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-row items-center">
          <ul>
            <li className="dropdown">
              <button className="menu-link" onClick={handleSettingClick}>
                <FontAwesomeIcon icon={faCog} size="lg" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
