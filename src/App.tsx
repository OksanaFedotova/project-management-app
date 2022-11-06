import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from 'routes/Login/Login';
import { PrivateOutlet } from 'utils/PrivateOutlet';
import './App.css';
import HomePage from './routes/HomePage/HomePage';

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
