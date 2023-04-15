import Form from 'react-bootstrap/Form';
import { H1 } from '../../Components/Helpers/index.style';
import { useState } from 'react';
import { Card } from 'react-bootstrap';
import axiosClient from '../../api/axios';

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
    <Card className='m-auto w-75 p-5'>
      <H1> Forgot Password</H1>
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
          <button type='submit' className='text-underlined'>
            Resend
          </button>
        </Form>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3'>
          <Form.Label>Email Address *</Form.Label>
          <Form.Control
            type='email'
            name='email'
            onChange={(e) => setEmail({ ...email, email: e.target.value })}
            isInvalid={!!errors && errors.email}
          />

          <Form.Control.Feedback type='invalid'>
            {errors &&
              errors.email &&
              errors.email.length > 0 &&
              errors.email[0]}
          </Form.Control.Feedback>
        </Form.Group>
        <button>Reset</button>
      </Form>
    </Card>
  );
}
