/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from 'react';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import ServerClientContext from '../contexts/ServerClientContext.jsx';
import { addMessage } from '../slices/messageSlice.js';

const ServerProvider = ({ children }) => {
  const dispatch = useDispatch();
  const socket = io();

  useEffect(() => {
    socket.on('newMessage', (message) => {
      dispatch(addMessage(message));
    });
  }, [dispatch, socket]);

  const newMessage = (message) => socket.emit('newMessage', message);

  const value = useMemo(() => ({
    newMessage,
  }), [newMessage]);

  return (
    <ServerClientContext.Provider value={value}>
      {children}
    </ServerClientContext.Provider>
  );
};

export default ServerProvider;
