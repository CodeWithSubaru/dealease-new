import { useEffect, useState } from 'react';
import useAuthContext from '../../Hooks/Context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { H1 } from '../../Components/Helpers/index.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faEnvelopeSquare,
  faKey,
  faLockOpen,
  faSquareEnvelope,
} from '@fortawesome/free-solid-svg-icons';

export const LoginRider = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const role_type = 2;
  const {
    loginRider,
    errors,
    setErrors,
    user_type,
    token,
    isEmailVerified,
    isLogin,
    emailVerificationMessage,
  } = useAuthContext();

  if (token) {
    if (user_type == 'User') {
      return <Navigate to='/home' />;
    }

    if (user_type == 'Rider') {
      return <Navigate to='/rider/to-pick-up' />;
    }

    if (user_type == 'Admin') {
      return <Navigate to='/admin/dashboard' />;
    }
  }

  useEffect(() => {
    setErrors([]);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    loginRider({
      email,
      password,
      role_type,
    });
  };

  return (
    <>
      <Modal
        className='modal'
        dialogClassName='modal-md login-modal'
        show={true}
        keyboard
        aria-labelledby='contained-modal-title-vcenter'
      >
        <div className='box text-light'>
          <Modal.Body>
            <i></i>
            {/*  */}
            {isEmailVerified && (
              <div
                className='fadeInDown alert alert-primary text-capitalize'
                role='alert'
              >
                {emailVerificationMessage}
              </div>
            )}
            <div className='Auth-form-container'>
              <form
                onSubmit={handleLogin}
                className='Auth-form'
                style={{ zIndex: '9999' }}
              >
                <div className='Auth-form-content'>
                  <H1 className='Auth-form-title text-white'>Login Rider</H1>
                  <div className='mt-4'>
                    <div style={{ color: '#fff', opacity: '1' }}>
                      Email / Username
                    </div>
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
                    <button
                      type='submit'
                      className='btn btn-outline btn-light btn-submit-login'
                    >
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
