import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { fetchDatas } from '../slices/channelsSlice.js';
import useAuth from '../hooks/index.jsx';
import ChannelsList from './ChannelsList.jsx';
import Chat from './Chat.jsx';

const Homepage = () => {
  const dispatch = useDispatch();
  const { getAuthHeader } = useAuth();
  const authHeader = getAuthHeader();

  useEffect(() => {
    dispatch(fetchDatas(authHeader));
  }, [dispatch, authHeader]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <ChannelsList />
        <Chat />
      </div>
    </div>
  );
};

export default Homepage;
