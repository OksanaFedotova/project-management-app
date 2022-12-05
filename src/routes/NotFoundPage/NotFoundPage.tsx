import React from 'react';
import Layout from '../../components/Layout';
import notFoundImage from '../../assets/notFound.jpg';
import './NotFoundPage.css';
import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';
import { FormattedMessage } from 'react-intl';

export default function NotFoundPage() {
  return (
    <>
      <Layout>
        <div className="not-found-page">
          <img className="not-found-img" src={notFoundImage} alt="Not Found Page Image" />
          <NavLink to="/welcome" style={{ color: `inherit`, textDecoration: `none` }}>
            <Button variant="contained">
              <FormattedMessage id="to_main" />
            </Button>
          </NavLink>
        </div>
      </Layout>
    </>
  );
}
