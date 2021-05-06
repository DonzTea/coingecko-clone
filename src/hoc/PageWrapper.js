import React from 'react';

import Header from '../components/Header';
import Navbar from '../components/Navbar';

export default function PageWrapper({ children }) {
  return (
    <div>
      <Navbar />
      <Header />
      {children}
    </div>
  );
}
