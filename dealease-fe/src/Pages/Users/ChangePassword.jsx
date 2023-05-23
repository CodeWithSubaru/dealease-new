import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axiosClient from '../../api/axios';
import { Notification } from '../../Components/Notification/Notification';
import useAuthContext from '../../Hooks/Context/AuthContext';
import { Form, Container, Card } from 'react-bootstrap';
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
  sidebarClasses,
  menuClasses,
} from 'react-pro-sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faBurger,
  faHamburger,
  faHouse,
  faSliders,
  faTable,
  faToggleOn,
  faInbox,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Footer } from '../../Components/Footer/Footer';
import { SidebarUser } from '../../Components/Sidebar/Sidebar';

export function ChangePasswordUser() {
  const [errors, setErrors] = useState({});
  const [password, setPassword] = useState({});
  const { logout } = useAuthContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosClient
      .post('/change-password', password)
      .then((res) => {
        if (res.status === 200) {
          Notification({
            title: 'Success',
            message:
              'Your password has been changed. You will be redirected to home page',
            icon: 'success',
          }).then(() => {
            logout();
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
    <>
      <div style={{ display: 'flex', height: '100%' }}>
        <SidebarUser />
        <main className='w-100' style={{ minHeight: '828px' }}>
          <br />
          <Container className='changePasswordContainer'>
            <Card className='changePasswordCard'>
              <form onSubmit={handleSubmit}>
                <h3 className='changePasswordh3'>Change Password</h3>
                <Form.Group className='mb-3'>
                  <Form.Label className='text-black'>Old Password</Form.Label>
                  &nbsp;<span className='text-danger'>*</span>
                  <Form.Control
                    type='password'
                    placeholder='Enter Old Password'
                    onChange={(e) =>
                      setPassword({ ...password, old_password: e.target.value })
                    }
                    isInvalid={!!errors && !!errors.old_password}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.old_password &&
                      errors.old_password.length > 0 &&
                      errors.old_password[0]}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label className='text-black'>New Password</Form.Label>
                  &nbsp;<span className='text-danger'>*</span>
                  <Form.Control
                    type='password'
                    placeholder='Enter New Password'
                    onChange={(e) =>
                      setPassword({ ...password, new_password: e.target.value })
                    }
                    isInvalid={!!errors && !!errors.new_password}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.new_password &&
                      errors.new_password.length > 0 &&
                      errors.new_password[0]}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label className='text-black'>
                    Confirm Password
                  </Form.Label>
                  &nbsp;
                  <span className='text-danger'>*</span>
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
                <button className='btn btn-primary w-30 rounded'>Submit</button>
              </form>
            </Card>
          </Container>
        </main>
      </div>
    </>
  );
}
