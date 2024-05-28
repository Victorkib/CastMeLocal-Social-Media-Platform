import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  CustomButton,
  EditProfile,
  FriendsCard,
  Loading,
  PostCard,
  ProfileCard,
  TextInput,
  TopBar,
} from '../components';
import { suggest, requests, posts } from '../assets/data';
import { Link } from 'react-router-dom';
import { NoProfile } from '../assets';
import { BsFiletypeGif, BsPersonFillAdd } from 'react-icons/bs';
import { BiImages, BiSolidVideo } from 'react-icons/bi';
import { useForm } from 'react-hook-form';
import Footer from '../components/NamsComponents/Footer';

const Home = () => {
  const { user, edit } = useSelector((state) => state.user);
  const [friendRequest] = useState(requests);
  const [suggestedFriends] = useState(suggest);
  const [errMsg] = useState('');
  const [setFile] = useState(null);
  const [posting] = useState(false);
  const [loading] = useState(false);

  const {
    register,
    // handleSubmit,
  } = useForm();

  // const handlePostSubmit = async (data) => {};

  return (
    <div className="app-container relative h-screen">
      <div className="content-container w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor h-full overflow-y-auto">
        <TopBar />

        <div className="w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full">
          {/* LEFT */}
          <div className="hidden w-1/3 lg:w-1/4 h-dvh md:flex flex-col gap-6 overflow-y-auto">
            <div className="w-full bg-primary flex flex-col items-center shadow-sm rounded-xl px-6 py-4">
              <Link
                to="/"
                className="text-ascent-2 text-center w-full px-4 py-2 rounded-lg hover:bg-primary-dark font-bold hover:text-[#d6581dfd] border border-[#c7b0b045] m-1"
              >
                Home
              </Link>
              <Link
                to="/map"
                className="text-ascent-2 text-center w-full px-4 py-2 rounded-lg hover:bg-primary-dark hover:text-[#d6581dfd] border border-[#c7b0b045] m-1"
              >
                Map
              </Link>
              <Link
                to="/profile"
                className="text-ascent-2 text-center w-full px-4 py-2 rounded-lg hover:bg-primary-dark hover:text-[#d6581dfd] border border-[#c7b0b045] m-1"
              >
                Profile
              </Link>

              <Link
                to="/chat"
                className="text-ascent-2 text-center w-full px-4 py-2 rounded-lg hover:bg-primary-dark hover:text-[#d6581dfd] border border-[#c7b0b045] m-1"
              >
                Chat Room
              </Link>
            </div>

            <ProfileCard user={user} />
            <FriendsCard friends={user?.friends} />
          </div>

          {/* CENTER */}
          <div className="flex-1 h-dvh px-4 flex flex-col gap-6 overflow-y-auto rounded-lg">
            {loading ? (
              <Loading />
            ) : posts?.length > 0 ? (
              posts?.map((post) => (
                <PostCard
                  key={post?._id}
                  post={post}
                  user={user}
                  deletePost={() => {}}
                  likePost={() => {}}
                />
              ))
            ) : (
              <div className="flex w-full h-full items-center justify-center">
                <p className="text-lg text-ascent-2">No Post Available</p>
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className="hidden w-1/4 h-max lg:flex flex-col gap-8 overflow-y-auto">
            {/* FRIEND REQUEST */}
            <div className="w-full bg-primary shadow-sm rounded-lg px-6 py-5">
              <div className="flex items-center justify-between text-xl text-ascent-1 pb-2 border-b border-[#66666645]">
                <span> Friend Request</span>
                <span>{friendRequest?.length}</span>
              </div>

              <div className="w-full flex flex-col gap-4 pt-4">
                {friendRequest?.map(({ _id, requestFrom: from }) => (
                  <div key={_id} className="flex items-center justify-between">
                    <Link
                      to={'/profile/' + from._id}
                      className="w-full flex gap-4 items-center cursor-pointer"
                    >
                      <img
                        src={from?.profileUrl ?? NoProfile}
                        alt={from?.firstName}
                        className="w-10 h-10 object-cover rounded-full"
                      />
                      <div className="flex-1">
                        <p className="text-base font-medium text-ascent-1">
                          {from?.firstName} {from?.lastName}
                        </p>
                        <span className="text-sm text-ascent-2">
                          {from?.profession ?? 'No Profession'}
                        </span>
                      </div>
                    </Link>

                    <div className="flex gap-1">
                      <CustomButton
                        title="Accept"
                        containerStyles="bg-[#0444a4] text-xs text-white px-1.5 py-1 rounded-full"
                      />
                      <CustomButton
                        title="Deny"
                        containerStyles="border border-[#666] text-xs text-ascent-1 px-1.5 py-1 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SUGGESTED FRIENDS */}
            <div className="w-full bg-primary shadow-sm rounded-lg px-5 py-5">
              <div className="flex items-center justify-between text-lg text-ascent-1 border-b border-[#66666645]">
                <span>Friend Suggestion</span>
              </div>
              <div className="w-full flex flex-col gap-4 pt-4">
                {suggestedFriends?.map((friend) => (
                  <div
                    className="flex items-center justify-between"
                    key={friend._id}
                  >
                    <Link
                      to={'/profile/' + friend?._id}
                      key={friend?._id}
                      className="w-full flex gap-4 items-center cursor-pointer"
                    >
                      <img
                        src={friend?.profileUrl ?? NoProfile}
                        alt={friend?.firstName}
                        className="w-10 h-10 object-cover rounded-full"
                      />
                      <div className="flex-1 ">
                        <p className="text-base font-medium text-ascent-1">
                          {friend?.firstName} {friend?.lastName}
                        </p>
                        <span className="text-sm text-ascent-2">
                          {friend?.profession ?? 'No Profession'}
                        </span>
                      </div>
                    </Link>

                    <div className="flex gap-1">
                      <CustomButton
                        title="Accept"
                        containerStyles="bg-[#0444a4] text-xs text-white px-1.5 py-1 rounded-full"
                      />
                      <CustomButton
                        title="Deny"
                        containerStyles="border border-[#666] text-xs text-ascent-1 px-1.5 py-1 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
