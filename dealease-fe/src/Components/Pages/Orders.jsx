import { useState, useEffect } from 'react';
import { TableComponent } from '../Table/Table';
import { Footer } from '../Footer/Footer';
import Card from 'react-bootstrap/Card';
import { Nav, Tab, Row, Col } from 'react-bootstrap';
import axiosClient from '../../api/axios';
import PUBLIC_URL from '../../api/public_url';

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
    // { title: 'Action', prop: 'action' },
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

  function setUserOrdersTable(id, operator) {
    axiosClient
      .get('/orders/orders-user/' + id + '/' + operator)
      .then((resp) => {
        console.log(resp);
        const orders = resp.data.map((order, i) => {
          return {
            payment_number: i + 1,
            fullname: (
              <div key={i} className='d-flex' style={{ columnGap: '10px' }}>
                <img
                  src={PUBLIC_URL + 'images/' + order.product.user.prof_img}
                  className='rounded-circle pr-5'
                  style={{ width: '50px', height: '50px' }}
                />
                <div>
                  <p className='mb-0'>
                    {order.product.user.first_name}{' '}
                    {order.product.user.user_details
                      ? order.product.user.user_details.middle_name[0]
                      : ''}
                    {'. '}
                    {order.product.user.user_details
                      ? order.product.user.user_details.last_name
                      : ' '}{' '}
                    {order.product.user.user_details
                      ? order.product.user.user_details.ext_name
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
            //   action: (
            //     <div key={i} className='button-actions text-light d-flex'>
            //       <Button
            //         variant='primary'
            //         onClick={() => accept(transaction.payment_number)}
            //         style={{ cursor: 'pointer' }}
            //         className='p-2 me-2 rounded'
            //       >
            //         <FontAwesomeIcon icon={faCheck} className='mx-2' />
            //       </Button>
            //       <Button
            //         variant='danger'
            //         onClick={() => decline(user.user_id)}
            //         style={{ cursor: 'pointer' }}
            //         className='p-2 2 rounded'
            //       >
            //         <FontAwesomeIcon icon={faClose} className='mx-2' />
            //       </Button>
            //     </div>
            //   ),
          };
        });

        setBody(orders);
      });
  }

  useEffect(() => {
    setUserOrdersTable(1, '==');
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
                  onClick={() => setUserOrdersTable(1, '==')}
                >
                  Your Pending Orders (Buyer)
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey='second'
                  onClick={() => setUserOrdersTable(1, '!=')}
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
