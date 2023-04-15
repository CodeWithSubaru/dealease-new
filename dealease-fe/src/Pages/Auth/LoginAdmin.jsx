import {
  faEnvelope,
  faEnvelopeSquare,
  faKey,
  faLockOpen,
  faSquareEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Container, Row, Col } from 'react-bootstrap';
import { H1 } from '../../Components/Helpers/index.style';
import useAuthContext from '../../Hooks/Context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navigate } from 'react-router-dom';

export const LoginAdmin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const is_buyer = 0,
    is_seller = 0,
    role_type = 1;
  const { loginAdmin, errors, setErrors, user_type, token } = useAuthContext();

  if (token) {
    if (user_type == 'Admin') {
      return <Navigate to='/admin/dashboard' />;
    }
  }

  useEffect(() => {
    setErrors([]);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    loginAdmin({ email, password, is_buyer, is_seller, role_type });
  };

  return (
    <>
      <Modal
        className='modal'
        dialogClassName='modal-container'
        show={true}
        keyboard
        aria-labelledby='contained-modal-title-vcenter'
      >
        <div className='box'>
          <Modal.Body>
            <i></i>
            {/*  */}
            <div className='Auth-form-container'>
              <form onSubmit={handleLogin} className='Auth-form'>
                <div className='Auth-form-content'>
                  <H1 className='Auth-form-title'>Login Admin</H1>
                  <div className='mt-4'>
                    <div>Email</div>
                    <div>
                      <div className='login-wrapper'>
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          className='login-icon'
                        />
                        <input
                          type='email'
                          className='login-input form-control mt-1'
                          name='email'
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder='Email'
                          autoFocus
                        />
                      </div>
                    </div>
                  </div>
                  <small className='errMsg'>
                    {errors && errors.email ? errors.email[0] : ''}
                  </small>

                  <div className='mt-4'>
                    <div>Password</div>
                    <div>
                      <div className='login-wrapper'>
                        <FontAwesomeIcon icon={faKey} className='login-icon' />
                        <input
                          type='password'
                          className='login-input form-control mt-1'
                          name='password'
                          placeholder='Password'
                          onChange={(e) => setPassword(e.target.value)}
                          pattern='.{8,}'
                          // required
                        />
                      </div>
                    </div>
                  </div>
                  <small className='errMsg'>
                    {errors && errors.password ? errors.password[0] : ''}
                  </small>

                  <div className='d-flex mt-5'>
                    <button type='submit' className='btn btn-submit'>
                      Sign in
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
};
