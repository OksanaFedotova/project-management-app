import React from 'react';
import { useAppDispatch } from 'hooks/redux';
import Layout from 'components/Layout';
import { setUser } from 'store/reducers/AuthSlice';
import { useSignupMutation } from 'store/services/authAPI';

export default function SignInPage() {
  const [signup] = useSignupMutation();
  const dispatch = useAppDispatch();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const userInputs = {
      name: 'test',
      login: 'test',
      password: 'Password123!',
    };
    try {
      const userResponse = await signup(userInputs).unwrap();
      dispatch(setUser(userResponse));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Layout>
      <div className="layout">
        <form onSubmit={(e) => handleSubmit(e)}>
          <button type="submit">submit</button>
        </form>
      </div>
    </Layout>
  );
}
