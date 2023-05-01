import React, { useEffect } from 'react';
import { useState } from 'react';
import { TableComponent } from '../../Components/Table/Table';
import '../../assets/scss/global.scss';
// import { HeroSection } from "../../Components/Section/HeroSection";
import { Card } from '../../Components/Card/Card';
import { H1 } from '../../Components/Helpers/index.style';

import {
  Modal,
  Form,
  Row,
  Col,
  InputGroup,
  Button,
  Container,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { Footer } from '../../Components/Footer/Footer';
import PUBLIC_URL from '../../api/public_url';
import '../../assets/scss/card.scss';
import '../../assets/scss/button.scss';
import '../../assets/scss/post-section.scss';
import axiosClient from '../../api/axios';
import { Notification } from '../../Components/Notification/Notification';
import useProductContext from '../../Hooks/Context/ProductContext';
import useAuthContext from '../../Hooks/Context/AuthContext';

export const HomeUser = () => {
  return (
    <>
      <div className='post_container mb-5'>
        <Container className='container_item px-5'>
          <H1>Home</H1>
        </Container>
      </div>
      <Footer />
    </>
  );
};
