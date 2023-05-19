import Table from 'react-bootstrap/Table';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Card, Row, Col, Container } from 'react-bootstrap';
import PUBLIC_URL from '../../api/public_url';
import axiosClient from '../../api/axios';
import useAuthContext from '../../Hooks/Context/AuthContext';

import { NavbarRiderProfile } from '../../Components/MobileHeader/MobileHeader';

export const ProfileRider = () => {
  const [activeKeyTop, setActiveKeyTop] = useState(null);
  const [show, setShow] = useState(false);
  const [reportUserModal, setReportUserModal] = useState(false);
  const { user } = useAuthContext();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleReportUser() {
    axiosClient.post(PUBLIC_URL + '/users/' + user);
  }

  function showReportUserModal() {
    setReportUserModal(true);
  }

  function hideReportUserModal() {
    setReportUserModal(false);
  }

  return user ? (
    <>
      <NavbarRiderProfile
        // appearance='subtle'
        activeKeyTop={activeKeyTop}
        onSelectTop={setActiveKeyTop}
      />
      <div style={{ display: 'flex', height: '100%' }}>
        <main className='w-100' style={{ minHeight: '815px' }}>
          <div style={{ height: '150px' }}></div>
          <div className='mx-auto w-100 mb-5'>
            <div className='d-flex mx-auto justify-content-center'>
              <Container>
                <Row>
                  <Col lg={3} className='mb-3'>
                    <div className=' '>
                      <Card className='rounded overflow-hidden'>
                        <Card.Body className='bg-primary'>
                          <p className='text-white'>Total Deliver</p>
                          <hr />
                          <p className='small text-white'>00000</p>
                          <div className='small text-white'>
                            <i className='fas fa-angle-right'></i>
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                  </Col>

                  <Col lg={3} className='mb-3'>
                    <div className=' '>
                      <Card className='rounded overflow-hidden'>
                        <Card.Body className='bg-warning '>
                          <p className='text-white'>Total Cancel</p>
                          <hr />
                          <p className='small text-white  '>0000000</p>
                          <div className='small text-white'>
                            <i className='fas fa-angle-right'></i>
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                  </Col>

                  <Col lg={3} className='mb-3'>
                    <div className=''>
                      <Card className='rounded overflow-hidden'>
                        <Card.Body className='bg-success'>
                          <p className='text-white'>Total Wallet Balance</p>
                          <hr />
                          <p className='small text-white'>00000</p>
                          <div className='small text-white'>
                            <i className='fas fa-angle-right'></i>
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </main>
      </div>
    </>
  ) : (
    <p>Loading...</p>
  );
};
