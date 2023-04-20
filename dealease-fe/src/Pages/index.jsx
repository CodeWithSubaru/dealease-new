import React from 'react';
import '../../src/assets/scss/global.scss';
import HeroSection from '../Components/Section/HeroSection';
import { Card } from '../Components/Card/Card';
import { Announcement } from './Announcement';
import { Footer } from '../Components/Footer/footer';
import useAuthContext from '../Hooks/Context/AuthContext';

export function Mainpage(props) {
  return (
    <>
      <HeroSection showRegisterModal={props.showRegisterModal} />
      <Announcement />
      <Card />
      <Footer />
    </>
  );
}
