import { useSelector } from 'react-redux';
import getModal from '../modals/index.js';

const Modal = () => {
  const { type } = useSelector((state) => state.modals);
  const CurrentModal = getModal(type);
  if (!CurrentModal) {
    return null;
  }
  return (
    <CurrentModal />
  );
};

export default Modal;
