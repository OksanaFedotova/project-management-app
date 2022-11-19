import React, { useState } from 'react';
import Layout from '../../components/Layout';
import homePageImage from '../../assets/homePageImage.jpg';
import './WelcomePage.css';
import Team from 'components/Team';
import { IntlProvider } from 'react-intl';
import { LOCALES } from '../../i18n/locales';
import { messages } from '../../i18n/messages';
import { FormattedMessage } from 'react-intl';

const HomePage = () => {
  const getInitialLocal = localStorage.getItem('Language')!;
  const [currentLocale, setCurrentLocale] = useState<string>(getInitialLocal);

  return (
    <IntlProvider
      messages={messages[currentLocale]}
      locale={currentLocale}
      defaultLocale={LOCALES.RUSSIAN}
    >
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
    </IntlProvider>
  );
};

export default HomePage;
