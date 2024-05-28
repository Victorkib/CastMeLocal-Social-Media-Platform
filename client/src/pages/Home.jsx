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
import UserSLider from '../components/UserSLider';

const Home = () => {
  const { user, edit } = useSelector((state) => state.user);
  const [friendRequest] = useState(requests);
  const [suggestedFriends] = useState(suggest);
  const [errMsg] = useState('');
  const [setFile] = useState(null);
  const [posting] = useState(false);
  const [loading] = useState(false);

  const users = [
    {
      id: 1,
      username: 'user1',
      profileUrl:
        'https://people.com/thmb/IfjWMKhodGNtpx11DvN1M0M3r1c=/4000x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(349x0:351x2)/clarissa-cruz-headshot-people-f4197aa2a3b44efb90f907198d950c8d.jpg',
    },
    {
      id: 2,
      username: 'user2',
      profileUrl:
        'https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/06/15/Chris-Pratt.jpg',
    },
    {
      id: 3,
      username: 'user3',
      profileUrl:
        'https://png.pngtree.com/thumb_back/fh260/background/20220428/pngtree-template-corporate-banner-of-dark-blue-and-black-glossy-stripes-on-image_1110207.jpg',
    },
    {
      id: 4,
      username: 'user4',
      profileUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBlPlpTtK_z4wQ4W74DmV5pxpZYatxBAmzrg&usqp=CAU',
    },
    {
      id: 5,
      username: 'user5',
      profileUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-zxd1-dLr3G1zNoKoDOaHDtFSTYpRT-f6LA&usqp=CAU',
    },
    // Add more user objects as needed
  ];
  const {
    register,
    // handleSubmit,
    formState: { errors },
  } = useForm();

  // const handlePostSubmit = async (data) => {};

  return (
    <>
      <div className="w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor h-screen overflow-hidden">
        <TopBar />
        <UserSLider users={users} />
        <div className="w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-screen">
          {/* LEFT */}

          <div className="hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto">
            <div className="w-full bg-primary bg-opacity-45 flex flex-col items-center shadow-sm rounded-xl px-6 py-4">
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
          <div className="flex-1 h-full px-4 flex flex-col gap-6 overflow-y-auto rounded-lg">
            <form
              // onSubmit={handleSubmit(handlePostSubmit)}
              className="bg-primary px-4 rounded-2xl bg-opacity-30"
            >
              <div className="w-full flex items-center gap-2 py-4 border-b border-[#66666645]">
                <img
                  src={user?.profileUrl ?? NoProfile}
                  alt="User Image"
                  className="w-14 h-14 rounded-full object-cover"
                />
                <TextInput
                  styles="w-full rounded-full py-5"
                  placeholder="What's on your mind...."
                  name="description"
                  register={register('description', {
                    required: 'Write something about post',
                  })}
                  error={errors.description ? errors.description.message : ''}
                />
              </div>
              {errMsg?.message && (
                <span
                  role="alert"
                  className={`text-sm ${
                    errMsg?.status === 'failed'
                      ? 'text-[#f64949fe]'
                      : 'text-[#2ba150fe]'
                  } mt-0.5`}
                >
                  {errMsg?.message}
                </span>
              )}

              <div className="flex items-center justify-between py-4">
                <label
                  htmlFor="imgUpload"
                  className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
                >
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="hidden"
                    id="imgUpload"
                    data-max-size="5120"
                    accept=".jpg, .png, .jpeg"
                  />
                  <BiImages />
                  <span>Image</span>
                </label>

                <label
                  className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
                  htmlFor="videoUpload"
                >
                  <input
                    type="file"
                    data-max-size="5120"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="hidden"
                    id="videoUpload"
                    accept=".mp4, .wav"
                  />
                  <BiSolidVideo />
                  <span>Video</span>
                </label>

                <label
                  className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
                  htmlFor="vgifUpload"
                >
                  <input
                    type="file"
                    data-max-size="5120"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="hidden"
                    id="vgifUpload"
                    accept=".gif"
                  />
                  <BsFiletypeGif />
                  <span>Gif</span>
                </label>

                <div>
                  {posting ? (
                    <Loading />
                  ) : (
                    <CustomButton
                      type="submit"
                      title="Post"
                      containerStyles="bg-[#0444a4] text-white py-1 px-6 rounded-full font-semibold text-sm"
                    />
                  )}
                </div>
              </div>
            </form>

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
          <div className="hidden w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto">
            {/* FRIEND REQUEST */}
            <div className="w-full bg-primary bg-opacity-75 shadow-sm rounded-2xl px-6 py-5 my-2">
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
            <div className="w-full bg-primary bg-opacity-75 shadow-sm rounded-lg px-5 py-5 my-2">
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
                      <button
                        className="bg-[#0444a430] text-sm text-white p-1 rounded"
                        onClick={() => {}}
                      >
                        <BsPersonFillAdd size={20} className="text-[#0f52b6]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {edit && <EditProfile />}
    </>
  );
};

export default Home;
