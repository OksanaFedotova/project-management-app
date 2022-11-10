import React from 'react';
import Layout from 'components/Layout';
import LoginForm from 'components/LoginForm';
import { useAppDispatch } from 'hooks/redux';
import { toggleIsSignInPage } from 'store/reducers/AuthSlice';

export default function SignInPage() {
  const dispatch = useAppDispatch();
  dispatch(toggleIsSignInPage(true));

  return (
    <Layout>
      <LoginForm />
    </Layout>
  );
}
