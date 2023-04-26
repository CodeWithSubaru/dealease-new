// import { Adsense } from '@ctrl/react-adsense';
import React, { useEffect } from 'react';
import useAuthContext from '../../Hooks/Context/AuthContext';
import HeroSection from '../../Components/Section/HeroSection';
import { Card } from '../../Components/Card/Card';
import { Footer } from '../../Components/Footer/Footer';
import { Modal, Row, Col, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

export const Home = () => {
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
        <Sidebar backgroundColor='#19a9d0'>
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
            <MenuItem
              className='text-black fw-bold'
              // icon={<FaHouse />}
              component={<Link to='/' />}
            >
              {/* <FontAwesomeIcon icon={faHouse} className='navs-icon' />  */}
              Home
            </MenuItem>
            <MenuItem component={<Link to='/withdraw' />}> Withdraw</MenuItem>
            <MenuItem> E-commerce</MenuItem>
          </Menu>
        </Sidebar>
        <main className='w-100'>
          <button onClick={() => collapseSidebar()}>Collapse</button>
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
