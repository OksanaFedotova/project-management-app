import React from 'react';
import Layout from '../../components/Layout';
import homePageImage from '../../assets/homePageImage.jpg';
import './WelcomePage.css';
import Team from 'components/Team';
import { FormattedMessage } from 'react-intl';

const HomePage = () => {
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
          </div>
          <img className="start-img" src={homePageImage} alt={'start-img'} />
        </div>
        <Team />
      </Layout>
    </>
  );
};

export default HomePage;
