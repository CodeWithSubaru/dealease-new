// import { Adsense } from '@ctrl/react-adsense';
import React, { useEffect } from 'react';
import useAuthContext from '../../Hooks/Context/AuthContext';
import HeroSection from '../../Components/Section/HeroSection';
import { Card } from '../../Components/Card/Card';
import { Footer } from '../../Components/Footer/Footer';

export const Home = () => {
  const { user, setEmailVerified, setRegistrationSuccess } = useAuthContext();

  useEffect(() => {
    return () => {
      setRegistrationSuccess(false);
      setEmailVerified(false);
    };
  }, []);

  return (
    <>
      <Card />
      <Footer />
    </>
  );
};
