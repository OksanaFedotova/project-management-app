import React from 'react';
import Layout from '../../components/Layout';
import homePageImage from '../../assets/homePageImage.jpg';
import './WelcomePage.css';
import Team from 'components/Team';

const HomePage = () => {
  return (
    <>
      <Layout>
        <div className="start-page">
          <div className="start-left-block">
            <h1 className="h1">Менеджер проектов</h1>
            <p className="start-text">
              программа для эффективной работы в команде! Приложение создано для простого и
              наглядного управления проектами, постановки задач, контроля и отслеживание хода их
              выполнения.
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
