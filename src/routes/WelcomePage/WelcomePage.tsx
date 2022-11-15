import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Layout from '../../components/Layout';
import homePageImage from '../../assets/homePageImage.jpg';
import './WelcomePage.css';
import Team from 'components/Team';
import Buttons from 'components/Buttons';

const HomePage = () => {
  const [sticky, setSticky] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > 0) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Header isSticky={sticky} />
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
      <Footer />
    </>
  );
};

export default HomePage;
