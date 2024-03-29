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
                            {order.product.user.user_details.middle_name[0]}
                            {'. '}
                            {order.product.user.user_details.last_name}{' '}
                            {order.product.user.user_details.ext_name} - (
                            {order.product.user.user_details.contact_number})
                          </p>
                        </div>
                        <div>
                          <p>
                            {' '}
                            <span className='d-block fw-bold text-secondary'>
                              Status:
                            </span>{' '}
                            {props.status(order.order_trans_status)}
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
                            <span className='d-block fw-bold text-secondary'>
                              Delivery Fee:
                            </span>{' '}
                            <span className='d-flex'>
                              {' '}
                              <img
                                src='/images/seashell.png'
                                className='me-2'
                                style={{ height: '20px' }}
                              />{' '}
                              {order.delivery_fee}
                            </span>
                          </p>
                        </div>
                        {props.viewOrders.length > 1 && <hr />}
                      </div>
                    </>
                  );
                })
              : 'Loading...'}
            <div className='d-flex'>
              <div className='w-50 me-5'></div>
              <div className='me-5'>
                <h5 className='d-flex align-items-center justify-content-end'>
                  <span className='me-2 fw-bold'> Grand Total: </span>{' '}
                  <img
                    src='/images/seashell.png'
                    className='me-2'
                    style={{ height: '30px' }}
                  />{' '}
                  {props.viewOrders.length > 0
                    ? props.calculateGrandTotalPrice(props.viewOrders)
                    : '(Calculating...)'}
                </h5>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.closeViewOrderProduct} className='rounded'>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          size='lg'
          show={props.viewOrderBuyerModal}
          onHide={props.closeViewOrderBuyerModal}
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
                              Buyer Name:
                            </span>{' '}
                            {order.order_by.first_name}{' '}
                            {order.order_by.user_details.middle_name[0]}
                            {'. '}
                            {order.order_by.user_details.last_name}{' '}
                            {order.order_by.user_details.ext_name}
                          </p>
                        </div>
                        <div>
                          <p>
                            {' '}
                            <span className='d-block fw-bold text-secondary'>
                              Status:
                            </span>{' '}
                            {props.status(order.order_trans_status)}
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
                        </div>
                        {props.viewOrders.length > 1 && <hr />}
                      </div>
                    </>
                  );
                })
              : 'Loading...'}
            <div className='d-flex'>
              <div className='w-50 me-5'></div>
              <div className='me-5'>
                <h5 className='d-flex align-items-center justify-content-end'>
                  <span className='me-2 fw-bold'> Grand Total: </span>{' '}
                  <img
                    src='/images/seashell.png'
                    className='me-2'
                    style={{ height: '30px' }}
                  />{' '}
                  {props.viewOrders.length > 0
                    ? props.calculateGrandTotalPrice(props.viewOrders)
                    : '(Calculating...)'}
                </h5>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={props.closeViewOrderBuyerModal}
              className='rounded'
            >
              Close
            </Button>
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
                  {props.title == 'Buyer'
                    ? 'My Processing Orders'
                    : 'Find Rider'}{' '}
                  ({props.title}){' '}
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
                    <TableComponent header={props.header} body={props.body} />
                  )}
                </Card>
              </Tab.Pane>
              <Tab.Pane eventKey='second'>
                <Card className='p-5 pb-1 rounded'>
                  <h1 className='mb-4 fw-bold'>
                    {props.title == 'Buyer'
                      ? 'My Processing Orders'
                      : 'Find Rider'}
                  </h1>
                  {props.loading ? (
                    <Load />
                  ) : (
                    <TableComponent header={props.header} body={props.body} />
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
                    <TableComponent header={props.header} body={props.body} />
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
