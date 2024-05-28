import { Link, useNavigate } from 'react-router-dom';
import useLogout from '../../hooks/useLogout';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faMapMarkerAlt,
  faComments,
  faUser,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const {
    handleSubmit,
    //formState: { errors },
  } = useForm();

  const { logout } = useLogout();

  const onLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('logout error:', error);
    }
  };

  const navigate = useNavigate();

  return (
    <footer className="footer bg-bgColor bg-opacity-50 text-ascent-2 px-4 py-8">
      <div className="container mx-auto flex  lg:flex-row justify-between items-center border-green-700">
        <div className="footer-links flex flex-wrap justify-center mt-4 lg:mt-0 border-yellow-500">
          <ul className="flex flex-wrap justify-center border-orange-950 mt-4 lg:mt-0">
            <li>
              <Link to="/" className="menu-link lg:mr-4">
                <FontAwesomeIcon
                  icon={faHome}
                  size="lg"
                  className="footer-icon"
                />
              </Link>
            </li>
            <li>
              <Link to="/map" className="menu-link lg:mr-4">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  size="lg"
                  className="footer-icon"
                />
              </Link>
            </li>
            <li>
              <Link to="/chat" className="menu-link lg:mr-4">
                <FontAwesomeIcon
                  icon={faComments}
                  size="lg"
                  className="footer-icon"
                />
              </Link>
            </li>
            <li>
              <Link to="/chat" className="menu-link lg:mr-4">
                <FontAwesomeIcon
                  icon={faPlus}
                  size="lg"
                  className="footer-icon"
                />
              </Link>
            </li>
            <li>
              <Link to="/chat" className="menu-link lg:mr-4">
                <FontAwesomeIcon
                  icon={faUser}
                  size="lg"
                  className="footer-icon"
                />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
