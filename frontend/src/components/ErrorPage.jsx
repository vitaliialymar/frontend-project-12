import { useRouteError } from 'react-router-dom';

// eslint-disable-next-line react-hooks/rules-of-hooks
const error = useRouteError();
console.error(error);

const ErrorPage = () => (
  <div>
    <h1>404</h1>
    <p>
      <i>{error.statusText || error.message}</i>
    </p>
  </div>
);

export default ErrorPage;
