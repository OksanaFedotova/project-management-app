import React from 'react';
import ILayout from 'interfaces/ILayout';
import './Layout.css';

export default function Layout({ children }: ILayout) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}
