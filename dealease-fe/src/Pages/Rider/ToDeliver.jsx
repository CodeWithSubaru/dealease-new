// import { Adsense } from '@ctrl/react-adsense';
import { SidebarRider } from '../../Components/Sidebar/Sidebar';
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
import { useNavigate } from 'react-router-dom';

export const ToDeliverRider = () => {
  const [body, setBody] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewOrderBuyerModal, setViewOrderBuyerModal] = useState(false);
  const [viewOrders, setViewOrders] = useState([]);
  const [isDisabled, setDisabled] = useState(true);
  const navigate = useNavigate();

  const { user, setEmailVerified, setRegistrationSuccess, logout } =
    useAuthContext();
  const { collapseSidebar } = useProSidebar();

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
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
        setRiderTable('/rider/toPickUp');
      }
    });
  }

  function toDeliver(orderTransId) {
    Finalize({
      text: 'Are you sure you want change status To Deliver Status?',
      confirmButton: 'Yes',
      successMsg: 'Order changed status To Deliver Successfully.',
    }).then((res) => {
      if (res.isConfirmed) {
        axiosClient
          .post('/rider/toDeliver/' + orderTransId)
          .then((resp) => {
            setRiderTable('/rider/onGoingOrders');
          })
          .catch((e) => console.log(e));
        // fetchNumberOrdersByStatusUser(1);
        // fetchNumberOrdersByStatusUser(2);
        // fetchNumberOrdersByStatusUser(3);
        // setRiderDeliveryTable('');
      }
    });
  }

  function delivered(orderTransId) {
    Finalize({
      text: 'You want to change status to delivered?',
      confirmButton: 'Yes',
      successMsg: 'Updated to Delivered Status Successfully.',
    }).then((res) => {
      if (res.isConfirmed) {
        axiosClient
          .post('/rider/delivered/' + orderTransId)
          .then((resp) => {
            navigate('/rider/delivered');
          })
          .catch((e) => console.log(e));
        // fetchNumberOrdersByStatusUser(1);
        // fetchNumberOrdersByStatusUser(2);
        // fetchNumberOrdersByStatusUser(3);
      }
    });
  }

  function returnItem(orderTransId) {
    Finalize({
      text: 'You want to change status to Return Item?',
      confirmButton: 'Yes',
      successMsg: 'Updated to Return Item Status Successfully.',
    }).then((res) => {
      if (res.isConfirmed) {
        axiosClient
          .post('/rider/returnItem/' + orderTransId)
          .then((resp) => {
            setRiderTable('/rider/onGoingOrders');
          })
          .catch((e) => console.log(e));
        // fetchNumberOrdersByStatusUser(1);
        // fetchNumberOrdersByStatusUser(2);
        // fetchNumberOrdersByStatusUser(3);
      }
    });
  }

  function setRiderTable(url) {
    setBody([]);
    setLoading(true);
    axiosClient.get(url).then((resp) => {
      console.log(resp);
      setBody(resp.data);
      setDisabled(false);
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

              <Button
                variant='success'
                onClick={() => {
                  accept(order.order_to_deliver.order_trans_id);
                }}
                style={{ cursor: 'pointer' }}
                className='badge rounded px-2 me-2'
              >
                To Deliver
              </Button>
            </div>
          ),
        };
      });
      setBody(ordersRider);
      setLoading(false);
    });
  }

  useEffect(() => {
    setRiderTable('/rider/onGoingOrders');
  }, []);

  return (
    <>
      <div style={{ display: 'flex', height: '100%' }}>
        <SidebarRider />
        {/* <MenuItem
              className='text-black '
              onClick={() => {
                logout();
              }}
            >
              Logout
            </MenuItem>
            <MenuItem className='text-black'>
              Wallet{' '}
              {user.wallet.shell_coin_amount
                ? user.wallet.shell_coin_amount
                : ''}
            </MenuItem> */}

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
                            ? ''
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
            <h1 className='fw-bold mb-4'>To Deliver</h1>
            {/* Card  */}

            <div className='d-flex flex-wrap justify-content-start'>
              {loading ? (
                <div className='d-flex justify-content-center flex-grow-1'>
                  <Load />
                </div>
              ) : body.length > 0 ? (
                body.map((item, i) => (
                  <Card
                    className='d-flex p-4 m-1 border border-1 border-black-subtle'
                    style={{ width: '48%' }}
                  >
                    <div
                      className={
                        'd-flex justify-content-between w-100 align-items-center align-items-center'
                      }
                    >
                      <div className='d-flex flex-grow-1 me-4'>
                        {/* Icon */}
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
                        {console.log(item)}
                        {/* To Deliver action */}
                        {
                          <div className='w-100 mt-2' key={i}>
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
                        }
                      </div>

                      <div className='d-flex justify-content-center'>
                        <Button
                          variant='primary'
                          onClick={() => {
                            view(item.order_to_deliver.order_number);
                            setViewOrderBuyerModal(true);
                          }}
                          style={{ cursor: 'pointer' }}
                          className='badge rounded text-bg-primary px-2 me-2'
                        >
                          View
                        </Button>
                        {item.delivery_status === '1' ? (
                          <Button
                            variant='success'
                            onClick={() => {
                              toDeliver(item.deliveries_id);
                            }}
                            style={{ cursor: 'pointer' }}
                            className='badge rounded px-2 me-2'
                          >
                            To Deliver
                          </Button>
                        ) : (
                          ''
                        )}
                        {item.delivery_status === '2' ? (
                          <Button
                            variant='success'
                            onClick={() => {
                              delivered(item.deliveries_id);
                            }}
                            style={{ cursor: 'pointer' }}
                            className='badge rounded px-2 me-2'
                          >
                            Delivered
                          </Button>
                        ) : (
                          ''
                        )}

                        <Button
                          variant='danger'
                          onClick={() => {
                            returnItem(item.deliveries_id);
                          }}
                          style={{ cursor: 'pointer' }}
                          className='badge rounded px-2'
                        >
                          Return
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className='text-center w-100'>
                  {' '}
                  <span> No Items Found </span>{' '}
                </div>
              )}
            </div>
          </Card>
        </main>
        {/* <Footer /> */}
      </div>
    </>
  );
};
