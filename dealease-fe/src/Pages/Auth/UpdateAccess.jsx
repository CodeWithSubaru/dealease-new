import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import useAuthContext from '../../Hooks/Context/AuthContext';
import Button from 'react-bootstrap/Button';

export function UpdateAccess() {
  const [user, setUser] = useState({
    email: '',
    password: '',
    password_confirmation: '',
  });

  const { errors, setErrors, updateAccess } = useAuthContext();

  const handleRegister = (e) => {
    e.preventDefault();
    updateAccess(user);
  };

  useEffect(() => {
    setErrors([]);
  }, []);

  return (
    <Card className='w-75 mx-auto p-5'>
      <h1>Register</h1>

      <div className='register-account-exist mb-1'>
        <p className='register-details'>Please provide your details</p>
        <div className='alert alert-warning' role='alert'>
          <ul>
            <div className='d-flex align-items-center mb-3'>
              <FontAwesomeIcon
                icon={faLightbulb}
                className='me-2'
                style={{ marginLeft: '-20px' }}
              />
              <h4 className='mb-0'>Take Note:</h4>
            </div>
            <li>All fields with asterisk (*) are required</li>
          </ul>
        </div>
      </div>

      <Form className='form' onSubmit={handleRegister}>
        <div className='account-details'>
          <h3>Account Details</h3>
          <hr />

          <Form.Group className='mb-3'>
            <Form.Label> Email * </Form.Label>
            <Form.Control
              type='email'
              name='email'
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              isInvalid={!!errors && !!errors.email}
            />
            <Form.Control.Feedback type='invalid'>
              {errors &&
                errors.email &&
                errors.email.length > 0 &&
                errors.email[0]}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Password * </Form.Label>
            <Form.Control
              type='password'
              name='password'
              onChange={(e) => setUser({ ...user, password: e.target.value })}
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
            <Form.Label>Confirm Password * </Form.Label>
            <Form.Control
              type='password'
              name='password_confirmation'
              onChange={(e) =>
                setUser({
                  ...user,
                  password_confirmation: e.target.value,
                })
              }
              value={user.password_confirmation}
            />
          </Form.Group>
        </div>

        <div className='d-flex justify-content-end'>
          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </div>
      </Form>
    </Card>
  );
}
