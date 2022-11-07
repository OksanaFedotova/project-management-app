import React from 'react';
import Footer from 'components/Footer';
import Header from 'components/Header';
import ILayout from 'interfaces/ILayout';
import './Layout.css';

export default function Layout({ children }: ILayout) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
