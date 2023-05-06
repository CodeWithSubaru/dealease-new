import { useState, useEffect } from 'react';
import { TableComponent } from '../Table/Table';
import { Footer } from '../Footer/Footer';
import Card from 'react-bootstrap/Card';
import { Nav, Tab, Row, Col, Button } from 'react-bootstrap';
import useAuthContext from '../../Hooks/Context/AuthContext';
import Modal from 'react-bootstrap/Modal';
import { Load } from '../Loader/Load';

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
                  <h1 className='mb-4 fw-bold'>
                    {props.title == 'Buyer' ? 'My' : ''} Pending Orders
                  </h1>
                  {props.loading ? (
                    <Load />
                  ) : (
                    <TableComponent header={header} body={props.body} />
                  )}
                </Card>
              </Tab.Pane>
              <Tab.Pane eventKey='second'>
                <Card className='p-5 pb-1 rounded'>
                  <h1 className='mb-4 fw-bold'>
                    {props.title == 'Buyer' ? 'My' : ''} Processing Orders
                  </h1>
                  {props.loading ? (
                    <Load />
                  ) : (
                    <TableComponent header={header} body={props.body} />
                  )}
                </Card>
              </Tab.Pane>
              <Tab.Pane eventKey='third'>
                <Card className='p-5 pb-1 rounded'>
                  <h1 className='mb-4 fw-bold'>
                    {props.title == 'Buyer' ? 'My' : ''} Delivered Orders
                  </h1>
                  {props.loading ? (
                    <Load />
                  ) : (
                    <TableComponent header={header} body={props.body} />
                  )}
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
