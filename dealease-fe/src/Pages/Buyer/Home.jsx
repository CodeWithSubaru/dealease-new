// import { Adsense } from '@ctrl/react-adsense';
import React from 'react';
import useAuthContext from '../../Hooks/Context/AuthContext';
import HeroSection from '../../Components/Section/HeroSection';

import { Card } from '../../Components/Card/Card';
import { Footer } from '../../Components/Footer/footer';

export const Home = () => {
  const { user } = useAuthContext();

  return (
    <>
      <Card />
      <Footer />
    </>
  );
};
