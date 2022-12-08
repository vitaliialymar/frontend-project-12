/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from 'react';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import ServerClientContext from '../contexts/ServerClientContext.jsx';
import { addMessage } from '../slices/messageSlice.js';
import { actions as channelsActions } from '../slices/channelsSlice.js';

const ServerProvider = ({ children }) => {
  const dispatch = useDispatch();
  const socket = io();

  useEffect(() => {
    socket.on('newMessage', (message) => {
      dispatch(addMessage(message));
    });
    socket.on('newChannel', (channel) => {
      dispatch(channelsActions.addChanel(channel));
    });
  }, [dispatch, socket]);

  const newMessage = (message, responseHandler) => socket.emit('newMessage', message, (res) => {
    responseHandler(res.status);
  });

  const addNewChannel = (channel, responseHandler) => socket.emit('newChannel', channel, (res) => {
    responseHandler(res);
  });

  const value = useMemo(() => ({
    newMessage, addNewChannel,
  }), []);

  return (
    <ServerClientContext.Provider value={value}>
      {children}
    </ServerClientContext.Provider>
  );
};

export default ServerProvider;
