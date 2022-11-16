import React, { useEffect, useState } from 'react';
import ILayout from 'interfaces/ILayout';
import './Layout.css';
import Header from 'components/Header';
import Footer from 'components/Footer';

export default function Layout({ children }: ILayout) {
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
  });

  return (
    <>
      <Header isSticky={sticky} />
      <main className="layout">{children}</main>
      <Footer />
    </>
  );
}
