import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import {
  Modal, FormGroup, FormControl, Button, Form,
} from 'react-bootstrap';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import useServerClient from '../hooks/useServerClient.jsx';
import { hide } from '../slices/modalsSlice.js';
import { selectors, actions } from '../slices/channelsSlice';

const Add = () => {
  const { t } = useTranslation();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const { addNewChannel } = useServerClient();

  const dispatch = useDispatch();

  const responseHandler = (res) => {
    if (res.status === 'ok') {
      dispatch(actions.changeChannel(res.data.id));
      dispatch(hide());
      toast.success(t('toast.add'));
    } else {
      toast.warn(t('errors.networkError'));
      throw new Error('Network Error!');
    }
  };

  const onSubmit = (values) => {
    addNewChannel(values, responseHandler);
  };

  const channels = useSelector(selectors.selectAll);
  const channelsNames = channels.map((ch) => ch.name);

  const {
    values, errors, touched, handleChange, handleSubmit,
  } = useFormik({
    initialValues: {
      name: '',
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
        <Modal.Title>{t('modals.add')}</Modal.Title>
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
              className={errors.name && touched.name ? 'is-invalid form-control' : 'form-control'}
            />
            <Form.Label htmlFor="channelName" className="visually-hidden">{t('modals.add')}</Form.Label>
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

export default Add;