import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Redirect() {
  const auth = useAuth();
  const location = useLocation();

  return auth.user ? (
    <Navigate to="/boards" state={{ from: location }} />
  ) : (
    <Navigate to="/welcome" state={{ from: location }} />
  );
}
