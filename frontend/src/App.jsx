import React, { useState, useMemo } from 'react';
import {
  BrowserRouter, Route, Routes, Navigate, useLocation,
} from 'react-router-dom';
import useAuth from './hooks/useAuth.jsx';
import AuthContext from './contexts/AuthContext.jsx';
import Layout from './components/Layout.jsx';
import ServerProvider from './utilites/ServerProvider.jsx';
import ErrorPage from './components/ErrorPage.jsx';
import Login from './components/Login.jsx';
import Homepage from './components/Homepage.jsx';
import Signup from './components/Singup.jsx';

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('token'));
  // eslint-disable-next-line no-unneeded-ternary
  const initState = currentUser ? true : false;

  const [loggedIn, setLoggedIn] = useState(initState);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  const getUsername = () => {
    const { username } = JSON.parse(localStorage.getItem('token'));
    return username;
  };

  const getAuthHeader = () => {
    const userId = JSON.parse(localStorage.getItem('token'));

    if (userId && userId.token) {
      return { Authorization: `Bearer ${userId.token}` };
    }

    return {};
  };

  const value = useMemo(() => ({
    loggedIn, logIn, logOut, getAuthHeader, getUsername,
  }), [loggedIn]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const { loggedIn } = useAuth();
  const location = useLocation();

  return (
    loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => (
  <ServerProvider>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={(
                <PrivateRoute>
                  <Homepage />
                </PrivateRoute>
              )}
            />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </ServerProvider>
);

export default App;
