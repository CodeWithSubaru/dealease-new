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

export function OrdersTable(props) {
  const [body, setBody] = useState([]);
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
        setUserOrdersTable('/orders/orders-user/seller', 2);
      }
    });
  }

  function decline(id) {}

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
        setUserOrdersTable('/orders/orders-user/buyer', 1);
      }
    });
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
                  <Button
                    variant='danger'
                    onClick={() => cancel(order.order_id)}
                    style={{ cursor: 'pointer' }}
                    className='p-2 2 rounded'
                  >
                    <FontAwesomeIcon icon={faClose} className='mx-2' />
                  </Button>
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

  function fetchNumberOrdersByStatus() {
    axiosClient
      .get('/orders/order-status/' + 1)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    fetchNumberOrdersByStatus();
    setUserOrdersTable('/orders/orders-user/buyer/1', 1);
  }, []);

  return (
    <>
      <div className='mx-auto w-75' style={{ minHeight: '85vh' }}>
        <Card className='p-5 h-100 mb-5'>
          <Tab.Container id='left-tabs-example' defaultActiveKey='first'>
            <Nav justify variant='tabs' defaultActiveKey='/home'>
              <Nav.Item>
                <Nav.Link
                  eventKey='first'
                  onClick={() =>
                    setUserOrdersTable('/orders/orders-user/buyer/1', 1)
                  }
                >
                  My Pending Orders (Buyer)
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey='second'
                  onClick={() =>
                    setUserOrdersTable('/orders/orders-user/buyer/2', 1)
                  }
                >
                  My Processing Orders (Buyer)
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  eventKey='third'
                  onClick={() =>
                    setUserOrdersTable('/orders/orders-user/buyer/3', 1)
                  }
                >
                  My Delivered Orders (Buyer)
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
                    Pending Orders (Seller)
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
                    <h1 className='mb-4'>Pending Orders</h1>
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
