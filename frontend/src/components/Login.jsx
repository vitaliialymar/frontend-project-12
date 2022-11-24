import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
// import * as yup from 'yup';

const Login = () => (
  <div>
    <h1>Anywhere in your app!</h1>
    <Formik
      initialValues={{ name: '', password: '' }}
      validate={(values) => {
        const errors = {};
        if (!values.name) {
          errors.name = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.name)
        ) {
          errors.name = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          // eslint-disable-next-line no-alert
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="name" name="name" />
          <ErrorMessage name="name" component="div" />
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="div" />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

export default Login;
