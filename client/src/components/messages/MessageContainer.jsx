import { useEffect, useState } from 'react';
import useConversation from '../../zustand/useConversation';
import MessageInput from './MessageInput';
import Messages from './Messages';
import { TiMessages } from 'react-icons/ti';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { apiUrl } from '../../utils/api';

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { user } = useSelector((state) => state.user);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const coords = [position.coords.latitude, position.coords.longitude];
        setLocation(coords);
        axios.post(`${apiUrl}/api/mapUsers/user/location`, {
          userId: user.regUser._id,
          coordinates: coords,
        });
      });
    }

    return () => setSelectedConversation(null);
  }, [setSelectedConversation, user]);

  return (
    <div
      className={`message-container ${selectedConversation ? 'active' : ''}`}
    >
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="message-header">
            <button
              className="back-button"
              onClick={() => setSelectedConversation(null)}
            >
              <AiOutlineArrowLeft />
            </button>
            <span className="label-text">To:</span>
            <span className="message-recipient">
              {selectedConversation.firstName}
            </span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="no-chat-selected">
      <div className="no-chat-selected-text">
        <p>
          Welcome 👋 {user.regUser.firstName + ' ' + user.regUser.lastName} ❄
        </p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="no-chat-icon" />
      </div>
    </div>
  );
};
