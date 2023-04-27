import { useState, useEffect } from 'react';
import useMessageContext from '../../Hooks/Context/MessageContext';
import useAuthContext from '../../Hooks/Context/AuthContext';
import { Button, Row, Col, Container, Badge, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowAltCircleLeft,
  faTable,
} from '@fortawesome/free-solid-svg-icons';
import { Footer } from '../../Components/Footer/Footer';
import '../../assets/scss/inbox.scss';
import axiosClient from '../../api/axios';
import PUBLIC_PATH from '../../api/public_url';
import { Link } from 'react-router-dom';
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
  sidebarClasses,
  menuClasses,
} from 'react-pro-sidebar';
export const InboxBuyer = () => {
  const { collapseSidebar } = useProSidebar();
  const { user } = useAuthContext();
  const { softDel, inboxes, clickedUser, fetchInbox, messages } =
    useMessageContext();
  const [availableUsers, setAvailableUsers] = useState([]);

  function dateFormat(date) {
    const convertedDate = new Date(date);
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };

    const formattedDate = convertedDate.toLocaleDateString('en-US', options);
    return formattedDate;
  }

  useEffect(() => {
    axiosClient.get('/users').then((res) => {
      console.log(res.data.listOfUser);
      setAvailableUsers(res.data.listOfUser);
    });
    fetchInbox();
    const chatInterval = setInterval(() => fetchInbox(), 10000);
    return () => clearInterval(chatInterval);
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
            <button className='btn btn-dark' onClick={() => collapseSidebar()}>
              <FontAwesomeIcon icon={faTable} className='navs-icon' />
            </button>

            <MenuItem
              className='text-black '
              // icon={<FaHouse />}
              component={<Link to='/' />}
            >
              {/* <FontAwesomeIcon icon={faHouse} className='navs-icon' />  */}
              Home
            </MenuItem>
            <SubMenu label='Transactions'>
              <MenuItem> Withdraw </MenuItem>
              <MenuItem> Recharge </MenuItem>
            </SubMenu>
            <MenuItem component={<Link to='/withdraw' />}> Withdraw</MenuItem>
            <MenuItem component={<Link to='/inbox' />}> Inbox</MenuItem>
          </Menu>
        </Sidebar>
        <main className='w-100'>
          <button onClick={() => collapseSidebar()}>Collapse</button>
          <div className='inbox-container' style={{ height: '80vh' }}>
            <div className='inbox-header'>
              <Container>
                <Row>
                  <Col>
                    <FontAwesomeIcon
                      icon={faArrowAltCircleLeft}
                      className='arrow-icon'
                    />
                  </Col>
                  <Col className='header-text'>Your inbox</Col>
                  <Col>
                    <Form>
                      <Form.Control
                        type='search'
                        placeholder='Search...'
                        className='search-post-inbox'
                        aria-label='Search'
                      />
                    </Form>
                  </Col>
                </Row>
              </Container>
            </div>
            <div className='position-relative w-100 h-100 d-flex flex-column text-light'>
              <div
                className='bg-dark w-25 h-100 position-absolute overflow-auto'
                style={{ top: '0', left: '0' }}
              >
                <div>
                  <h3 className='p-3'>List of Users</h3>
                  <div className=''>
                    {availableUsers.length === 0 && (
                      <div className='d-flex ms-3'>Loading users... </div>
                    )}

                    {availableUsers.map((user) => (
                      <>
                        <Link to={'../message/' + user.user_id}>
                          <hr />
                          <div className='d-flex ms-3'>
                            <img
                              src={PUBLIC_PATH + 'images/' + user.prof_img}
                              alt={user.prof_img}
                              className='rounded-circle h-25 w-25 me-2'
                            />
                            <div className='flex-grow-1 align-self-center'>
                              <h5 className='mb-0'> {user.first_name}</h5>
                              <p className='mb-0 badge rounded-pill text-bg-primary'>
                                {user.is_buyer === 'Buyer'
                                  ? user.is_buyer
                                  : user.is_seller}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </>
                    ))}
                  </div>
                </div>
              </div>
              {inboxes.length > 0 ? (
                inboxes.map((inbox) => (
                  <Container
                    className='inbox-content w-75'
                    key={inbox.inbox_id}
                  >
                    <Row>
                      <Col>
                        <div className='text-inbox-content'>
                          <div className='fw-bold'>
                            {inbox.user_id === user.user_id
                              ? inbox.recipient.first_name
                              : inbox.sender.first_name}{' '}
                          </div>
                          {inbox.last_message.chat}{' '}
                          {dateFormat(inbox.last_message.created_at)}
                        </div>
                      </Col>
                      <Col>
                        <div className='btn-inbox-content'>
                          <Button className='btn-content' size='sm'>
                            Profile
                          </Button>
                          <Button
                            className='btn-content'
                            key={inbox.inbox_id}
                            onClick={() =>
                              clickedUser(
                                inbox.recipient_id === user.user_id
                                  ? inbox.user_id
                                  : inbox.recipient_id,
                                ''
                              )
                            }
                            size='sm'
                          >
                            Message
                          </Button>
                          <Button
                            className='btn-content'
                            size='sm'
                            onClick={() => softDel(inbox.inbox_id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                ))
              ) : (
                <Container className='h-100 w-100'>
                  <Row>
                    <Col>
                      <Badge className='none-result' pill>
                        No Message Yet
                      </Badge>
                    </Col>
                  </Row>
                </Container>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};
