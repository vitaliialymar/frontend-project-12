import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchDatas } from '../slices/channelsSlice.js';
import useAuth from '../hooks/useAuth.jsx';
import ChannelsList from './ChannelsList.jsx';
import Chat from './Chat.jsx';
import Modal from './Modal.jsx';

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
        <Modal />
        <ChannelsList />
        <Chat />
      </div>
    </div>
  );
};

export default Homepage;
