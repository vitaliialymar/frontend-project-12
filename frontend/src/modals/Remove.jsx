import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { hide } from '../slices/modalsSlice.js';
import { actions } from '../slices/channelsSlice';
import useServerClient from '../hooks/useServerClient.jsx';

const Remove = () => {
  const dispatch = useDispatch();
  const { removeChannel } = useServerClient();
  const id = useSelector((state) => state.modals.item);
  const defaultChannelId = 1;

  const responseHandler = (status) => {
    if (status === 'ok') {
      dispatch(hide());
      dispatch(actions.changeChannel(defaultChannelId));
    } else {
      throw new Error('Network Error!');
    }
  };

  const removeHandler = (e) => {
    e.preventDefault();
    removeChannel({ id }, responseHandler);
  };

  return (
    <Modal centered show>
      <Modal.Header closeButton onHide={() => dispatch(hide())}>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Form onSubmit={removeHandler}>
        <Modal.Body>Уверены?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch(hide())}>
            Отменить
          </Button>
          <Button type="submit" variant="danger">
            Удалить
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default Remove;
