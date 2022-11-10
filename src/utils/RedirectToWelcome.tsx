import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function RedirectToWelcome() {
  const auth = useAuth();
  const location = useLocation();

  return auth.user ? <Outlet /> : <Navigate to="/welcome" state={{ from: location }} />;
}
