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
  const [pendingOrderNumberSeller, setPendingOrderNumberSeller] = useState(0);
  const { user } = useAuthContext();

  const header = [
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

  // function setUserOrdersTable() {
  //     // } else {
  //       orders = resp.data.map((order, i) => {
  //         console.log(order);
  //         return {
  //           payment_number: i + 1,
  //           fullname: (
  //             <div key={i} className='d-flex' style={{ columnGap: '10px' }}>
  //               <img
  //                 src={PUBLIC_URL + 'images/' + order.order_by.prof_img}
  //                 className='rounded-circle pr-5'
  //                 style={{ width: '50px', height: '50px' }}
  //               />
  //               <div>
  //                 <p className='mb-0'>
  //                   {order.order_by.first_name}{' '}
  //                   {order.order_by.user_details
  //                     ? order.order_by.user_details.middle_name[0]
  //                     : ''}
  //                   {'. '}
  //                   {order.order_by.user_details
  //                     ? order.order_by.user_details.last_name
  //                     : ' '}{' '}
  //                   {order.order_by.user_details
  //                     ? order.order_by.user_details.ext_name
  //                     : ''}
  //                 </p>
  //               </div>
  //             </div>
  //           ),
  //           title: order.product.title,
  //           weight: order.weight,
  //           stocks: order.product.stocks_per_kg,
  //           order_status: (
  //             <span className='border border-2 border-warning rounded px-2 text-uppercase bg-warning bg-opacity-75 text-light'>
  //               {status(order.order_status)}
  //             </span>
  //           ),
  //           payment_total_amount: 'Php ' + order.total_price,
  //           created_at: dateFormat(order.created_at),
  //           action: (
  //             <div key={i} className='button-actions text-light d-flex'>
  //               <Button
  //                 variant='primary'
  //                 onClick={() => accept(order.order_id)}
  //                 style={{ cursor: 'pointer' }}
  //                 className='p-2 me-2 rounded'
  //               >
  //                 <FontAwesomeIcon icon={faCheck} className='mx-2' />
  //               </Button>
  //               {/* <Button
  //                 variant='danger'
  //                 onClick={() => decline(order.order_id)}
  //                 style={{ cursor: 'pointer' }}
  //                 className='p-2 2 rounded'
  //               >
  //                 <FontAwesomeIcon icon={faClose} className='mx-2' />
  //               </Button> */}
  //             </div>
  //           ),
  //         };
  //       });
  //     }
  //     setBody(orders);
  //   });
  // }

  // function fetchNumberOrdersByStatusSeller(orderStatus) {
  //   axiosClient
  //     .get('/orders/order-status/seller/' + orderStatus)
  //     .then((res) => {
  //       if (orderStatus === 1) {
  //         setPendingOrderNumberSeller(res.data);
  //       } else if (orderStatus === 2) {
  //         setProcessingOrderNumberSeller(res.data);
  //       } else if (orderStatus === 3) {
  //         setDeliveredOrderNumberSeller(res.data);
  //       }
  //     })
  //     .catch((error) => console.log(error));
  // }

  return (
    <>
      <div className='mx-auto w-75' style={{ minHeight: '85vh' }}>
        <Modal
          size='lg'
          show={props.viewOrderProduct}
          onHide={props.closeViewOrderProduct}
          animation={true}
          aria-labelledby='contained-modal-title-vcenter'
          scrollable
        >
          <Modal.Header closeButton>
            <Modal.Title id='contained-modal-title-vcenter'>
              #
              {props.viewOrders[0]
                ? props.viewOrders[0].order_number
                : 'Loading...'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {props.viewOrders.length > 0
              ? props.viewOrders.map((order, index) => {
                  return (
                    <>
                      <div>
                        <p>
                          <b> Product No. {index + 1} </b>
                        </p>
                        <p>Product Name: {order.product.title}</p>
                        <p>Product Description: {order.product.description}</p>
                        <p>
                          Product Seller: {order.order_by.first_name}{' '}
                          {order.order_by.user_details.middle_name[0]}
                          {'. '}
                          {order.order_by.user_details.last_name}{' '}
                          {order.order_by.user_details.ext_name}
                        </p>
                        <p>Status: {props.status(order.order_trans_status)}</p>
                        <p>Quantity: {order.product.weight} kg</p>
                        <p>
                          Total Price: <b>Php {order.total_price}</b>
                        </p>
                        {props.viewOrders.length > 1 && <hr />}
                      </div>
                    </>
                  );
                })
              : 'Loading...'}
            <h5>
              Grand Total: Php{' '}
              {props.viewOrders.length > 0
                ? props.calculateGrandTotalPrice(props.viewOrders)
                : '(Calculating...)'}
            </h5>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.closeViewOrderProduct}>Close</Button>
          </Modal.Footer>
        </Modal>

        <Card className='p-5 h-100 mb-5'>
          <Tab.Container id='left-tabs-example' defaultActiveKey='first'>
            <Nav justify variant='tabs' defaultActiveKey='/home'>
              <Nav.Item>
                <Nav.Link
                  eventKey='first'
                  onClick={() => {
                    props.setUserOrdersTable(1);
                    props.fetchNumberOrdersByStatusUser(1);
                    props.fetchNumberOrdersByStatusUser(2);
                    props.fetchNumberOrdersByStatusUser(3);
                  }}
                >
                  {props.title == 'Buyer' ? 'My' : ''} Pending Orders (
                  {props.title}){' '}
                  <span
                    className='badge rounded-pill text-bg-primary position-relative'
                    style={{ top: '-8px', left: '-5px' }}
                  >
                    {props.pendingOrderNumber}
                  </span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey='second'
                  onClick={() => {
                    props.setUserOrdersTable(2);
                    props.fetchNumberOrdersByStatusUser(1);
                    props.fetchNumberOrdersByStatusUser(2);
                    props.fetchNumberOrdersByStatusUser(3);
                  }}
                >
                  {props.title == 'Buyer' ? 'My' : ''} Processing Orders (
                  {props.title}){' '}
                  <span
                    className='badge rounded-pill text-bg-primary position-relative'
                    style={{ top: '-8px', left: '-5px' }}
                  >
                    {props.processingOrderNumber}
                  </span>
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  eventKey='third'
                  onClick={() => {
                    props.setUserOrdersTable(3);
                    props.fetchNumberOrdersByStatusUser(1);
                    props.fetchNumberOrdersByStatusUser(2);
                    props.fetchNumberOrdersByStatusUser(3);
                  }}
                >
                  {props.title == 'Buyer' ? 'My' : ''} Delivered Orders (
                  {props.title}){' '}
                  <span
                    className='badge rounded-pill text-bg-primary position-relative'
                    style={{ top: '-8px', left: '-5px' }}
                  >
                    {props.deliveredOrderNumber}
                  </span>
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey='first'>
                <Card className='p-5 pb-1 rounded'>
                  <h1 className='mb-4'>
                    {props.title == 'Buyer' ? 'My' : ''} Pending Orders
                  </h1>
                  <TableComponent header={header} body={props.body} />;
                </Card>
              </Tab.Pane>
              <Tab.Pane eventKey='second'>
                <Card className='p-5 pb-1 rounded'>
                  <h1 className='mb-4'>
                    {props.title == 'Buyer' ? 'My' : ''} Processing Orders
                  </h1>
                  <TableComponent header={header} body={props.body} />;
                </Card>
              </Tab.Pane>

              <Tab.Pane eventKey='third'>
                <Card className='p-5 pb-1 rounded'>
                  <h1 className='mb-4'>
                    {props.title == 'Buyer' ? 'My' : ''} Delivered Orders
                  </h1>
                  <TableComponent header={header} body={props.body} />;
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
