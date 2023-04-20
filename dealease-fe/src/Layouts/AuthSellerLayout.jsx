import { Navigate, Outlet } from 'react-router-dom';

import { Link } from 'react-router-dom';
import Header from '../Components/Header/Header';
import useAuthContext from '../Hooks/Context/AuthContext';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import PUBLIC_PATH from '../api/public_url';
// import { GoogleAdSense } from '../Components/GoogleAdSense';

export function AuthSellerLayout() {
  const { user, user_type, logout } = useAuthContext();
  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <Header>
        {/* Modified Solla */}
        <li className='nav-item'>
          <Link to='/seller/home' className='nav-links'>
            Home
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/seller/shop' className='nav-links'>
            Shop
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/seller/inbox' className='nav-links'>
            Inbox
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/seller/donation' className='nav-links'>
            Donasyon
          </Link>
        </li>

        <p className='nav-links'>
          {user.seller_wallet ? user.seller_wallet.shell_coin_amount : null}
        </p>
        <li className='nav-item'>
          <div className='div-dropdown'>
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

              <Dropdown.Toggle split variant='dark' id='dropdown-split-basic' />

              <Dropdown.Menu>
                <Dropdown.Item as={Link} to={'/seller/profile'}>
                  My Profile
                </Dropdown.Item>
                <Dropdown.Item as={Link} to={'/seller/change-password'}>
                  Change Password
                </Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </li>
      </Header>
      {user_type === 'Seller' || user_type === 'Buyer_seller2' ? (
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
