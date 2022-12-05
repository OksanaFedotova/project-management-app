import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
import { IntlProvider } from 'react-intl';
import { LOCALES } from '../i18n/locales';
import { messages } from '../i18n/messages';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

function App() {
  const currentLocale = useSelector((state: RootState) => state.translate.currentLocale);
  return (
    <IntlProvider
      messages={messages[currentLocale]}
      locale={currentLocale}
      defaultLocale={LOCALES.RUSSIAN}
    >
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
        <ToastContainer autoClose={1500} position="top-center" />
      </div>
    </IntlProvider>
  );
}

export default App;
