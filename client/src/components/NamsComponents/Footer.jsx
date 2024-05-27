// import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import 'font-awesome/css/font-awesome.min.css';

const Footer = () => {
  return (
    <footer className="footer bg-bgColor bg-opacity-50 text-ascent-2 px-4 py-8 ">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex  flex-col items-center justify-between ">
          {/* Mobile menu button (Optional) */}
          <div className="mobile-btn hidden md:block">
            <ion-icon name="grid"></ion-icon>
          </div>
          <div className="logo">
            <img
              src="https://www.fenews.co.uk/wp-content/uploads/2022/01/social-media-1200x800.jpg"
              alt=""
              className="w-20 h-20 rounded-lg object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold ml-2">CastMelocal</h1>
        </div>
        <div className="footer-links flex flex-wrap justify-between mt-4 md:mt-0">
          <ul className="flex flex-wrap justify-between mt-4 md:mt-0">
            {/* Links based on login state (Optional) */}
            <>
              <li>
                <Link
                  to="/"
                  className=" border-2 border-rose-400 mx-2 text-base hover:text-orange-500 text-ascent-2 text-center w-full px-4 py-2 rounded-lg hover:bg-primary-dark font-bold hover:text-[#d6581dfd]"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/map"
                  className=" border-2 border-rose-400 mx-2 text-base hover:text-orange-500 text-ascent-2 text-center w-full px-4 py-2 rounded-lg hover:bg-primary-dark font-bold hover:text-[#d6581dfd]"
                >
                  Map
                </Link>
              </li>
              <li>
                <Link
                  to="/chat"
                  className=" border-2 border-rose-400 mx-2 text-base hover:text-orange-500 text-ascent-2 text-center w-full px-4 py-2 rounded-lg hover:bg-primary-dark font-bold hover:text-[#d6581dfd]"
                >
                  Chat Room
                </Link>
              </li>
              <li>
                <Link
                  to="/about-us"
                  className=" border-2 border-rose-400 mx-2 text-base hover:text-orange-500 text-ascent-2 text-center w-full px-4 py-2 rounded-lg hover:bg-primary-dark font-bold hover:text-[#d6581dfd]"
                >
                  About-us
                </Link>
              </li>
            </>
          </ul>
        </div>
        <div className="footer-social flex justify-between mt-4 md:mt-0">
          <ul className="flex flex-wrap justify-between px-4 md:mt-0 ">
            <li>
              <Link
                to="https://www.facebook.com/home.php"
                target="_blank"
                className="px-4 py-2 m-3 hover:text-[#d6581dfd]"
              >
                <FaFacebook className="text-xl hover:text-orange-500" />
              </Link>
            </li>
            <li>
              <Link
                to="https://twitter.com/"
                target="_blank"
                className="px-4 py-2 m-3 hover:text-[#9cdf5d]"
              >
                <FaTwitter className="text-xl hover:text-orange-500" />
              </Link>
            </li>
            <li>
              <Link
                to="https://www.instagram.com/"
                target="_blank"
                className="px-4 py-2 m-3 hover:text-[#9cdf5d]"
              >
                <FaInstagram className="text-xl hover:text-orange-500" />
              </Link>
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
