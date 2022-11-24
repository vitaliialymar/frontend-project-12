import { Route, Routes, Link } from 'react-router-dom';

import ErrorPage from './components/ErrorPage.jsx';
import Login from './components/Login.jsx';
import Homepage from './components/Homepage.jsx';

import './App.css';

const App = () => (
  <>
    <header>
      <Link to="/">Home</Link>
      <Link to="/login">Log in</Link>
    </header>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </>
);

export default App;
