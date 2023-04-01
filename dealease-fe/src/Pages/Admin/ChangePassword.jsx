import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Navigate } from 'react-router-dom';
import axiosClient from '../../api/axios';
import { Notification } from '../../Components/Notification/Notification';

export function ChangePasswordAdmin() {
  const [errors, setErrors] = useState({});
  const [password, setPassword] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosClient
      .post('/change-password', password)
      .then((res) => {
        if (res.status === 200) {
          Notification({
            title: 'Success',
            message:
              'Your password has been changed. You will be redirected to login page',
            icon: 'success',
          }).then(() => {
            <Navigate to='/admin/login' />;
          });
        }
        setErrors([]);
      })
      .catch((e) => {
        Notification({
          title: 'Error',
          message: 'Something went wrong',
          icon: 'error',
        }).then(() => setErrors(e.response.data.errors));
      });
  };

  useEffect(() => {
    setErrors([]);
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <h3>Change Password</h3>
      <Form.Group className='mb-3'>
        <Form.Label>Old Password *</Form.Label>
        <Form.Control
          type='password'
          placeholder='Enter Old Password'
          onChange={(e) =>
            setPassword({ ...password, old_password: e.target.value })
          }
          isInvalid={!!errors}
        />
        <Form.Control.Feedback type='invalid'>
          {errors.old_password &&
            errors.old_password.length > 0 &&
            errors.old_password[0]}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>New Password *</Form.Label>
        <Form.Control
          type='password'
          placeholder='Enter New Password'
          onChange={(e) =>
            setPassword({ ...password, new_password: e.target.value })
          }
          isInvalid={!!errors}
        />
        <Form.Control.Feedback type='invalid'>
          {errors.new_password &&
            errors.new_password.length > 0 &&
            errors.new_password[0]}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Confirm Password *</Form.Label>
        <Form.Control
          type='password'
          placeholder='Re-Enter Confirm Password'
          onChange={(e) =>
            setPassword({
              ...password,
              new_password_confirmation: e.target.value,
            })
          }
        />
      </Form.Group>
      <button>Submit</button>
    </form>
  );
}
