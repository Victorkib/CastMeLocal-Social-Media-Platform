import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faMapMarkerAlt,
  faComments,
  faUser,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className="footer bg-bgColor bg-opacity-50 text-ascent-2 px-4 py-8">
      <ul className="footer-links flex flex-wrap justify-center mt-4 lg:mt-0 border-yellow-500">
        <li>
          <Link to="/" className="menu-link lg:mr-4">
            <FontAwesomeIcon icon={faHome} size="lg" className="footer-icon" />
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
            <FontAwesomeIcon icon={faPlus} size="lg" className="footer-icon" />
          </Link>
        </li>
        <li>
          <Link to="/chat" className="menu-link lg:mr-4">
            <FontAwesomeIcon icon={faUser} size="lg" className="footer-icon" />
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
