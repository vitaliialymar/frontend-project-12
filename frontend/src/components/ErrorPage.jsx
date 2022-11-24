import { Link } from 'react-router-dom';

const ErrorPage = () => (
  <div>
    <h1>404</h1>
    <div>
      Not found. Go
      {' '}
      <Link to="/">Home</Link>
    </div>
  </div>
);

export default ErrorPage;
