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
import { Load } from '../../Components/Loader/Load';

export const DeliveredRider = () => {
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
      .get('/rider/delivered')
      .then((res) => {
        setBody(res.data);
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

  function closeViewOrderProduct() {
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
        // setRiderTable('/rider');
      }
    });
  }

  function delivered(orderTransId) {
    Finalize({
      text: 'Change status to Delivered?',
      confirmButton: 'Yes',
      successMsg: 'Status Changed to Delivered Successfully.',
    }).then((res) => {
      if (res.isConfirmed) {
        axiosClient
          .post('/rider/delivered/' + orderTransId)
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
      setBody(resp.data);
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
    setRiderTable('/rider/delivered');
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
            <MenuItem
              className='text-black '
              // icon={<FaHouse />}
              component={<Link to='/rider/to-deliver' />}
            >
              <FontAwesomeIcon icon={faHouse} className='navs-icon' />
              To Deliver
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
        <Modal
          size='lg'
          show={viewOrderBuyerModal}
          onHide={closeViewOrderProduct}
          animation={true}
          aria-labelledby='contained-modal-title-vcenter'
          scrollable
        >
          <Modal.Header closeButton>
            <Modal.Title id='contained-modal-title-vcenter'>
              #{viewOrders[0] ? viewOrders[0].order_number : 'Loading...'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {viewOrders.length > 0
              ? viewOrders.map((order, index) => {
                  return (
                    <>
                      <p className='fw-bold fs-5 mb-2'>
                        <b> Product No. {index + 1} </b>
                      </p>
                      <div className='d-flex'>
                        <div className='w-50 me-5'>
                          <p>
                            <span className='d-block fw-bold text-secondary'>
                              Product Name:
                            </span>{' '}
                            {order.product.title}
                          </p>
                          <p>
                            {' '}
                            <span className='d-block fw-bold text-secondary'>
                              Product Description:
                            </span>{' '}
                            {order.product.description}
                          </p>
                          <p>
                            <span className='d-block fw-bold text-secondary'>
                              Seller:
                            </span>{' '}
                            {order.product.user.first_name}{' '}
                            {order.product.user.user_details.middle_name
                              ? order.product.user.user_details.middle_name[0] +
                                '. '
                              : ''}
                            {order.product.user.user_details.last_name}{' '}
                            {order.product.user.user_details.ext_name
                              ? order.product.user.user_details.ext_name
                              : ''}{' '}
                          </p>
                        </div>
                        <div>
                          <p>
                            {' '}
                            <span className='d-block fw-bold text-secondary'>
                              Status:
                            </span>{' '}
                            {status(order.order_trans_status)}
                          </p>
                          <p>
                            {' '}
                            <span className='d-block fw-bold text-secondary'>
                              Quantity:
                            </span>{' '}
                            {order.weight} kg
                          </p>
                          <p>
                            <span className='d-block fw-bold text-secondary'>
                              Total Price:
                            </span>{' '}
                            <span className='d-flex'>
                              {' '}
                              <img
                                src='/images/seashell.png'
                                className='me-2'
                                style={{ height: '20px' }}
                              />{' '}
                              {order.total_price}
                            </span>
                          </p>
                          <p>
                            {' '}
                            <span className='d-block fw-bold text-secondary'>
                              Shipping Information:
                            </span>{' '}
                            <span className='fw-semibold'>Address: </span>
                            {order.barangay
                              ? order.street
                              : user.user_details.street}{' '}
                            {order.barangay
                              ? order.barangay
                              : user.user_details.barangay}{' '}
                            {order.city ? order.city : ''}{' '}
                            {'Bulacan Region III (Central Luzon)'}
                          </p>
                        </div>
                      </div>
                    </>
                  );
                })
              : 'Loading...'}
            <hr />
            <div className='d-flex'>
              <div className='w-50 me-5'></div>
              <div className='me-5'>
                <p className='d-flex'>
                  <span className='fw-bold text-secondary'>Delivery Fee:</span>{' '}
                  <span className='d-flex'>
                    {' '}
                    <img
                      src='/images/seashell.png'
                      className='ms-4 me-2'
                      style={{ height: '20px' }}
                    />{' '}
                    {viewOrders[0] ? viewOrders[0].delivery_fee : ''}
                  </span>
                </p>
                <h5 className='d-flex align-items-center justify-content-end'>
                  <span className='me-2 fw-bold'> Grand Total: </span>{' '}
                  <img
                    src='/images/seashell.png'
                    className='me-2'
                    style={{ height: '30px' }}
                  />{' '}
                  {viewOrders.length > 0
                    ? calculateGrandTotalPrice(viewOrders)
                    : '(Calculating...)'}
                </h5>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={closeViewOrderProduct} className='rounded'>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

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
                  <Card.Body className='bg-success'>
                    <p className='text-white'>Information</p>
                    <hr />
                    <p className='small text-white'>Total Wallet Balance</p>
                    <div className='small text-white'>
                      <i className='fas fa-angle-right'></i>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>

          <Card className='mx-auto w-75 mb-5 p-5'>
            <h1 className='fw-bold mb-4'>Delivered</h1>
            {/* Card  */}

            <div className='d-flex flex-wrap justify-content-start'>
              {loading ? (
                <div className='d-flex justify-content-center flex-grow-1'>
                  <Load />
                </div>
              ) : (
                body.length > 0 &&
                body.map((item) =>
                  item ? (
                    <Card className='d-flex p-4 m-1' style={{ width: '48%' }}>
                      <div
                        className={
                          'd-flex justify-content-between w-100 align-items-center align-items-center'
                        }
                      >
                        <div className='d-flex flex-grow-1 me-4'>
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

                          {/* delivered / receiver action button */}

                          <div className='w-100 mt-2'>
                            <div className='d-flex flex-column'>
                              <small className='fs-6 text-secondary'>
                                # {item.order_to_deliver.order_number}
                              </small>
                              <h4 className='mb-3'>
                                {item.order_to_deliver.order.product.title}
                              </h4>
                            </div>
                            <div className='text-end'>
                              <div className='d-flex justify-content-between'>
                                <span> Delivery Fee</span>{' '}
                                <span className='d-flex justify-content-center'>
                                  <img
                                    src='/images/seashell.png'
                                    style={{ height: '20px' }}
                                    className='me-1'
                                  />{' '}
                                  {item.order_to_deliver.delivery_fee}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='d-flex justify-content-center'>
                          <Button
                            variant='primary'
                            onClick={() => {
                              view(item.order_to_deliver.order_number);
                              setViewOrderBuyerModal(true);
                            }}
                            style={{ cursor: 'pointer' }}
                            className='badge rounded px-2 me-2'
                          >
                            View
                          </Button>
                          <Button
                            variant='danger'
                            onClick={() => {
                              view(item.order_to_deliver.order_number);
                              setViewOrderBuyerModal(true);
                            }}
                            style={{ cursor: 'pointer' }}
                            className='badge rounded text-bg-primary px-2 me-2'
                          >
                            Return
                          </Button>
                          {item.delivery_status === '3' ? (
                            <span className='text-warning'>Success</span>
                          ) : (
                            <span className='text-danger'>Failed</span>
                          )}
                        </div>
                      </div>
                    </Card>
                  ) : (
                    'No Items Found'
                  )
                )
              )}
            </div>
          </Card>
        </main>
        {/* <Footer /> */}
      </div>
    </>
  );
};
