import { useState, useEffect } from 'react';
import { TableComponent } from '../Table/Table';
import { Footer } from '../Footer/Footer';
import Card from 'react-bootstrap/Card';
import { Nav, Tab, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axiosClient from '../../api/axios';
import PUBLIC_URL from '../../api/public_url';
import { faCheck, faClose } from '@fortawesome/free-solid-svg-icons';
import { Finalize } from '../Notification/Notification';
import useAuthContext from '../../Hooks/Context/AuthContext';
import Modal from 'react-bootstrap/Modal';

export function OrdersTable(props) {
  const [body, setBody] = useState([]);
  const [pendingOrderNumber, setPendingOrderNumber] = useState(0);
  const [processingOrderNumber, setProcessingOrderNumber] = useState(0);
  const [deliveredOrderNumber, setDeliveredOrderNumber] = useState(0);
  const [pendingOrderNumberSeller, setPendingOrderNumberSeller] = useState(0);
  const [viewOrderProduct, setViewOrderProduct] = useState(false);
  const [viewOrders, setViewOrders] = useState([]);
  const { user } = useAuthContext();

  const header = [
    {
      title: 'Id',
      prop: 'payment_number',
      isSortable: true,
    },
    {
      title: 'Full Name',
      prop: 'fullname',
    },
    {
      title: 'Product',
      prop: 'title',
    },
    {
      title: 'Stocks',
      prop: 'stocks',
    },
    {
      title: 'Weight',
      prop: 'weight',
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

  function status(status) {
    if (status === '1') {
      return 'Pending';
    }
    if (status === '2') {
      return 'Processing';
    }
    if (status === '3') {
      return 'Delivered';
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
  }

  function accept(id) {
    Finalize({
      text: 'You want accept this order request',
      confirmButton: 'Yes',
      successMsg: 'Order Accepted Successfully.',
    }).then((res) => {
      if (res.isConfirmed) {
        axiosClient
          .put('/orders/' + id, { status: 2 })
          .then((resp) => console.log(resp))
          .catch((e) => console.log(e));
        setUserOrdersTable('/orders/orders-user/seller/1', 2);
      }
    });
  }

  function closeViewOrderProduct() {
    setViewOrderProduct(false);
  }

  function view(orderNumber) {
    axiosClient
      .get('/orders/' + orderNumber)
      .then((res) => setViewOrders(res.data))
      .catch((e) => console.log(e));
  }

  function cancel(id) {
    Finalize({
      text: 'You want decline this order request',
      confirmButton: 'Yes',
      successMsg: 'Order Declined Successfully.',
    }).then((res) => {
      if (res.isConfirmed) {
        axiosClient
          .put('/orders/' + id, { status: 0 })
          .then((resp) => console.log(resp))
          .catch((e) => console.log(e));
        setUserOrdersTable('/orders/orders-user/buyer/1', 1);
      }
    });
  }
  function calculateGrandTotalPrice(orders) {
    let totalPrice = 0;

    Object.values(orders).forEach((orderItem) => {
      totalPrice += Number(orderItem.total_price);
    });
    return Number(totalPrice).toLocaleString('en-US');
  }

  function setUserOrdersTable(url, set) {
    axiosClient.get(url).then((resp) => {
      let orders;
      if (set == 1) {
        console.log(resp);
        orders = resp.data.map((order, i) => {
          return {
            payment_number: i + 1,
            fullname: (
              <div key={i} className='d-flex' style={{ columnGap: '10px' }}>
                <img
                  src={PUBLIC_URL + 'images/' + order.order_by.prof_img}
                  className='rounded-circle pr-5'
                  style={{ width: '50px', height: '50px' }}
                />
                <div>
                  <p className='mb-0'>
                    {order.order_by.first_name}{' '}
                    {order.order_by.user_details
                      ? order.order_by.user_details.middle_name[0]
                      : ''}
                    {'. '}
                    {order.order_by.user_details
                      ? order.order_by.user_details.last_name
                      : ' '}{' '}
                    {order.order_by.user_details
                      ? order.order_by.user_details.ext_name
                      : ''}
                  </p>
                </div>
              </div>
            ),
            title: order.product.title,
            weight: order.weight,
            stocks: order.product.stocks_per_kg,
            order_status: (
              <span
                className={
                  'rounded px-2 text-uppercase border border-2 ' +
                  switchColor(order.order_status)
                }
              >
                {status(order.order_status)}
              </span>
            ),
            payment_total_amount: 'Php ' + order.total_price,
            created_at: dateFormat(order.created_at),
            action: (
              <div key={i} className='button-actions text-light d-flex'>
                {order.order_status === '1' ? (
                  <>
                    <Button
                      variant='primary'
                      onClick={() => {
                        view(order.order_number);
                        setViewOrderProduct(true);
                      }}
                      style={{ cursor: 'pointer' }}
                      className='badge rounded text-bg-primary px-2 me-2'
                    >
                      View
                    </Button>

                    <Button
                      variant='danger'
                      onClick={() => cancel(order.order_id)}
                      style={{ cursor: 'pointer' }}
                      className='badge rounded text-bg-danger px-2'
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  ''
                )}
              </div>
            ),
          };
        });
      } else {
        orders = resp.data.map((order, i) => {
          console.log(order);
          return {
            payment_number: i + 1,
            fullname: (
              <div key={i} className='d-flex' style={{ columnGap: '10px' }}>
                <img
                  src={PUBLIC_URL + 'images/' + order.order_by.prof_img}
                  className='rounded-circle pr-5'
                  style={{ width: '50px', height: '50px' }}
                />
                <div>
                  <p className='mb-0'>
                    {order.order_by.first_name}{' '}
                    {order.order_by.user_details
                      ? order.order_by.user_details.middle_name[0]
                      : ''}
                    {'. '}
                    {order.order_by.user_details
                      ? order.order_by.user_details.last_name
                      : ' '}{' '}
                    {order.order_by.user_details
                      ? order.order_by.user_details.ext_name
                      : ''}
                  </p>
                </div>
              </div>
            ),
            title: order.product.title,
            weight: order.weight,
            stocks: order.product.stocks_per_kg,
            order_status: (
              <span className='border border-2 border-warning rounded px-2 text-uppercase bg-warning bg-opacity-75 text-light'>
                {status(order.order_status)}
              </span>
            ),
            payment_total_amount: 'Php ' + order.total_price,
            created_at: dateFormat(order.created_at),
            action: (
              <div key={i} className='button-actions text-light d-flex'>
                <Button
                  variant='primary'
                  onClick={() => accept(order.order_id)}
                  style={{ cursor: 'pointer' }}
                  className='p-2 me-2 rounded'
                >
                  <FontAwesomeIcon icon={faCheck} className='mx-2' />
                </Button>
                {/* <Button
                  variant='danger'
                  onClick={() => decline(order.order_id)}
                  style={{ cursor: 'pointer' }}
                  className='p-2 2 rounded'
                >
                  <FontAwesomeIcon icon={faClose} className='mx-2' />
                </Button> */}
              </div>
            ),
          };
        });
      }
      setBody(orders);
    });
  }

  function fetchNumberOrdersByStatusBuyer(orderStatus) {
    axiosClient
      .get('/orders/order-status/buyer/' + orderStatus)
      .then((res) => {
        if (orderStatus === 1) {
          setPendingOrderNumber(res.data);
        } else if (orderStatus === 2) {
          setProcessingOrderNumber(res.data);
        } else if (orderStatus === 3) {
          setDeliveredOrderNumber(res.data);
        }
      })
      .catch((error) => console.log(error));
  }

  function fetchNumberOrdersByStatusSeller(orderStatus) {
    axiosClient
      .get('/orders/order-status/seller/' + orderStatus)
      .then((res) => {
        if (orderStatus === 1) {
          setPendingOrderNumberSeller(res.data);
        } else if (orderStatus === 2) {
          // setProcessingOrderNumberSeller(res.data);
        } else if (orderStatus === 3) {
          // setDeliveredOrderNumberSeller(res.data);
        }
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    fetchNumberOrdersByStatusBuyer(1);
    fetchNumberOrdersByStatusBuyer(2);
    fetchNumberOrdersByStatusBuyer(3);
    fetchNumberOrdersByStatusSeller(1);
    setUserOrdersTable('/orders/orders-user/buyer/1', 1);
  }, []);

  return (
    <>
      <div className='mx-auto w-75' style={{ minHeight: '85vh' }}>
        <Modal
          size='lg'
          show={viewOrderProduct}
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
                      <div>
                        <p>
                          <b> Product No. {index + 1} </b>
                        </p>
                        <p>Product Name: {order.product.title}</p>
                        <p>Product Description: {order.product.description}</p>
                        <p>Product Seller: {order.product.user_id}</p>
                        <p>Status: {status(order.order_status)}</p>
                        <p>Quantity: {order.product.weight} kg</p>
                        <p>
                          Total Price: <b>Php {order.total_price}</b>
                        </p>
                        {viewOrders.length > 1 && <hr />}
                      </div>
                    </>
                  );
                })
              : 'Loading...'}
            <h5>Grand Total: Php {calculateGrandTotalPrice(viewOrders)}</h5>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={closeViewOrderProduct}>Close</Button>
          </Modal.Footer>
        </Modal>

        <Card className='p-5 h-100 mb-5'>
          <Tab.Container id='left-tabs-example' defaultActiveKey='first'>
            <Nav justify variant='tabs' defaultActiveKey='/home'>
              <Nav.Item>
                <Nav.Link
                  eventKey='first'
                  onClick={() => {
                    setUserOrdersTable('/orders/orders-user/buyer/1', 1);
                    fetchNumberOrdersByStatusBuyer(1);
                  }}
                >
                  My Pending Orders (Buyer){' '}
                  <span
                    className='badge rounded-pill text-bg-primary position-relative'
                    style={{ top: '-8px', left: '-5px' }}
                  >
                    {pendingOrderNumber}
                  </span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey='second'
                  onClick={() => {
                    setUserOrdersTable('/orders/orders-user/buyer/2', 1);
                    fetchNumberOrdersByStatusBuyer(2);
                  }}
                >
                  My Processing Orders (Buyer){' '}
                  <span
                    className='badge rounded-pill text-bg-primary position-relative'
                    style={{ top: '-8px', left: '-5px' }}
                  >
                    {processingOrderNumber}
                  </span>
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  eventKey='third'
                  onClick={() => {
                    setUserOrdersTable('/orders/orders-user/buyer/3', 1);
                    fetchNumberOrdersByStatusBuyer(3);
                  }}
                >
                  My Delivered Orders (Buyer){' '}
                  <span
                    className='badge rounded-pill text-bg-primary position-relative'
                    style={{ top: '-8px', left: '-5px' }}
                  >
                    {deliveredOrderNumber}
                  </span>
                </Nav.Link>
              </Nav.Item>
              {user.verified_user == 1 && (
                <Nav.Item>
                  <Nav.Link
                    eventKey='fourth'
                    onClick={() =>
                      setUserOrdersTable('/orders/orders-user/seller/1', 2)
                    }
                  >
                    Pending Orders (Seller){' '}
                    <span
                      className='badge rounded-pill text-bg-primary position-relative'
                      style={{ top: '-8px', left: '-5px' }}
                    >
                      {pendingOrderNumberSeller}
                    </span>
                  </Nav.Link>
                </Nav.Item>
              )}
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey='first'>
                <Card className='p-5 pb-1 rounded'>
                  <h1 className='mb-4'>My Pending Orders</h1>
                  <TableComponent header={header} body={body} />;
                </Card>
              </Tab.Pane>
              <Tab.Pane eventKey='second'>
                <Card className='p-5 pb-1 rounded'>
                  <h1 className='mb-4'>My Processing Orders</h1>
                  <TableComponent header={header} body={body} />;
                </Card>
              </Tab.Pane>

              <Tab.Pane eventKey='third'>
                <Card className='p-5 pb-1 rounded'>
                  <h1 className='mb-4'>My Delivered Orders</h1>
                  <TableComponent header={header} body={body} />;
                </Card>
              </Tab.Pane>
              {user.verified_user == 1 && (
                <Tab.Pane eventKey='fourth'>
                  <Card className='p-5 pb-1 rounded'>
                    <h1 className='mb-4'>My Pending Orders</h1>
                    <TableComponent header={header} body={body} />;
                  </Card>
                </Tab.Pane>
              )}
            </Tab.Content>
          </Tab.Container>
        </Card>
      </div>
      <Footer />
    </>
  );
}
