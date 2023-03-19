import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import axiosClient from '../../api/axios';
import useAuthContext from '../../Hooks/Context/AuthContext';

export function ChangePasswordBuyer() {
  const { errors, setErrors } = useAuthContext();
  const [password, setPassword] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosClient
      .post('/change-password', password)
      .then((response) => {
        console.log(response.data);
        console.log('hi');
      })
      .catch((error) => {
        console.log(error);
        setErrors(error.response.data.errors);
      });
  };

  useEffect(() => {
    if (errors) {
      setErrors(null);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <h3>Change Password</h3>

      <Form.Group className='mb-3'>
        <Form.Label>Old Password *</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter Old Password'
          onChange={(e) =>
            setPassword({ ...password, old_password: e.target.value })
          }
          isInvalid={!!errors.old_password}
        />
        <Form.Control.Feedback type='invalid'>
          {errors.old_password}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>New Password *</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter New Password'
          onChange={(e) =>
            setPassword({ ...password, new_password: e.target.value })
          }
          isInvalid={!!errors.new_password}
        />
        <Form.Control.Feedback type='invalid'>
          {errors.new_password}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Confirm Password *</Form.Label>
        <Form.Control
          type='text'
          placeholder='Re-Enter Confirm Password'
          onChange={(e) =>
            setPassword({ ...password, password_confirmation: e.target.value })
          }
        />
      </Form.Group>
      <button>Submit</button>
    </form>
  );
}
