// import { Adsense } from '@ctrl/react-adsense';
import React, { useState, useEffect } from 'react';
import useAuthContext from '../../Hooks/Context/AuthContext';
import { Ridertransaction } from '../../Components/Pages/Ridertransaction';
import { Footer } from '../../Components/Footer/Footer';
import {
  Modal,
  Row,
  Col,
  Container,
  Nav,
  Tab,
  Card,
  Dropdown,
  ButtonGroup,
  Button,
} from 'react-bootstrap';
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
  faLocationDot,
  faEllipsisVertical,
  faCircleDot,
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
import '../../assets/scss/navbar.scss';
import { Link } from 'react-router-dom';
import PUBLIC_PATH from '../../api/public_url';
import Header from '../../Components/Header/Header';
import axiosClient from '../../api/axios';
import { Finalize } from '../../Components/Notification/Notification';

export const HomeRider = () => {
  const [body, setBody] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewOrderBuyerModal, setViewOrderBuyerModal] = useState(false);
  const [viewOrders, setViewOrders] = useState([]);

  const { user, setEmailVerified, setRegistrationSuccess, logout } =
    useAuthContext();
  const { collapseSidebar } = useProSidebar();

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    axiosClient
      .get('/rider')
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => console.log(e));
    return () => {
      setRegistrationSuccess(false);
      setEmailVerified(false);
    };
  }, []);

  const header = [
    {
      title: 'Id',
      prop: 'id',
      isSortable: true,
    },
    {
      title: 'Order Number',
      prop: 'order_number',
      isSortable: true,
    },
    {
      title: 'Seller Name',
      prop: 'seller_name',
    },
    {
      title: 'Contact #',
      prop: 'contact_number',
    },
    {
      title: 'Status',
      prop: 'order_status',
      isFilterable: true,
      isSortable: true,
    },
    {
      title: 'Total Amount',
      prop: 'payment_total_amount',
      isSortable: true,
    },
    {
      title: 'Date Request',
      prop: 'created_at',
      isSortable: true,
    },
    { title: 'Action', prop: 'action' },
  ];

  function calculateGrandTotalPrice(orders) {
    let totalPrice = 0;
    let deliveryFee;
    Object.values(orders).forEach((orderItem) => {
      totalPrice += Number(orderItem.total_price);
      deliveryFee = Number(orderItem.delivery_fee);
    });

    return Number(totalPrice) + deliveryFee;
  }

  function status(status) {
    if (status === '0') {
      return 'Pending';
    }
    if (status === '1') {
      return 'Pending';
    }
    if (status === '2') {
      return 'Preparing';
    }
    if (status === '3') {
      return 'Waiting rider';
    }
    if (status === '4') {
      return 'To Pick Up';
    }
    if (status === '5') {
      return 'To Deliver';
    }
    if (status === '6') {
      return 'Delivered';
    }
    if (status === '7') {
      return 'Success';
    }
    if (status === '8') {
      return 'Failed';
    }
  }

  function switchColor(status) {
    if (status === '0') {
      return 'border-danger bg-danger bg-opacity-75 text-light';
    }

    if (status === '1') {
      return 'border-warning bg-warning bg-opacity-75 text-light';
    }
    if (status === '2') {
      return 'border-secondary bg-secondary bg-opacity-75 text-light';
    }

    if (status === '3') {
      return 'border-primary bg-primary bg-opacity-75 text-light';
    }

    if (status === '4') {
      return 'border-danger bg-danger bg-opacity-75 text-light';
    }

    if (status === '5') {
      return 'border-danger bg-danger bg-opacity-75 text-light';
    }

    if (status === '6') {
      return 'border-danger bg-danger bg-opacity-75 text-light';
    }

    if (status === '7') {
      return 'border-danger bg-danger bg-opacity-75 text-light';
    }

    if (status === '8') {
      return 'border-danger bg-danger bg-opacity-75 text-light';
    }
  }

  function calculateGrandTotalDeliveryFee(totalPrice, delFee) {
    let totalPriceDelFee = 0;
    totalPriceDelFee += Number(totalPrice) + Number(delFee);
    return Number(totalPriceDelFee).toLocaleString('en-US');
  }

  function dateFormat(date) {
    const convertedDate = new Date(date);
    const options = {
      weekday: 'short',
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

  function view(orderNumber) {
    setViewOrders([]);
    axiosClient
      .get('/orders/' + orderNumber)
      .then((res) => {
        setViewOrders(res.data);
      })
      .catch((e) => console.log(e));
  }

  function closeViewOrderBuyerModal() {
    setViewOrderBuyerModal(false);
  }

  function accept(orderTransId) {
    Finalize({
      text: 'You want accept this order request and Pick up the Delivery?',
      confirmButton: 'Yes',
      successMsg: 'Order Accepted Successfully.',
    }).then((res) => {
      if (res.isConfirmed) {
        axiosClient
          .post('/riderAcceptOrder', { order_trans_id: orderTransId })
          .then((resp) => {})
          .catch((e) => console.log(e));
        // fetchNumberOrdersByStatusUser(1);
        // fetchNumberOrdersByStatusUser(2);
        // fetchNumberOrdersByStatusUser(3);
        setRiderTable('/rider');
      }
    });
  }

  function toDeliver(orderTransId) {
    Finalize({
      text: 'To Deliver?',
      confirmButton: 'Yes',
      successMsg: 'Order To Deliver Successfully.',
    }).then((res) => {
      if (res.isConfirmed) {
        axiosClient
          .post('/rider/toDeliver/' + orderTransId)
          .then((resp) => {})
          .catch((e) => console.log(e));
        // fetchNumberOrdersByStatusUser(1);
        // fetchNumberOrdersByStatusUser(2);
        // fetchNumberOrdersByStatusUser(3);
        setRiderDeliveryTable('/rider/toPickUp');
      }
    });
  }

  function setRiderTable(url) {
    setBody([]);
    setLoading(true);
    axiosClient.get(url).then((resp) => {
      const ordersRider = resp.data.map((order, i) => {
        return {
          id: i + 1,
          order_number: order.order_number,
          seller_name: (
            <div
              key={order.order_trans_id}
              className='d-flex'
              style={{ columnGap: '10px' }}
            >
              <img
                src={PUBLIC_PATH + 'images/' + order.buyer.prof_img}
                className='rounded-circle pr-5'
                style={{ width: '50px', height: '50px' }}
              />
              <div>
                <p className='mb-0'>
                  {order.buyer.first_name}{' '}
                  {order.buyer.user_details.middle_name
                    ? order.buyer.user_details.middle_name[0]
                    : ''}
                  {'. '}
                  {order.buyer.user_details
                    ? order.buyer.user_details.last_name
                    : ' '}{' '}
                  {order.buyer.user_details.ext_name
                    ? order.buyer.user_details.ext_name
                    : ''}
                </p>
              </div>
            </div>
          ),
          contact_number: order.buyer.user_details.contact_number,
          order_status: (
            <span
              className={
                'text-nowrap rounded px-2 text-uppercase border border-2 ' +
                switchColor(order.order_trans_status)
              }
            >
              {status(order.order_trans_status)}
            </span>
          ),
          payment_total_amount: (
            <>
              <img
                src='/images/seashell.png'
                style={{ width: '25px' }}
                className='me-2'
              />{' '}
              {calculateGrandTotalDeliveryFee(
                order.total_amount,
                order.delivery_fee
              )}{' '}
            </>
          ),
          created_at: dateFormat(order.created_at),
          action: (
            <div key={i} className='button-actions text-light d-flex'>
              <Button
                variant='primary'
                onClick={() => {
                  view(order.order_number);
                  setViewOrderBuyerModal(true);
                }}
                style={{ cursor: 'pointer' }}
                className='badge rounded text-bg-primary px-2 me-2'
              >
                View
              </Button>

              {order.order_trans_status === '3' &&
              order.order_trans_status > 0 ? (
                <>
                  <Button
                    variant='success'
                    onClick={() => {
                      accept(order.order_trans_id);
                    }}
                    style={{ cursor: 'pointer' }}
                    className='badge rounded px-2 me-2'
                  >
                    To Pick Up
                  </Button>
                </>
              ) : (
                ''
              )}
            </div>
          ),
        };
      });
      setBody(ordersRider);
      setLoading(false);
    });
  }

  function setRiderDeliveryTable(url) {
    setBody([]);
    setLoading(true);
    axiosClient.get(url).then((resp) => {
      const ordersRider = resp.data.map((order, i) => {
        return {
          id: i + 1,
          order_number: order.order_to_deliver.order_number,
          seller_name: (
            <div
              key={order.order_to_deliver.order_trans_id}
              className='d-flex'
              style={{ columnGap: '10px' }}
            >
              <img
                src={
                  PUBLIC_PATH +
                  'images/' +
                  order.order_to_deliver.buyer.prof_img
                }
                className='rounded-circle pr-5'
                style={{ width: '50px', height: '50px' }}
              />
              <div>
                <p className='mb-0'>
                  {order.order_to_deliver.buyer.first_name}{' '}
                  {order.order_to_deliver.buyer.user_details.middle_name
                    ? order.order_to_deliver.buyer.user_details.middle_name[0]
                    : ''}
                  {'. '}
                  {order.order_to_deliver.buyer.user_details
                    ? order.order_to_deliver.buyer.user_details.last_name
                    : ' '}{' '}
                  {order.order_to_deliver.buyer.user_details.ext_name
                    ? order.order_to_deliver.buyer.user_details.ext_name
                    : ''}
                </p>
              </div>
            </div>
          ),
          contact_number:
            order.order_to_deliver.buyer.user_details.contact_number,
          order_status: (
            <span
              className={
                'text-nowrap rounded px-2 text-uppercase border border-2 ' +
                switchColor(order.order_to_deliver.order_trans_status)
              }
            >
              {status(order.order_to_deliver.order_trans_status)}
            </span>
          ),
          payment_total_amount: (
            <>
              <img
                src='/images/seashell.png'
                style={{ width: '25px' }}
                className='me-2'
              />{' '}
              {calculateGrandTotalDeliveryFee(
                order.order_to_deliver.total_amount,
                order.order_to_deliver.delivery_fee
              )}{' '}
            </>
          ),
          created_at: dateFormat(order.order_to_deliver.created_at),
          action: (
            <div key={i} className='button-actions text-light d-flex'>
              <Button
                variant='primary'
                onClick={() => {
                  view(order.order_to_deliver.order_number);
                  setViewOrderBuyerModal(true);
                }}
                style={{ cursor: 'pointer' }}
                className='badge rounded text-bg-primary px-2 me-2'
              >
                View
              </Button>

              {order.order_to_deliver.order_trans_status === '3' &&
              order.order_to_deliver.order_trans_status > 0 ? (
                <>
                  <Button
                    variant='success'
                    onClick={() => {
                      accept(order.order_to_deliver.order_trans_id);
                    }}
                    style={{ cursor: 'pointer' }}
                    className='badge rounded px-2 me-2'
                  >
                    To Pick Up
                  </Button>
                </>
              ) : (
                ''
              )}

              {order.delivery_status === '1' && order.delivery_status > 0 ? (
                <>
                  <Button
                    variant='success'
                    onClick={() => {
                      toDeliver(order.id);
                    }}
                    style={{ cursor: 'pointer' }}
                    className='badge rounded px-2 me-2'
                  >
                    To Deliver
                  </Button>
                </>
              ) : (
                ''
              )}
            </div>
          ),
        };
      });
      setBody(ordersRider);
      setLoading(false);
    });
  }

  useEffect(() => {
    setRiderTable('/rider');
  }, []);

  return (
    <>
      {/* <Header>
        {' '}
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
              />
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
      </Header> */}

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
              component={<Link to='/rider/home' />}
            >
              <FontAwesomeIcon icon={faHouse} className='navs-icon' />
              Home
            </MenuItem>
            <SubMenu label='Transactions'>
              <MenuItem component={<Link to='/withdraw' />}>
                <FontAwesomeIcon icon={faInbox} className='navs-icon' />
                Withdraw
              </MenuItem>
            </SubMenu>
            <MenuItem
              className='text-black '
              onClick={() => {
                logout();
              }}
              // icon={<FaHouse />}
            >
              Logout
            </MenuItem>
          </Menu>
        </Sidebar>
        <main className='w-100' style={{ minHeight: '815px' }}>
          <button className='btn btn-dark' to={'/recharge'}>
            Withdraw
          </button>
          <div className='mx-auto w-75 mb-5'>
            <div className='d-flex mx-auto justify-content-center'>
              <div className='flex-grow-1 me-4'>
                <Card className='rounded overflow-hidden'>
                  <Card.Body className='bg-primary'>
                    <p className='text-white'>Information</p>
                    <hr />
                    <p className='small text-white'>Total Deliver</p>
                    <div className='small text-white'>
                      <i className='fas fa-angle-right'></i>
                    </div>
                  </Card.Body>
                </Card>
              </div>
              <div className='flex-grow-1 me-4'>
                <Card className='rounded overflow-hidden'>
                  <Card.Body className='bg-warning '>
                    <p className='text-white'>Information</p>
                    <hr />
                    <p className='small text-white  '>Total Cancel</p>
                    <div className='small text-white'>
                      <i className='fas fa-angle-right'></i>
                    </div>
                  </Card.Body>
                </Card>
              </div>
              <div className='flex-grow-1'>
                <Card className='rounded overflow-hidden'>
                  <Card.Body className='bg-success '>
                    <p className='text-white'>Information</p>
                    <hr />
                    <p className='small text-white  '>Total Wallet Balance</p>
                    <div className='small text-white'>
                      <i className='fas fa-angle-right'></i>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
          <Card className='mx-auto w-75 mb-5 p-5'>
            <h1 className='fw-bold mb-4'>To Pick Up</h1>
            <Card className='d-flex flex-row w-50 p-4'>
              <div className='d-flex justify-content-between w-100 align-items-center'>
                <div className='d-flex justify-content-between'>
                  <div className='d-flex flex-column me-3'>
                    <FontAwesomeIcon
                      icon={faCircleDot}
                      className='mb-1 text-success'
                    />
                    <FontAwesomeIcon
                      icon={faEllipsisVertical}
                      className='text-success mb-0'
                    />
                    <FontAwesomeIcon
                      icon={faEllipsisVertical}
                      className='mb-1 text-success'
                    />
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className='text-success'
                    />
                  </div>
                  {console.log(viewOrders)}
                  <div className='mt-2'>
                    <h4 className='mb-0'>{'Na'}</h4>
                    <p>{'Description'}</p>
                  </div>
                </div>
                <div className='d-flex justify-content-center'>
                  <Button
                    variant='primary'
                    className='me-2 rounded btn'
                    onClick={() => handleEditShow(item.id)}
                  >
                    Accept
                  </Button>
                  <Button
                    variant={'danger'}
                    onClick={() => {}}
                    className='me-2 rounded'
                  >
                    Decline
                  </Button>
                </div>
              </div>
            </Card>
          </Card>
        </main>
        {/* <Footer /> */}
      </div>
    </>
  );
};
