import {
  faEnvelope,
  faEnvelopeSquare,
  faKey,
  faLockOpen,
  faSquareEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../Components/Button/Button';
import { H1 } from '../../Components/Helpers/index.style';
import useAuthContext from '../../Hooks/Context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const LoginSeller = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const is_buyer = [0, 1],
    is_seller = 1,
    role_type = 0;
  const { loginSeller, errors, setErrors } = useAuthContext();

  useEffect(() => {
    setErrors([]);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    loginSeller({ email, password, is_buyer, is_seller, role_type });
  };

  return (
    <>
      <div className='Auth-form-container'>
        <form onSubmit={handleLogin} className='Auth-form' id='loginSeller'>
          <div className='Auth-form-content'>
            <H1 className='Auth-form-title'>Login Seller</H1>
            <div className='form-group mt-3'>
              <div>
                <label htmlFor='' className='text-white'>
                  Email
                </label>
              </div>
              <div>
                <div className='login-wrapper'>
                  <FontAwesomeIcon icon={faEnvelope} className='login-icon' />
                  <input
                    type='email'
                    className='login-input form-control'
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
                <label htmlFor='' className='text-white'>
                  Password
                </label>
              </div>
              <div>
                <div className='login-wrapper'>
                  <FontAwesomeIcon icon={faKey} className='login-icon' />
                  <input
                    type='password'
                    className='login-input form-control'
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

            <div className='remember_me-wrapper mt-2 d-flex justify-content-end'>
              <Link to='/forgot-password' className='fw-bold text-right'>
                Forgot Password
              </Link>
            </div>
            {/* <PrimaryBtnStyle
          backgroundColor="#efa726"
          hoverBgColor="#d69215"
          btnTitle="Login"
        /> */}
            <div className='d-flex mt-3'>
              <button
                type='submit'
                className='btn btn-primary btn-submit'
                form='loginSeller'
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
