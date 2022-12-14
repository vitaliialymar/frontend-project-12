import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { hide } from '../slices/modalsSlice.js';
import useServerClient from '../hooks/useServerClient.jsx';

const Remove = () => {
  const { t } = useTranslation();

  const [isSubmit, setIsSubmit] = useState(false);

  const dispatch = useDispatch();
  const { removeChannel } = useServerClient();
  const id = useSelector((state) => state.modals.item);

  const responseHandler = (status) => {
    if (status === 'ok') {
      dispatch(hide());
      toast.success(t('toast.remove'));
    } else {
      toast.warn(t('errors.networkError'));
      throw new Error('Network Error!');
    }
  };

  const removeHandler = (e) => {
    e.preventDefault();
    setIsSubmit(true);
    removeChannel({ id }, responseHandler);
  };

  return (
    <Modal centered show>
      <Modal.Header closeButton onHide={() => dispatch(hide())}>
        <Modal.Title>{t('modals.remove')}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={removeHandler}>
        <Modal.Body>{t('modals.sure')}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch(hide())}>
            {t('modals.cancel')}
          </Button>
          <Button disabled={isSubmit} type="submit" variant="danger">
            {t('modals.delete')}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default Remove;
