import React from 'react';
import Layout from '../../components/Layout';
import homePageImage from '../../assets/homePageImage.jpg';
import './WelcomePage.css';
import Team from 'components/Team';
import { FormattedMessage } from 'react-intl';
import { useAuth } from 'hooks/useAuth';
import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';

const HomePage = () => {
  const auth = useAuth();
  const isAuth = auth.token;
  return (
    <>
      <Layout>
        <div className="start-page">
          <div className="start-left-block">
            <h1 className="h1">
              <FormattedMessage id="project_title" />
            </h1>
            <p className="start-text">
              <FormattedMessage id="app_description" />
            </p>
            {isAuth ? (
              <NavLink to="/boards" style={{ color: `inherit`, textDecoration: `none` }}>
                <Button variant="contained" size="large" sx={{ pl: 5, pr: 5, pt: 2, pb: 2 }}>
                  <FormattedMessage id="start_work" />
                </Button>
              </NavLink>
            ) : (
              <NavLink to="/sign-in" style={{ color: `inherit`, textDecoration: `none` }}>
                <Button variant="contained" size="large" sx={{ pl: 5, pr: 5, pt: 2, pb: 2 }}>
                  <FormattedMessage id="start_work" />
                </Button>
              </NavLink>
            )}
          </div>
          <img className="start-img" src={homePageImage} alt={'start-img'} />
        </div>
        <Team />
      </Layout>
    </>
  );
};

export default HomePage;
