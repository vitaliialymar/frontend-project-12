import { Outlet } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import useAuth from '../hooks/index.jsx';

const Layout = () => {
  const { loggedIn, logOut } = useAuth();

  return (
    <>
      <div className="h-100">
        <div className="h-100" id="chat">
          <div className="d-flex flex-column h-100">
            <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
              <div className="container">
                <a className="navbar-brand" href="/">Hexlet Chat</a>
                {loggedIn && <Button onClick={() => logOut()} type="submit" className="btn btn-primary">Выйти</Button>}
              </div>
            </nav>
            <Outlet />
          </div>
        </div>
      </div>
      <div className="Toastify" />
    </>
  );
};

export default Layout;
