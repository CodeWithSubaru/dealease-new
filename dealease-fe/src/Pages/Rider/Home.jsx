// import { Adsense } from '@ctrl/react-adsense';
import React, { useEffect } from 'react';
import useAuthContext from '../../Hooks/Context/AuthContext';
import HeroSection from '../../Components/Section/HeroSection';
import { Card } from '../../Components/Card/Card';
import { Footer } from '../../Components/Footer/Footer';
import { Modal, Row, Col, Container } from 'react-bootstrap';
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

import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
  sidebarClasses,
  menuClasses,
} from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

export const HomeRider = () => {
  const { user, setEmailVerified, setRegistrationSuccess } = useAuthContext();
  const { collapseSidebar } = useProSidebar();

  useEffect(() => {
    return () => {
      setRegistrationSuccess(false);
      setEmailVerified(false);
    };
  }, []);

  return (
    <>
      <div style={{ display: 'flex', height: '100%' }}>
        <Sidebar
          width='190px'
          collapsedWidth='65px'
          transitionDuration='500'
          rootStyles={{
            [`.${sidebarClasses.container}`]: {
              backgroundColor: '#1f98f4',
            },
          }}
        >
          <Menu
            menuItemStyles={{
              button: ({ level, active, disabled }) => {
                // only apply styles on first level elements of the tree
                if (level === 0)
                  return {
                    color: disabled ? '#f5d9ff' : '#white',
                    backgroundColor: active ? '#eecef9' : undefined,
                  };
              },
            }}
          >
            <button className='btn' onClick={() => collapseSidebar()}>
              <FontAwesomeIcon icon={faBars} className='navs-icon' />
            </button>

            <MenuItem
              className='text-black '
              // icon={<FaHouse />}
              component={<Link to='/' />}
            >
              <FontAwesomeIcon icon={faHouse} className='navs-icon' />
              Home
            </MenuItem>
            <SubMenu label='Transactions'>
              {/* <FontAwesomeIcon icon={faInbox} className="navs-icon" /> */}
              {/* <MenuItem component={<Link to="/withdraw" />}> Withdraw </MenuItem> */}
              <MenuItem component={<Link to='/recharge' />}>
                {' '}
                Recharge{' '}
              </MenuItem>
            </SubMenu>
            <MenuItem className='text-black' component={<Link to='/inbox' />}>
              <FontAwesomeIcon icon={faInbox} className='navs-icon' />
              Inbox
            </MenuItem>
          </Menu>
        </Sidebar>
        <main className='w-100' style={{ minHeight: '815px' }}>
          <button className='btn btn-dark' to={'/recharge'}>
            Recharge
          </button>
          <Card />
        </main>
        <Footer />
      </div>
    </>
  );
};
