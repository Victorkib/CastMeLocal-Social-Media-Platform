const messages = [
  {
    id: 1,
    user: 'Benjamin Moores',
    text: 'Hi Catherine! How are you?',
    type: 'received',
  },
  { id: 2, user: 'Catherine', text: "I'm good and you?", type: 'sent' },
  {
    id: 3,
    user: 'Benjamin Moores',
    text: "I'm doing good! What are you doing?",
    type: 'received',
  },
  {
    id: 4,
    user: 'Catherine',
    text: "I'm working on my app design",
    type: 'sent',
  },
  {
    id: 5,
    user: 'Benjamin Moores',
    text: "Let's get lunch! How about sushi?",
    type: 'received',
  },
  { id: 6, user: 'Catherine', text: 'That sounds great!', type: 'sent' },
];

const ChatApp = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <div className="w-full max-w-md md:max-w-4xl border border-gray-700 rounded-lg overflow-hidden shadow-lg">
        <div className="bg-gray-900 p-4 flex items-center">
          <img
            className="w-10 h-10 rounded-full"
            src="https://via.placeholder.com/40"
            alt="User"
          />
          <div className="ml-4">
            <div className="font-semibold">Benjamin Moores</div>
            <div className="text-sm text-gray-400">Last seen 11:44 AM</div>
          </div>
        </div>
        <div
          className="p-4 space-y-4 overflow-y-auto"
          style={{ height: 'calc(100vh - 156px)' }}
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.type === 'sent' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`px-4 py-2 rounded-lg ${
                  msg.type === 'sent'
                    ? 'bg-blue-500 text-white neon'
                    : 'bg-gray-700 text-white neon'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 bg-gray-900 flex items-center">
          <input
            type="text"
            placeholder="Write a message"
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none"
          />
          <button className="ml-2 p-2 bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-4.486 4.264-1.066-4.487a.75.75 0 00-.287-.443l-1.896-1.367a.75.75 0 01.49-1.337h3.89l1.233-5.464a.75.75 0 011.376 0l1.232 5.464h3.89a.75.75 0 01.49 1.337l-1.896 1.367a.75.75 0 00-.287.443l-1.066 4.487-4.486-4.264z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
