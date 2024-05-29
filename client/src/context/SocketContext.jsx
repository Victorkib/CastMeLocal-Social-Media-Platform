import { createContext, useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user && user.regUser) {
      const socket = io('https://castmelocal.onrender.com', {
        // Connect to backend URL in production
        query: {
          userId: user.regUser._id,
        },
      });

      setSocket(socket);

      socket.on('getOnlineUsers', (users) => {
        setOnlineUsers(users);
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
