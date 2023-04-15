import Form from 'react-bootstrap/Form';
import { H1 } from '../../Components/Helpers/index.style';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import axiosClient from '../../api/axios';
import useAuthContext from '../../Hooks/Context/AuthContext';

export function PasswordReset() {
  const { csrf } = useAuthContext();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [password_confirmation, setPasswordConfirmation] = useState(null);
  const [notification, setNotification] = useState(null);
  const [errors, setErrors] = useState([]);
  const { token } = useParams();
  const [searchParams] = useSearchParams();

  function handleSubmit(e) {
    e.preventDefault();
    axiosClient
      .post('../reset-password', {
        email,
        token,
        password,
        password_confirmation,
      })
      .then((res) => {
        csrf();
        setNotification(res.data.status);
        setErrors([]);
      })
      .catch((err) => {
        setErrors(err.response.data.errors);
      });
  }

  useEffect(() => {
    setEmail(searchParams.get('email'));
  }, []);

  return (
    <Card className='m-auto w-75 p-5'>
      <H1> Reset Password</H1>
      <p className='mb-3'></p>

      {notification && (
        <div className='fadeInDown alert alert-primary' role='alert'>
          {notification}
        </div>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3'>
          <Form.Label>Password *</Form.Label>
          <Form.Control
            type='password'
            name='password'
            onChange={(e) => setPassword(e.target.value)}
            isInvalid={!!errors && errors.password}
          />

          <Form.Control.Feedback type='invalid'>
            {errors &&
              errors.password &&
              errors.password.length > 0 &&
              errors.password[0]}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Password Confirmation *</Form.Label>
          <Form.Control
            type='password'
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </Form.Group>
        <button>Reset</button>
      </Form>
    </Card>
  );
}
