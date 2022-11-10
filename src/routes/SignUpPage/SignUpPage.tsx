import React from 'react';
import Layout from 'components/Layout';
import LoginForm from 'components/LoginForm';
import { useAppDispatch } from 'hooks/redux';
import { toggleIsSignInPage } from 'store/reducers/AuthSlice';

export default function SignUpPage() {
  const dispatch = useAppDispatch();
  dispatch(toggleIsSignInPage(false));

  return (
    <Layout>
      <LoginForm />
    </Layout>
  );
}
