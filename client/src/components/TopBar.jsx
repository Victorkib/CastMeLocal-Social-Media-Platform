import { TbSocial } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import TextInput from './TextInput';
import CustomButton from './CustomButton';
import { useForm } from 'react-hook-form';
import { BsMoon, BsSunFill } from 'react-icons/bs';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { SetTheme } from '../redux/theme';
import useLogout from '../hooks/useLogout';
import Loading from './Loading';
//import { Logout } from '../redux/userSlice';

const TopBar = () => {
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const handleTheme = () => {
    const themeValue = theme === 'light' ? 'dark' : 'light';

    dispatch(SetTheme(themeValue));
  };

  const { logout, loading } = useLogout(); // Use the logout function and loading state from useLogoutHook

  const onLogout = async () => {
    try {
      await logout(); // Call logout
    } catch (error) {
      console.error('logout error:', error); // Handle errors gracefully (log for debugging)
    }
  };
  // const handleSearch = async (data) => {};

  return (
    <div className="topbar w-full flex items-center justify-between py-3 md:py-6 px-4 ">
      <Link to="/" className="flex gap-2 items-center">
        <div className="p-1 md:p-2 bg-[#065ad8] rounded text-white">
          <TbSocial />
        </div>
        <span className="text-xl md:text-2xl text-[#065ad8] font-semibold">
          CastMelocal
        </span>
      </Link>

      <form
        className="hidden md:flex items-center justify-center"
        // onSubmit={handleSubmit(handleSearch)}
      >
        <TextInput
          placeholder="Search..."
          styles="w-[18rem] lg:w-[38rem]  rounded-l-full py-3 bg-opacity-80 "
          register={register('search')}
        />
        <CustomButton
          title="Search"
          type="submit"
          containerStyles="bg-[#0444a4] text-white px-6 py-2.5 mt-2 rounded-r-full bg-opacity-80"
        />
      </form>

      {/* ICONS */}
      <div className="flex gap-4 items-center text-ascent-1 text-md md:text-xl">
        <button onClick={() => handleTheme()}>
          {theme ? <BsMoon /> : <BsSunFill />}
        </button>
        <div className="hidden lg:flex">
          <IoMdNotificationsOutline />
        </div>

        <div>
          <CustomButton
            onClick={handleSubmit(onLogout)}
            title="Log Out"
            containerStyles="text-sm text-ascent-1 px-4 md:px-6 py-1 md:py-2 border border-[#666] rounded-full"
          />
          {loading && (
            <>
              <Loading />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
