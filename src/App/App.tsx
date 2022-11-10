import React from 'react';
import { Route, Routes } from 'react-router-dom';
import WelcomePage from 'routes/WelcomePage';
import SignInPage from 'routes/SignInPage';
import SignUpPage from 'routes/SignUpPage';
import EditPage from 'routes/EditPage';
import BoardsPage from 'routes/BoardsPage';
import BoardPage from 'routes/BoardPage';
import NotFoundPage from 'routes/NotFoundPage';
import RedirectToWelcome from 'utils/RedirectToWelcome';
import RedirectToBoards from 'utils/RedirectToBoards';
import Redirect from 'utils/Redirect';
import './App.css';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/" element={<Redirect />} />
        <Route path="/boards" element={<RedirectToWelcome />}>
          <Route index element={<BoardsPage />} />
        </Route>
        <Route path="/boards/:id" element={<RedirectToWelcome />}>
          <Route index element={<BoardPage />} />
        </Route>
        <Route path="/edit-profile" element={<RedirectToWelcome />}>
          <Route index element={<EditPage />} />
        </Route>
        <Route path="/sign-in" element={<RedirectToBoards />}>
          <Route index element={<SignInPage />} />
        </Route>
        <Route path="/sign-up" element={<RedirectToBoards />}>
          <Route index element={<SignUpPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
