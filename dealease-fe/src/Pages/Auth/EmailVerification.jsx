import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axiosClient from '../../api/axios';
import PUBLIC_PATH from '../../api/public_url';
import Header from '../../Components/Header/Header';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { Footer } from '../../Components/Footer/Footer';
import useAuthContext from '../../Hooks/Context/AuthContext';
import { useState } from 'react';

export function EmailVerification() {
  const { user, logout } = useAuthContext();

  const [message, setMessage] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    axiosClient.get('/email/resend').then((res) => setMessage(res.data.msg));
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <Header>
        <Dropdown as={ButtonGroup} className='dropdown-button'>
          <Button variant='dark' className='dropdown-logout'>
            <img
              className='dropdown-logout-profile me-2'
              src={PUBLIC_PATH + 'images/' + user.prof_img}
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                objectFit: 'fit',
              }}
            />{' '}
            {user.first_name}
          </Button>
          <Dropdown.Toggle split variant='dark' id='dropdown-split-basic' />
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Header>

      <div style={{ height: '85vh' }}>
        <Card className='mx-auto w-50 h-100 px-2 pt-4'>
          {message && (
            <div
              className='fadeInDown alert alert-primary text-capitalize'
              role='alert'
            >
              {message}
            </div>
          )}
          <p>
            {' '}
            Please verify your email. We've sent your email verification to your
            account.
          </p>{' '}
          <div>
            Didn't receive Email?{' '}
            <Form onSubmit={handleSubmit} className='d-inline'>
              <Button veriant='primary' type='submit'>
                Resend
              </Button>
            </Form>
          </div>
        </Card>
      </div>
      <Footer />
    </>
  );
}
