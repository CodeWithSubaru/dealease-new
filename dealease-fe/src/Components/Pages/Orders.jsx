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

export function OrdersTable(props) {
  const [body, setBody] = useState([]);

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
      return 'Accepted';
    }
    return '';
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

  function decline(id) {
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
        setUserOrdersTable('/orders/orders-user/seller', 2);
      }
    });
  }

  function cancel(id) {
    Finalize({
      text: 'You want decline this order request',
      confirmButton: 'Yes',
      successMsg: 'Order Cancelled Successfully.',
    }).then((res) => {
      if (res.isConfirmed) {
        axiosClient
          .put('/orders/' + id, { status: 0 })
          .then((resp) => console.log(resp))
          .catch((e) => console.log(e));
        setUserOrdersTable('/orders/orders-user/seller', 2);
      }
    });
  }

  function setUserOrdersTable(url, set) {
    axiosClient.get(url).then((resp) => {
      let orders;
      if (set == 1) {
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
                  variant='danger'
                  onClick={() => cancel(order.order_id)}
                  style={{ cursor: 'pointer' }}
                  className='p-2 2 rounded'
                >
                  <FontAwesomeIcon icon={faClose} className='mx-2' />
                </Button>
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
                <Button
                  variant='danger'
                  onClick={() => decline(order.order_id)}
                  style={{ cursor: 'pointer' }}
                  className='p-2 2 rounded'
                >
                  <FontAwesomeIcon icon={faClose} className='mx-2' />
                </Button>
              </div>
            ),
          };
        });
      }
      setBody(orders);
    });
  }

  useEffect(() => {
    setUserOrdersTable('/orders/orders-user/buyer', 1);
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
                    setUserOrdersTable('/orders/orders-user/buyer', 1)
                  }
                >
                  Your Orders (Buyer)
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey='second'
                  onClick={() =>
                    setUserOrdersTable('/orders/orders-user/seller', 2)
                  }
                >
                  Pending Orders (Seller)
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey='first'>
                <Card className='p-5 pb-1 rounded'>
                  <h1 className='mb-4'>Orders</h1>
                  <TableComponent header={header} body={body} />;
                </Card>
              </Tab.Pane>
              <Tab.Pane eventKey='second'>
                <Card className='p-5 pb-1 rounded'>
                  <h1 className='mb-4'>Orders</h1>
                  <TableComponent header={header} body={body} />;
                </Card>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Card>
      </div>
      <Footer />
    </>
  );
}
