/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from 'react';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import filter from 'leo-profanity';
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
      dispatch(channelsActions.addChannel(channel));
    });
    socket.on('renameChannel', ({ id, name }) => {
      dispatch(channelsActions.updateChannel({ id, changes: { name } }));
    });
    socket.on('removeChannel', (id) => {
      dispatch(channelsActions.removeChannel(id));
    });
  }, [dispatch, socket]);

  const newMessage = ({ body, channelId, username }, responseHandler) => socket
    .emit('newMessage', { body: filter.clean(body), channelId, username }, (res) => {
      responseHandler(res.status);
    });

  const addNewChannel = (channel, responseHandler) => socket.emit('newChannel', channel, (res) => {
    responseHandler(res);
  });

  const renameChannel = (channel, responseHandler) => socket.emit('renameChannel', channel, (res) => {
    responseHandler(res.status);
  });

  const removeChannel = (id, responseHandler) => socket.emit('removeChannel', id, (res) => {
    responseHandler(res.status);
  });

  const value = useMemo(() => ({
    newMessage, addNewChannel, renameChannel, removeChannel,
  }), []);

  return (
    <ServerClientContext.Provider value={value}>
      {children}
    </ServerClientContext.Provider>
  );
};

export default ServerProvider;
