/* eslint-disable jsx-a11y/label-has-associated-control */
import { useFormik } from 'formik';
import validator from '../utilites/validator.js';

const onSubmit = () => console.log('submitted');

const Login = () => {
  const {
    values, errors, handleChange, handleSubmit,
  } = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validator,
    onSubmit,
  });

  console.log(errors);

  return (
    <form onSubmit={handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
      <h1 className="text-center mb-4">Войти</h1>
      <div className="form-floating mb-3">
        <input
          onChange={handleChange}
          name="username"
          autoComplete="username"
          required=""
          placeholder="Ваш ник"
          id="username"
          className="form-control"
          value={values.username}
        />
        <label htmlFor="username">Ваш ник</label>
      </div>
      <div className="form-floating mb-4">
        <input
          onChange={handleChange}
          name="password"
          autoComplete="current-password"
          required=""
          placeholder="Пароль"
          type="password"
          id="password"
          className="form-control"
          value={values.password}
        />
        <label htmlFor="password">Пароль</label>
      </div>
      <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
    </form>
  );
};

export default Login;
