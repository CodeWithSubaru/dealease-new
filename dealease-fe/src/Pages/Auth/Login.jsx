import {
  faEnvelope,
  faEnvelopeSquare,
  faKey,
  faLockOpen,
  faSquareEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { H1 } from '../../Components/Helpers/index.style';
import useAuthContext from '../../Hooks/Context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const role_type = 1;
  const {
    loginBuyer,
    errors,
    isEmailVerified,
    isLogin,
    emailVerificationMessage,
  } = useAuthContext();

  const handleLogin = (e) => {
    e.preventDefault();
    loginBuyer({
      email,
      password,
      role_type,
    });
  };

  return (
    <>
      {isEmailVerified && (
        <div
          className='fadeInDown alert alert-primary text-capitalize'
          role='alert'
        >
          {emailVerificationMessage}
        </div>
      )}

      <div className='Auth-form-container'>
        <form onSubmit={handleLogin} className='Auth-form' id='loginBuyer'>
          <div className='Auth-form-content'>
            <H1 className='Auth-form-title'>Login</H1>
            <div className='form-group mt-3'>
              <div>
                <label htmlFor='' className='text-white'>
                  {' '}
                  Email{' '}
                </label>
              </div>
              <div>
                <div className='login-wrapper'>
                  <FontAwesomeIcon icon={faEnvelope} className='login-icon' />
                  <input
                    type='email'
                    className='login-input form-control '
                    name='email'
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter email'
                    // required
                    autoFocus
                  />
                </div>
                <small className='errMsg'>
                  {errors && errors.email ? errors.email[0] : ''}
                </small>
              </div>
            </div>
            <div className='form-group my-3'>
              <div>
                <label htmlFor='' className='text-white '>
                  Password
                </label>
              </div>
              <div>
                <div className='login-wrapper'>
                  <FontAwesomeIcon icon={faKey} className='login-icon' />
                  <input
                    type='password'
                    className='login-input form-control '
                    name='password'
                    placeholder='Enter password'
                    onChange={(e) => setPassword(e.target.value)}
                    pattern='.{8,}'
                    // required
                  />
                </div>
                <small className='errMsg'>
                  {errors && errors.password ? errors.password[0] : ''}
                </small>
              </div>
            </div>

            <div className='forgotpass mt-2 d-flex justify-content-end'>
              <Link
                to='/forgot-password'
                className='text-white text-capitalize text-right'
              >
                Forgot Password
              </Link>
            </div>

            {/* <PrimaryBtnStyle
          backgroundColor="#efa726"
          hoverBgColor="#d69215"
          btnTitle="Login"
        /> */}
            <div className=' mt-3'>
              <button
                type='submit'
                className='btn btn-outline btn-light btn-submit-login'
                form='loginBuyer'
                disabled={isLogin}
              >
                Sign in
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
