import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import axiosClient from '../../api/axios';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

import {
  faArrowRightArrowLeft,
  faBars,
  faHouse,
  faInbox,
  faTable,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Notification } from '../../Components/Notification/Notification';
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
  sidebarClasses,
  menuClasses,
} from 'react-pro-sidebar';
import { Footer } from '../../Components/Footer/Footer';
import { Link, Navigate } from 'react-router-dom';
import { CardImg } from 'react-bootstrap';
import { Row, Col, InputGroup } from 'react-bootstrap';
import { Finalize } from '../../Components/Notification/Notification';

export function Recharge() {
  const openPaymongo = (url) => {
    window.open(url, '_blank', 'noreferrer');
  };
  const { collapseSidebar } = useProSidebar();
  const [errors, setErrors] = useState([]);
  const [amount, setAmountToShell] = useState(0);
  const navigate = useNavigate();

  const data = {
    amount,
  };
  // Submit Recharge
  const handleRecharge = (e) => {
    e.preventDefault();
    Finalize({
      text: 'Are you sure, Recharge?',
      confirmButton: 'Yes',
      successMsg: 'Transaction Confirmed Successfully.',
    }).then((res) => {
      if (res.isConfirmed) {
        axiosClient
          .post('/recharge', data)
          .then((res) => {
            setAmountToShell('');
            navigate('/transactions');
            openPaymongo(res.data[0].original.data.attributes.checkout_url);
          })
          .catch((e) => {
            Notification({
              title: 'Error',
              message: 'Errors Found',
              icon: 'error',
            });
            setErrors(e.response.data.errors);
          });
      }
    });
  };

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <main className='w-100'>
        <div style={{ height: '80vh' }}>
          <Card className='recharge-card mx-auto w-75'>
            {/* <Card.Img className='recharge-card-wave' src='/images/wave.png' /> */}
            <Card.Img
              className='recharge-card-img p-2 rounded'
              src='/images/shellcoins.png'
            />
            <Card.Body className='recharge-card-body'>
              <Card.Title className='recharge-card-title'>
                {' '}
                <h1>Recharge</h1>
              </Card.Title>
              <Card.Text className='recharge-card-text mb-2'>
                Purchase shells and use it to purchase goods at Dealease.
              </Card.Text>
              <Form onSubmit={handleRecharge}>
                <InputGroup>
                  <InputGroup.Text id='basic-addon1'>PHP</InputGroup.Text>
                  <Form.Control
                    // className='form-control'
                    type='number'
                    min='100'
                    max='99999999'
                    placeholder='Enter your Amount'
                    value={amount}
                    onChange={(e) => setAmountToShell(e.target.value)}
                    isInvalid={!!errors.amount}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.amount}
                  </Form.Control.Feedback>
                </InputGroup>
                <FontAwesomeIcon
                  className='fs-3 mt-3 text-center'
                  icon={faArrowRightArrowLeft}
                />
                <p className='text-black fs-5'>
                  Rate : <span className='text-primary fw-bold'>1</span> Shell
                  Coins
                </p>
                <InputGroup>
                  <InputGroup.Text id='basic-addon1'>
                    {' '}
                    <img
                      src='/images/seashell.png'
                      style={{ width: '25px' }}
                    ></img>
                  </InputGroup.Text>
                  <Form.Control disabled value={amount * 1} />
                </InputGroup>
                <p> Converted Amount: {amount * 1}</p>
                <div className='d-flex justify-content-end'>
                  <Button
                    type='submit'
                    variant='primary'
                    className='rounded'
                    disabled={amount < 100 || amount > 100000}
                  >
                    Purchase
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
        <Footer />
      </main>
    </div>
  );
}
