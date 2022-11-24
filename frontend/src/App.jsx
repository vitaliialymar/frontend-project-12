import React from 'react';
import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';

import ErrorPage from './components/ErrorPage.jsx';
import Login from './components/Login.jsx';
import Homepage from './components/Homepage.jsx';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
