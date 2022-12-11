import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import {
  Modal, FormGroup, FormControl, Button, Form,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import useServerClient from '../hooks/useServerClient.jsx';
import { hide } from '../slices/modalsSlice.js';
import { selectors } from '../slices/channelsSlice';

const Rename = () => {
  const { t } = useTranslation();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
  }, []);

  const dispatch = useDispatch();
  const { renameChannel } = useServerClient();
  const id = useSelector((state) => state.modals.item);

  const responseHandler = (status) => {
    if (status === 'ok') {
      dispatch(hide());
      toast.success(t('toast.rename'));
    } else {
      toast.warn(t('errors.networkError'));
      throw new Error('Network Error!');
    }
  };

  const onSubmit = (values) => {
    renameChannel({ id, ...values }, responseHandler);
  };

  const channels = useSelector(selectors.selectAll);
  const channelsNames = channels.map((ch) => ch.name);
  const currentChannel = channels.find((ch) => ch.id === id);

  const {
    values, errors, touched, handleChange, handleSubmit,
  } = useFormik({
    initialValues: {
      name: currentChannel.name,
    },
    validationSchema: yup.object().shape({
      name: yup.string().required().min(3).max(20)
        .notOneOf(channelsNames, 'Должно быть уникальным'),
    }),
    onSubmit,
  });

  return (
    <Modal centered show>
      <Modal.Header closeButton onHide={() => dispatch(hide())}>
        <Modal.Title>{t('modals.rename')}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <FormGroup>
            <FormControl
              required
              ref={inputRef}
              onChange={handleChange}
              value={values.name}
              data-testid="input-body"
              name="name"
              id="name"
              className={errors.name && touched.name ? 'is-invalid form-control' : 'form-control'}
            />
            <Form.Label htmlFor="name" className="visually-hidden">{t('modals.name')}</Form.Label>
            <Form.Control.Feedback type="invalid">
              {errors.name ? errors.name : null}
            </Form.Control.Feedback>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch(hide())}>
            {t('modals.cancel')}
          </Button>
          <Button type="submit" variant="primary">
            {t('modals.send')}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default Rename;
