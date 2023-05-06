import React, { useEffect, useState } from 'react';
import useAuthContext from '../../Hooks/Context/AuthContext';
import { Card } from '../../Components/Card/Card';
import { Footer } from '../../Components/Footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
  sidebarClasses,
} from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { Button, Modal, Form } from 'react-bootstrap';
import useOrderContext from '../../Hooks/Context/OrderContext';

export const HomeUser = () => {
  const [updateAccessModal, setUpdateAccessModal] = useState(false);
  const { user, setEmailVerified, setRegistrationSuccess } = useAuthContext();
  const { collapseSidebar } = useProSidebar();
  const { setDoneTransaction } = useOrderContext();

  function closeUpdateAccessModal() {
    setUpdateAccessModal(false);
  }

  useEffect(() => {
    setDoneTransaction(false);
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
              backgroundColor: '#19a9d0',
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
            <button className='btn ' onClick={() => collapseSidebar()}>
              <FontAwesomeIcon icon={faBars} className='navs-icon' />
            </button>

            <MenuItem
              className='text-black '
              // icon={<FaHouse />}
              component={<Link to='/' />}
            >
              {/* <FontAwesomeIcon icon={faHouse} className='navs-icon' />  */}
              Home
            </MenuItem>

            <MenuItem component={<Link to='/withdraw' />}> Withdraw </MenuItem>
            <MenuItem component={<Link to='/recharge' />}> Recharge </MenuItem>
            {user.verified_user ? (
              <MenuItem component={<Link to='/product' />}> Product </MenuItem>
            ) : (
              <div className='d-flex flex-column justify-content-end flex-grow-1 h-100'>
                <Button
                  className='btn btn-sm d-inline-block'
                  onClick={() => setUpdateAccessModal(true)}
                >
                  Update Access
                </Button>
              </div>
            )}
          </Menu>
        </Sidebar>
        <main className='w-100 '>
          <Modal
            show={updateAccessModal}
            onHide={closeUpdateAccessModal}
            animation={false}
          >
            <Modal.Header closeButton>
              <Modal.Title className='fw-semibold'>Update Acccess</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form></Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant='secondary'
                className='rounded'
                onClick={closeUpdateAccessModal}
              >
                Close
              </Button>
              <Button
                variant='primary'
                className='rounded'
                onClick={closeUpdateAccessModal}
              >
                Save
              </Button>
            </Modal.Footer>
          </Modal>
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
