import { useSelector } from 'react-redux';
//import { useAuthContext } from '../../context/AuthContext';
import { extractTime } from '../../utils/extractTime';
import useConversation from '../../zustand/useConversation';

const Message = ({ message }) => {
  // const { authUser } = useAuthContext();
  const { user } = useSelector((store) => store.user);
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === user.regUser._id;
  const formattedTime = extractTime(message.createdAt);
  const messageClassName = fromMe ? 'message-end' : 'message-start';
  const profilePic = fromMe
    ? user.regUser.profilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? 'bg-blue-500' : 'bg-lime-500 text-black';
  const shakeClass = message.shouldShake ? 'shake' : '';

  return (
    <div className={`message ${messageClassName}`}>
      <div className="message-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Profile" src={profilePic} />
        </div>
      </div>
      <div
        className={`message-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}
      >
        {message.message}
      </div>
      <div className="message-footerTime">{formattedTime}</div>
    </div>
  );
};

export default Message;
