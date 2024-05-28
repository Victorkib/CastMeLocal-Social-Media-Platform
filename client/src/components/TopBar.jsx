import { FaCamera } from 'react-icons/fa';
import { IoMdNotificationsOutline } from 'react-icons/io';

const TopBar = () => {
  return (
    <div className="topbar w-full flex items-center justify-between py-3 md:py-6 px-4">
      {/* Camera Icon with Bright Shadow Effect */}
      <button className="neon-button p-2 md:p-3 rounded-full bg-black text-lg md:text-3xl lg:text-4xl">
        <FaCamera className="neon-effect" />
      </button>

      {/* Explore Text */}
      <div className="hidden md:flex items-center justify-center flex-grow md:w-2/5 lg:w-1/2">
        <h1 className="text-ascent-1 text-lg md:text-2xl lg:text-3xl">
          Explore
        </h1>
      </div>

      {/* Notification Icon with Notification Number */}
      <div className="relative text-lg md:text-3xl lg:text-4xl neon-button p-2 md:p-3 rounded-full bg-black">
        <IoMdNotificationsOutline className="neon-effect" />
        <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1 text-xs md:text-sm lg:text-base">
          4
        </span>
      </div>
    </div>
  );
};

export default TopBar;
