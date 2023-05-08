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

export function Recharge() {
  const openPaymongo = (url) => {
    window.open(url, '_blank', 'noreferrer');
  };
  const { collapseSidebar } = useProSidebar();
  const [errors, setErrors] = useState([]);
  const [amount, setAmountToShell] = useState(0);
  const data = {
    amount,
  };
  // Submit Recharge
  const handleRecharge = (e) => {
    e.preventDefault();
    console.log(data);
    axiosClient
      .post('/recharge', data)
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          Notification({
            title: 'Success',
            message: 'cute mo po',
            icon: 'success',
          }).then(() => {
            setAmountToShell('');

            openPaymongo(res.data[0].original.data.attributes.checkout_url);
          });
        }
      })
      .catch((e) => {
        Notification({
          title: 'Error',
          message: 'Errors Found',
          icon: 'error',
        });
        setErrors(e.response.data.errors);
      });
  };

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <Sidebar
        width='190px'
        collapsedWidth='65px'
        transitionDuration='500'
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: '#1f98f4',
          },
        }}
      >
        <Menu
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
              // only apply styles on first level elements of the tree
              if (level === 0)
                return {
                  color: disabled ? '#f5d9ff' : '#white',
                  backgroundColor: active ? '#eecef9' : undefined,
                };
            },
          }}
        >
          <button className='btn' onClick={() => collapseSidebar()}>
            <FontAwesomeIcon icon={faBars} className='navs-icon' />
          </button>

          <MenuItem
            className='text-black '
            // icon={<FaHouse />}
            component={<Link to='/' />}
          >
            <FontAwesomeIcon icon={faHouse} className='navs-icon' />
            Home
          </MenuItem>
          <SubMenu label='Transactions'>
            {/* <FontAwesomeIcon icon={faInbox} className="navs-icon" /> */}
            {/* <MenuItem component={<Link to="/withdraw" />}> Withdraw </MenuItem> */}
            <MenuItem component={<Link to='/recharge' />}> Recharge </MenuItem>
          </SubMenu>
          <MenuItem className='text-black' component={<Link to='/inbox' />}>
            <FontAwesomeIcon icon={faInbox} className='navs-icon' />
            Inbox
          </MenuItem>
        </Menu>
      </Sidebar>
      <main className='w-100' style={{ minHeight: '815px' }}>
        <div style={{ height: '80vh' }}>
          <button className='btn btn-dark'>Recharge</button>
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
                  <Button type='submit' variant='primary' className='rounded'>
                    Purchase
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
