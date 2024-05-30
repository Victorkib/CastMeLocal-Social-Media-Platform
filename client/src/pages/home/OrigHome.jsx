import MessageContainer from '../../components/messages/MessageContainer';
import Sidebar from '../../components/sidebar/Sidebar';
import useConversation from '../../zustand/useConversation';
const Home = () => {
  const { selectedConversation } = useConversation();

  return (
    <div
      className={`home-container ${
        selectedConversation ? 'show-message-container' : 'show-sidebar'
      }`}
    >
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default Home;
