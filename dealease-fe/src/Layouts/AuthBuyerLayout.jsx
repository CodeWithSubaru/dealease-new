import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header/Header';
import useAuthContext from '../Hooks/Context/AuthContext';
import PUBLIC_PATH from '../api/public_url';
import '../assets/scss/button.scss';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { EmailVerification } from '../Pages/Auth/EmailVerification';
import useAddToCartContext from '../Hooks/Context/AddToCartContext';
import Image from 'react-bootstrap/Image';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { GoogleAdSense } from '../Components/GoogleAdSense';

export function AuthBuyerLayout() {
  const { user, token, user_type, logout } = useAuthContext();
  const { countItemsInCart, fetchCountInItemsCart } = useAddToCartContext();

  const closeMobileMenu = () => setClick(false);
  const handleLogout = () => {
    logout();
  };

  if (!user.email_verified_at && token) {
    return <EmailVerification />;
  }

  useEffect(() => {
    fetchCountInItemsCart();
  }, []);

  return (
    <>
      <Header>
        {/* Modified Solla */}
        <li className='nav-item'>
          <Link to='/' className='nav-links'>
            Home
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/inbox' className='nav-links'>
            Inbox
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/withdraw' className='nav-links'>
            Withdraw
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/transactions' className='nav-links'>
            Transactions
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/add-to-cart' className='nav-links'>
            <FontAwesomeIcon icon={faCartShopping} className='navs-icon' />{' '}
            <span
              className='badge rounded-pill text-bg-danger position-relative'
              style={{ top: '-5px' }}
            >
              {countItemsInCart}
            </span>
          </Link>
        </li>
        <div class='outer'>
          <div class='inner'></div>
        </div>
        <li className='nav-item'>
          <p className='nav-links'>
            <img
              src='/images/seashell.png'
              className='me-2'
              style={{ height: '30px' }}
            ></img>
            {user.buyer_wallet ? user.buyer_wallet.shell_coin_amount : null}
          </p>
        </li>
        <li className='nav-item'>
          <div className='div-dropdown me-3'>
            {user ? (
              <>
                <Dropdown as={ButtonGroup} className='dropdown-button'>
                  <Button variant='dark' className='dropdown-logout'>
                    <img
                      className='dropdown-logout-profile me-2'
                      src={PUBLIC_PATH + 'images/' + user.prof_img}
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        objectFit: 'fit',
                      }}
                    />{' '}
                    {user.first_name}
                  </Button>

                  <Dropdown.Toggle
                    split
                    variant='dark'
                    id='dropdown-split-basic'
                  />
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to={'/profile'}>
                      My Profile
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to={'/change-password'}>
                      Change Password
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <p>Loading ...</p>
            )}
          </div>
        </li>
      </Header>
      {user_type === 'Buyer' || user_type === 'Buyer_seller1' ? (
        <>
          <Outlet />
          {/* <GoogleAdSense /> */}
        </>
      ) : (
        <Navigate to='/home' />
      )}
    </>
  );
}
