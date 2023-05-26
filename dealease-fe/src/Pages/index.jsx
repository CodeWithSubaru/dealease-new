import React from 'react';
import '../../src/assets/scss/global.scss';
import HeroSection from '../Components/Section/HeroSection';
import { Card } from '../Components/Card/Card';
import { Announcement } from './Announcement';
import { Container, Row, Col } from 'react-bootstrap';
import { Footer } from '../Components/Footer/Footer';
import useAuthContext from '../Hooks/Context/AuthContext';

export function Mainpage(props) {
  return (
    <>
      <HeroSection showRegisterModal={props.showRegisterModal} />
      {/* <Container fluid style={{ marginTop: '-120px' }}>
        <div className='promotion'>
          <Row>
            <Col md={6}>
              <img alt='' src='/images/ss.png' className='rider-img mx-auto' />
            </Col>
            <Col>
              <div className='promotion'>
                <p className='text-black'>Why choose Dealease?</p>
                <h1 className='text-black'>
                  The Dealease Fish Market web application service for all your
                  needs.
                </h1>
                <div className=' d-flex align-items-center'>
                  <a
                    className='mt-3 btn btn-outline text-primary btn-rider text-decoration-none border border-3 border-primary'
                    href='/rider/register'
                  >
                    Become a Rider
                  </a>
                </div>
                <div id='announcement'></div>
              </div>
            </Col>
          </Row>
        </div>
      </Container> */}
      <Announcement />
      <Card />
    </>
  );
}
