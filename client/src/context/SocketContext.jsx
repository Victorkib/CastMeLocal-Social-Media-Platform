import { createContext, useState, useEffect, useContext } from 'react';
//import { useAuthContext } from './AuthContext';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  //const { authUser } = useAuthContext();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      const socket = io('https://castmelocal.onrender.com', {
        query: {
          userId: user._id,
        },
      });

      setSocket(socket);

      // socket.on() is used to listen to the events. can be used both on client and server side
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
