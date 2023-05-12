import Form from 'react-bootstrap/Form';
import { H1 } from '../../Components/Helpers/index.style';
import { useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import axiosClient from '../../api/axios';
import Header from '../../Components/Header/Header';
export function ForgotPassword() {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState({});
  const [notification, setNotification] = useState(null);
  const [isResend, setResend] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    axiosClient
      .post('../forgot-password', email)
      .then((res) => {
        setResend(true);
        setNotification(res.data.status);
        setErrors([]);
      })
      .catch((err) => {
        setErrors(err.response.data.errors);
      });
  }

  function handleReSend(e) {
    e.preventDefault();
    handleSubmit(e);
    setNotification('');
    setResend(false);
  }

  return (
    <>
      <div className='bg-primary forgot-password-header'></div>
      <Container className='mb-5'>
        <Card className='forgot-password-card m-auto mt-5 p-5'>
          <H1 className='forgot-password-h1'> Forgot Password</H1>
          <p className='mb-3'>
            Please provide your email address to reset your password.
          </p>

          {notification && (
            <Form
              onSubmit={handleReSend}
              className='fadeInDown alert alert-primary'
              role='alert'
            >
              {isResend
                ? notification
                : 'Reset link has been sent. Please check your email.'}{' '}
              <button type='submit' className='btn-reset text-underlined'>
                Resend
              </button>
            </Form>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Label className='text-black'>Email Address *</Form.Label>
            <Form.Group className='mb-3'>
              <Form.Control
                type='email'
                name='email'
                className='w-100'
                placeholder='Provide your email'
                onChange={(e) => setEmail({ ...email, email: e.target.value })}
                isInvalid={!!errors && errors.email}
              />

              <Form.Control.Feedback type='invalid'>
                {errors &&
                  errors.email &&
                  errors.email.length > 0 &&
                  errors.email[0]}
              </Form.Control.Feedback>
              <button className='mt-3 w-100 btn btn-outline text-primary btn-reset text-decoration-none border border-2 float-end border-primary'>
                Reset
              </button>
            </Form.Group>
          </Form>
        </Card>
      </Container>
    </>
  );
}
