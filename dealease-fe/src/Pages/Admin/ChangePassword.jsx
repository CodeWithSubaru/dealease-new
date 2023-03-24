import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import axiosClient from '../../api/axios';

export function ChangePasswordAdmin() {
  const [errors, setErrors] = useState({});
  const [password, setPassword] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosClient
      .post('/change-password', password)
      .then((response) => {
        if (response.data) {
          console.log(response.data);
        }
        setErrors([]);
      })
      .catch((e) => {
        setErrors(e.response.data.errors);
      });
  };

  useEffect(() => {
    setErrors([]);
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <h3>Change Password</h3>
      {console.log(errors)}
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
