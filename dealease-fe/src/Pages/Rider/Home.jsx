// import { Adsense } from '@ctrl/react-adsense';
import React, { useState, useEffect } from 'react';
import useAuthContext from '../../Hooks/Context/AuthContext';
import { Ridertransaction } from '../../Components/Pages/Ridertransaction';
import { Footer } from '../../Components/Footer/Footer';
import { SidebarRider } from '../../Components/Sidebar/Sidebar';
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
import { useNavigate } from 'react-router-dom';

export const HomeRider = () => {
  const [body, setBody] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewOrderBuyerModal, setViewOrderBuyerModal] = useState(false);
  const [viewOrders, setViewOrders] = useState([]);
  const [toPickUpData, setToPickUpData] = useState([]);
  const [toDeliveredData, setDeliveredData] = useState([]);
  const [isDisabled, setDisabled] = useState(true);
  const navigate = useNavigate();

  const { user, setEmailVerified, setRegistrationSuccess, logout } =
    useAuthContext();
  const { collapseSidebar } = useProSidebar();

  const handleLogout = () => {
    logout();
  };

  if (toPickUpData.length > 0) {
    navigate('/rider/to-deliver');
  }

  useEffect(() => {
    axiosClient
      .get('/rider')
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
          .then((resp) => {
            navigate('/rider/to-deliver');
          })
          .catch((e) => console.log(e));
        // fetchNumberOrdersByStatusUser(1);
        // fetchNumberOrdersByStatusUser(2);
        // fetchNumberOrdersByStatusUser(3);
      }
    });
  }

  function toPickUp(url) {
    setBody([]);
    setLoading(true);
    axiosClient.get(url).then((resp) => {
      setToPickUpData(resp.data);
      setDisabled(false);
      setLoading(false);
    });
  }

  function delivered(url) {
    setBody([]);
    setLoading(true);
    axiosClient.get(url).then((resp) => {
      setToPickUpData(resp.data);
      setDisabled(false);
      setLoading(false);
    });
  }

  useEffect(() => {
    toPickUp('/rider/onGoingOrders');
  }, []);

  return (
    <>
      <div style={{ display: 'flex', height: '100%' }}>
        <SidebarRider />
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
                    <table>
                      <tr>
                        <td className='fw-bold fs-5 mb-2'>
                          <b> Product No. {index + 1} </b>
                        </td>
                      </tr>

                      <tr>
                        <td className='fw-bold text-secondary w-25'> Name </td>
                        <td className='fw-bold text-secondary text-center'>
                          {' '}
                          Weight{' '}
                        </td>
                        <td className='fw-bold text-secondary text-end'>
                          Price
                        </td>
                      </tr>

                      <tr>
                        <td className='d-flex ms-3'>{order.product.title}</td>
                        <td className='text-center'>{order.weight} kg</td>
                        <td className='text-end'>-</td>
                      </tr>

                      <br />
                      <tr>
                        <td className='fw-bold text-secondary w-25'>
                          Seller Name{' '}
                        </td>
                        <td className='fw-bold text-secondary text-center'>
                          {' '}
                          Contact #{' '}
                        </td>
                        <td className='text-end'>-</td>
                      </tr>

                      <tr>
                        <td className='d-flex ms-3'>
                          {order.product.user.first_name}{' '}
                          {order.product.user.user_details.middle_name
                            ? order.product.user.user_details.middle_name[0] +
                              '. '
                            : ''}
                          {order.product.user.user_details.last_name
                            ? order.product.user.user_details.last_name
                            : ''}{' '}
                          {order.product.user.user_details.ext_name
                            ? order.product.user.user_details.ext_name
                            : ''}
                        </td>
                        <td className='text-center'>
                          {order.product.user.user_details.contact_number}
                        </td>
                        <td className='text-end'>-</td>
                      </tr>

                      <br />

                      <tr>
                        <td className='fw-bold text-secondary w-25'>
                          Buyer Name{' '}
                        </td>
                        <td className='fw-bold text-secondary text-center'>
                          {' '}
                          Contact #{' '}
                        </td>
                        <td className='text-end'>-</td>
                      </tr>

                      <tr>
                        <td className='d-flex ms-3'>
                          {order.order_by.first_name}{' '}
                          {order.order_by.user_details.middle_name
                            ? order.order_by.user_details.middle_name[0] + '. '
                            : ''}{' '}
                          {order.order_by.user_details.last_name
                            ? order.order_by.user_details.last_name
                            : ''}{' '}
                          {order.order_by.user_details.ext_name
                            ? order.order_by.user_details.ext_name
                            : ''}{' '}
                        </td>
                        <td className='text-center'>
                          {order.order_by.user_details.contact_number}
                        </td>
                        <td className='text-end'>-</td>
                      </tr>

                      <br />
                      <tr>
                        <td className='fw-bold text-secondary w-25'>
                          Shipping Info{' '}
                        </td>
                        <td className='text-center'>-</td>
                        <td className='text-end'>-</td>
                      </tr>

                      <tr>
                        <td className='d-flex ms-3'>
                          {order.delivery_address_id
                            ? order.delivery_address.street +
                              ' ' +
                              order.delivery_address.barangay
                            : order.order_by.user_details.street +
                              ' ' +
                              order.order_by.user_details.barangay}
                        </td>
                        <td className='text-center'>-</td>
                        <td className='text-end'>-</td>
                      </tr>
                    </table>
                  );
                })
              : 'Loading...'}
            <hr />
            <div className='d-flex flex-grow-1 '>
              <div className='w-50'></div>
              <div className='flex-grow-1 d-flex justify-content-end'>
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
                    <p className='small text-white'>Total Cancel</p>
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
            <h1 className='fw-bold mb-4'>To Pick Up</h1>
            {/* Card  */}

            {user.verified_user == 0 ? (
              'Once your account has been verified, you will receive orders to pick up.'
            ) : (
              <div className='d-flex flex-wrap justify-content-start'>
                {loading ? (
                  <div className='d-flex justify-content-center flex-grow-1'>
                    <Load />
                  </div>
                ) : body.length > 0 ? (
                  body.map((item) => (
                    <Card
                      className='d-flex p-4 m-1 border border-1 border-dark-subtle'
                      style={{ width: '48%' }}
                    >
                      <div
                        className={
                          'd-flex justify-content-between w-100 align-items-center align-items-center' +
                          (item.order_trans_status === '4' &&
                            'position-relative')
                        }
                        style={{
                          opacity:
                            item.order_trans_status === '4' ? '0.5' : '1',
                        }}
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

                          {/* To Pick up action */}
                          {
                            <div className='w-100 mt-2'>
                              <div className='d-flex flex-column'>
                                <small className='fs-6 text-secondary'>
                                  # {item.order_number}
                                </small>
                                <h4 className='mb-3'>
                                  {item.order.product.title}
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
                                    {item.delivery_fee}
                                  </span>
                                </div>
                              </div>
                            </div>
                          }

                          {/* To Deliver action */}
                          {/* {item.order_trans_status === '4' && (
                          <div className='w-100 mt-2'>
                            <div className='d-flex flex-column'>
                              <small className='fs-6 text-secondary'>
                                # {item.order_number}
                              </small>
                              <h4 className='mb-3'>
                                {item.order.product.title}
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
                                  {item.delivery_fee}
                                </span>
                              </div>
                            </div>
                          </div>
                        )} */}
                          {/* delivered / receiver action button */}
                          {/* {item.order_trans_status === '5' && (
                          <div className='w-100 mt-2'>
                            <div className='d-flex flex-column'>
                              <small className='fs-6 text-secondary'>
                                # {item.order_number}
                              </small>
                              <h4 className='mb-3'>
                                {item.order.product.title}
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
                                  {item.delivery_fee}
                                </span>
                              </div>
                            </div>
                          </div>
                        )} */}
                        </div>
                        <div className='d-flex justify-content-center'>
                          <Button
                            variant='primary'
                            onClick={() => {
                              view(item.order_number);
                              setViewOrderBuyerModal(true);
                            }}
                            style={{ cursor: 'pointer' }}
                            className='badge rounded text-bg-primary px-2 me-2'
                          >
                            View
                          </Button>

                          {item.order_trans_status === '3' ? (
                            <>
                              <Button
                                variant='success'
                                onClick={() => {
                                  accept(item.order_trans_id);
                                }}
                                style={{ cursor: 'pointer' }}
                                className='badge rounded px-2'
                              >
                                Accept
                              </Button>
                            </>
                          ) : (
                            ''
                          )}
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className='text-center w-100'>
                    {' '}
                    <span> No Orders Found </span>{' '}
                  </div>
                )}
              </div>
            )}
          </Card>
        </main>
        {/* <Footer /> */}
      </div>
    </>
  );
};
