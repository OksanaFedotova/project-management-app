import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function RedirectToBoards() {
  const auth = useAuth();
  const location = useLocation();

  return auth.user ? <Navigate to="/boards" state={{ from: location }} /> : <Outlet />;
}
