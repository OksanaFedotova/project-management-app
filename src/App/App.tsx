import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from 'routes/Login';
import HomePage from '../routes/HomePage';
import PrivateOutlet from 'utils/PrivateOutlet';
import './App.css';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/boards" element={<PrivateOutlet />}>
          <Route index element={<>Страница с бордами</>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
