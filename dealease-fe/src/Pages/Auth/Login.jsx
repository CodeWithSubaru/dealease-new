// import { CardStyle } from '../../Components/Card/Card.style';

import { useEffect, useState } from 'react';
import { H1 } from '../../Components/Helpers/index.style';
import useAuthContext from '../../Hooks/Context/AuthContext';
import { Link } from 'react-router-dom';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const is_buyer = 1,
    is_seller = [0, 1],
    role_type = 0;
  const { loginBuyer, errors, setErrors } = useAuthContext();

  const handleLogin = (e) => {
    e.preventDefault();
    loginBuyer({ email, password, is_buyer, is_seller, role_type });
  };

  return (
    <>
      <H1>Login</H1>
      <div className='login-description'>
        <p className='login-details'>Please login your credentials</p>
        <slot name='login-img' />
      </div>

      <form onSubmit={handleLogin}>
        <div>
          <div>
            Email
            <small className='errMsg'>
              {errors && errors.email ? errors.email[0] : ''}
            </small>
          </div>
          <div>
            <input
              type='email'
              name='email'
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
              // required
              autoFocus
            />
          </div>
        </div>

        <div>
          <div>
            Password
            <small className='errMsg'>
              {errors && errors.password ? errors.password[0] : ''}
            </small>
          </div>
          <div>
            <input
              type='password'
              name='password'
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
              pattern='.{8,}'
              // required
            />
          </div>
        </div>

        {/* <PrimaryBtnStyle
          backgroundColor="#efa726"
          hoverBgColor="#d69215"
          btnTitle="Login"
        /> */}
        <button>Submit</button>

        <div className='back-to-register'>
          <Link to='/register'>Go to Register</Link>
        </div>
      </form>
    </>
  );
};
