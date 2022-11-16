import { useMemo } from 'react';

export const useAuth = () => {
  const token = localStorage.getItem('token');

  return useMemo(() => ({ token }), [token]);
};
