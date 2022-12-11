import axios from 'axios';
import { useFormik } from 'formik';
import React, { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import useAuth from '../hooks/useAuth.jsx';
import { signupValidator } from '../utilites/validator.js';
import routes from '../utilites/routes.js';
import signupImage from '../assets/signup.jpg';

const Signup = () => {
  const { t } = useTranslation();
  const [isRegistred, setIsRegistred] = useState(false);
  const auth = useAuth();
  const inputRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const onSubmit = async (values) => {
    const newUser = { username: values.username, password: values.password };
    setIsRegistred(false);
    try {
      const res = await axios.post(routes.signupPath(), newUser);
      localStorage.setItem('token', JSON.stringify(res.data));
      auth.logIn();
      const { from } = location.state || { from: { pathname: '/' } };
      navigate(from);
    } catch (err) {
      setIsRegistred(true);
      if (err.isAxiosError && err.response.status === 409) {
        inputRef.current.select();
        return;
      }
      throw err;
    }
  };

  const {
    values, errors, touched, handleChange, handleBlur, handleSubmit,
  } = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signupValidator,
    onSubmit,
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img src={signupImage} className="rounded-circle" alt={t('signupPage.signup')} />
              </div>
              <Form onSubmit={handleSubmit} className="w-50">
                <h1 className="text-center mb-4">{t('signupPage.signup')}</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={handleChange}
                    name="username"
                    autoComplete="username"
                    required=""
                    placeholder={t('errors.name')}
                    id="username"
                    className={errors.username && touched.username ? 'is-invalid form-control' : 'form-control'}
                    value={values.username}
                    ref={inputRef}
                    onBlur={handleBlur}
                    isInvalid={isRegistred}
                  />
                  {errors.username && touched.username && <div className="invalid-tooltip">{t(errors.username)}</div>}
                  <Form.Label className="form-label" htmlFor="username">{t('signupPage.name')}</Form.Label>
                  {isRegistred && <div className="invalid-tooltip" />}
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={handleChange}
                    name="password"
                    autoComplete="new-password"
                    required=""
                    aria-describedby="passwordHelpBlock"
                    aria-autocomplete="list"
                    placeholder={t('errors.password')}
                    type="password"
                    id="password"
                    className={errors.password && touched.password ? 'is-invalid form-control' : 'form-control'}
                    onBlur={handleBlur}
                    value={values.password}
                    isInvalid={isRegistred}
                  />
                  {errors.password && touched.password && <div className="invalid-tooltip p-2">{t(errors.password)}</div>}
                  <Form.Label className="form-label" htmlFor="password">{t('signupPage.password')}</Form.Label>
                  {isRegistred && <div className="invalid-tooltip" />}
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    onChange={handleChange}
                    name="confirmPassword"
                    autoComplete="new-password"
                    required=""
                    placeholder={t('errors.confirmPassword')}
                    type="password"
                    id="confirmPassword"
                    className={errors.confirmPassword && touched.confirmPassword && values.password !== '' ? 'is-invalid form-control' : 'form-control'}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                    isInvalid={isRegistred}
                  />
                  {errors.confirmPassword && touched.confirmPassword && <div className="invalid-tooltip p-2">{t('errors.confirmPassword')}</div>}
                  <Form.Label className="form-label" htmlFor="confirmPassword">{t('signupPage.confirmPassword')}</Form.Label>
                  {isRegistred && <div className="invalid-tooltip">{t('errors.signup')}</div>}
                </Form.Group>
                <Button variant="outline-primary" type="submit" className="w-100 btn">{t('signupPage.btn')}</Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
