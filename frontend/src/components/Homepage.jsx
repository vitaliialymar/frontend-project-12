/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchDatas } from '../slices/channelsSlice.js';
import useAuth from '../hooks/useAuth.jsx';
import ChannelsList from './ChannelsList.jsx';
import Chat from './Chat.jsx';
import Modal from './Modal.jsx';

const Homepage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getAuthHeader } = useAuth();
  const authHeader = getAuthHeader();
  const { error } = useSelector((state) => state.channels);

  useEffect(() => {
    dispatch(fetchDatas(authHeader));
    if (error) {
      localStorage.clear();
      navigate('/login');
    }
  }, [error, navigate]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Modal />
        <ChannelsList />
        <Chat />
      </div>
    </div>
  );
};

export default Homepage;
