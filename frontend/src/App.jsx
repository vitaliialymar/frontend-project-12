import React, { useState, useMemo, useEffect } from 'react';
import {
  BrowserRouter, Route, Routes, Navigate, useLocation,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchDatas } from './slices/dataSlice.js';
import useAuth from './hooks/index.jsx';
import AuthContext from './contexts/index.jsx';
import Layout from './components/Layout.jsx';
import ErrorPage from './components/ErrorPage.jsx';
import Login from './components/Login.jsx';
import Homepage from './components/Homepage.jsx';

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

  const value = useMemo(() => ({ loggedIn, logIn, logOut }), [loggedIn]);

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

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDatas());
  }, [dispatch]);

  return (
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
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
