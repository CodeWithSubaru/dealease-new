import 'rsuite/dist/rsuite.min.css';
import { useState, useEffect } from 'react';
import { Navbar, Nav, Input, InputGroup } from 'rsuite';
import CogIcon from '@rsuite/icons/legacy/Cog';
import SearchIcon from '@rsuite/icons/Search';
import InfoIcon from '@rsuite/icons/legacy/Info';
import AvatarIcon from '@rsuite/icons/legacy/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from 'rsuite/Avatar';
import {
  faBagShopping,
  faCartShopping,
  faHouse,
  faShop,
  faShoppingBasket,
  faUserAlt,
  faWallet,
} from '@fortawesome/free-solid-svg-icons';
import PUBLIC_PATH from '../../api/public_url';
import { Loader } from '../Loader/Loader';

const styles = {
  width: 'auto',
};

const headerStyles = {
  padding: 18,
  fontSize: 16,
  height: 56,
  background: '#34c3ff',
  color: ' #fff',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
};
// import { Navbar, Nav } from 'rsuite';
import HomeIcon from '@rsuite/icons/legacy/Home';
import useAuthContext from '../../Hooks/Context/AuthContext';
import useProductContext from '../../Hooks/Context/ProductContext';

export function NavbarUser({ onSelectTop, activeKeyTop, ...props }) {
  const { user } = useAuthContext();
  const { searchProduct } = useProductContext();
  const { loading } = useAuthContext();

  const [UserNavbarMobilenew, setUserNavbarMobile] =
    useState('UserNavbarMobile');

  const listenScrollEvent = (event) => {
    if (window.scrollY < 0.5) {
      return setUserNavbarMobile('UserNavbarMobile');
    } else if (window.scrollY > 0.5) {
      return setUserNavbarMobile('UserNavbarMobile2');
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent);

    return () => window.removeEventListener('scroll', listenScrollEvent);
  }, []);
  return (
    <>
      <Navbar
        className={UserNavbarMobilenew}
        {...props}
        // style={{ position: 'fixed', zIndex: 1, backgroundColor: '#0c6ffd' }}
      >
        <Navbar.Brand href='/home' className='text-nowrap fw-bold fst-italic'>
          <img
            alt=''
            src='/images/dealeasefavicon.png'
            width='25'
            height='25'
            className='d-inline-block align-top me-2'
          />
          DEALEASE
        </Navbar.Brand>
        <Nav onSelect={onSelectTop} activeKey={activeKeyTop}>
          <InputGroup inside style={styles}>
            <Input
              type='search'
              placeholder='Search...'
              onChange={(e) => searchProduct(e)}
            />
            <InputGroup.Addon>
              <SearchIcon />
            </InputGroup.Addon>
          </InputGroup>
        </Nav>
        <Nav pullRight>
          <Nav.Item>
            <Avatar
              circle
              // src='https://avatars.githubusercontent.com/u/1203827'
              src={PUBLIC_PATH + 'images/' + user.prof_img}
              alt='@simonguo'
              className='me-3'
            />
            {user.first_name ? user.first_name : ''}
          </Nav.Item>
        </Nav>
      </Navbar>
      {loading && <Loader visibility={loading}></Loader>}
    </>
  );
}

export function MobileHeader({ onSelect, activeKey, ...props }) {
  const { user } = useAuthContext();

  return (
    <div className='customNav bg-white'>
      <Nav justified {...props} activeKey={activeKey} onSelect={onSelect}>
        <Nav.Item
          href='/home'
          className='flex-column d-flex text-center'
          eventKey='home'
        >
          <FontAwesomeIcon className='mobile-icon mx-auto' icon={faShop} />
          <span className='mobile-icon-label'>Home</span>
        </Nav.Item>
        <Nav.Item
          href='/orders'
          className='flex-column d-flex text-center'
          eventKey='orders'
        >
          <FontAwesomeIcon
            className='mobile-icon mx-auto'
            icon={faBagShopping}
          />
          <span className='mobile-icon-label'>Orders</span>
        </Nav.Item>
        {user.verified_user == 1 ? (
          <>
            <Nav.Item
              href='/orders/seller'
              className='flex-column d-flex text-center'
              eventKey='orders'
            >
              <div className='position-relative'>
                <FontAwesomeIcon
                  className='mobile-icon mx-auto'
                  icon={faBagShopping}
                />

                <small
                  className='badge rounded-pill text-bg-primary position-absolute p-1'
                  style={{ top: '-5px', right: '-12px' }}
                >
                  Seller
                </small>
              </div>
              <span className='mobile-icon-label'>Orders</span>
            </Nav.Item>
          </>
        ) : (
          ''
        )}
        <Nav.Item
          href='/add-to-cart'
          className='flex-column d-flex text-center'
          eventKey='cart'
        >
          <FontAwesomeIcon
            className='mobile-icon mx-auto'
            icon={faCartShopping}
          />
          <span className='mobile-icon-label'>Cart</span>
        </Nav.Item>
        <Nav.Item className='flex-column d-flex text-center' eventKey='wallet'>
          <FontAwesomeIcon className='mobile-icon mx-auto' icon={faWallet} />
          <span className='mobile-icon-label'>Wallet</span>
        </Nav.Item>
        <Nav.Item className='flex-column d-flex text-center' eventKey='Me'>
          <FontAwesomeIcon className='mobile-icon mx-auto' icon={faUserAlt} />
          <span className='mobile-icon-label'>Me</span>
        </Nav.Item>
      </Nav>
    </div>
  );
}
