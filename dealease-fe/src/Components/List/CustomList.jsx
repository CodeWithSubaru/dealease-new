import { List, FlexboxGrid, Container } from 'rsuite';

import UserCircleIcon from '@rsuite/icons/legacy/UserCircleO';
import { Load } from '../Loader/Load';
import { Modal, Button } from 'react-bootstrap';
import useAuthContext from '../../Hooks/Context/AuthContext';

export function CustomList(props) {
  // const renderRaise = (number) => {
  //   const isPositive = number > 0;
  //   const isNegative = number < 0;
  //   return (
  //     <span style={{ paddingLeft: 15, color: isNegative ? "red" : "green" }}>
  //       <span>{isPositive ? "+" : null}</span>
  //       <span>{number}</span>
  //     </span>
  //   );
  // };
  const { user } = useAuthContext();

  const styleCenter = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60px',
  };

  const slimText = {
    fontSize: '0.666em',
    color: '#97969B',
    fontWeight: 'lighter',
    paddingBottom: 5,
  };

  const titleStyle = {
    paddingBottom: 5,
    whiteSpace: 'nowrap',
    fontWeight: 500,
  };

  const dataStyle = {
    fontSize: '1.2em',
    fontWeight: 500,
  };

  return (
    <>
      {/* Buyer Modal View */}
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
                          {order.product.user.user_details.first_name}{' '}
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
                          {' '}
                          <span className='d-block fw-bold text-secondary'>
                            Shipping Information:
                          </span>{' '}
                          {order.delivery_address
                            ? (order.delivery_address.full_name
                                ? order.delivery_address.full_name
                                : '') +
                              ' - ' +
                              (order.delivery_address.contact_number
                                ? order.delivery_address.contact_number
                                : ' ') +
                              ' - ' +
                              (order.delivery_address.street
                                ? order.delivery_address.street
                                : '') +
                              ' ' +
                              (order.delivery_address.barangay
                                ? order.delivery_address.barangay
                                : '') +
                              ' ' +
                              (order.delivery_address.city
                                ? order.delivery_address.city
                                : '')
                            : (order.barangay
                                ? order.street
                                : user.user_details.street) +
                              ' ' +
                              (order.barangay
                                ? order.barangay
                                : user.user_details.barangay)}
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
                  {props.viewOrders[0] ? props.viewOrders[0].delivery_fee : ''}
                </span>
              </p>
              <h5 className='d-flex align-items-center justify-content-end'>
                <span className='me-2 fw-bold text-nowrap'> Grand Total: </span>{' '}
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

      {/* Seller Modal View */}
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
                          {order.order_by.user_details.middle_name
                            ? order.order_by.user_details.middle_name[0] + '. '
                            : ''}
                          {order.order_by.user_details.last_name}{' '}
                          {order.order_by.user_details.ext_name
                            ? order.order_by.user_details.ext_name
                            : ''}
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
                          {' '}
                          <span className='d-block fw-bold text-secondary'>
                            Shipping Information:
                          </span>{' '}
                          {order.delivery_address
                            ? (order.delivery_address.full_name
                                ? order.delivery_address.full_name
                                : '') +
                              ' - ' +
                              (order.delivery_address.contact_number
                                ? order.delivery_address.contact_number
                                : ' ') +
                              ' - ' +
                              (order.delivery_address.street
                                ? order.delivery_address.street
                                : '') +
                              ' ' +
                              (order.delivery_address.barangay
                                ? order.delivery_address.barangay
                                : '') +
                              ' ' +
                              (order.delivery_address.city
                                ? order.delivery_address.city
                                : '')
                            : (order.barangay
                                ? order.street
                                : user.user_details.street) +
                              ' ' +
                              (order.barangay
                                ? order.barangay
                                : user.user_details.barangay)}
                        </p>
                      </div>
                    </div>
                  </>
                );
              })
            : 'Loading...'}
          {props.viewOrders.length > 0 && (
            <hr className='border border-1 border-black-subtle' />
          )}
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
                  {props.viewOrders[0] ? props.viewOrders[0].delivery_fee : ''}
                </span>
              </p>
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
          <Button onClick={props.closeViewOrderBuyerModal} className='rounded'>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Container className='bg-white shadow border-top border-bottom border-start border-end border-1 border-black-subtle overflow-hidden rounded'>
        {props.loading ? (
          <div className='py-5'>
            <Load />
          </div>
        ) : (
          <List hover>
            <FlexboxGrid className='rounded '>
              <h6 className='p-4'>
                {' '}
                {props.title == 'Buyer' ? 'My' : ''} {props.pageTitle}
              </h6>
            </FlexboxGrid>

            {props.data.length > 0 ? (
              props.data.map((item, index) => (
                <List.Item
                  key={item.id}
                  index={index + 1}
                  className='p-3 border-bottom border-start border-end border-1 border-black-subtle'
                >
                  <FlexboxGrid>
                    {/*base info*/}

                    <FlexboxGrid.Item
                      colspan={8}
                      style={{
                        ...styleCenter,
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        flexGrow: 1,
                      }}
                    >
                      <div style={titleStyle} className='mb-1 pb-0'>
                        # {item.order_number}
                      </div>
                      <div style={slimText}>
                        <div className='d-flex align-items-center'>
                          <UserCircleIcon />{' '}
                          <span style={{ fontSize: '12px' }}>
                            {item.seller_name}
                          </span>
                        </div>
                        <div>{item.created_at}</div>
                      </div>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item
                      colspan={8}
                      className='d-flex align-items-center'
                    >
                      <div className='d-flex align-items-center pt-3'>
                        {item.order_status}
                      </div>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item style={styleCenter} className='mb-2'>
                      <div style={{ textAlign: 'right' }}>
                        <div style={slimText}>Shells</div>
                        <div style={dataStyle}>{item.payment_total_amount}</div>
                      </div>
                    </FlexboxGrid.Item>

                    <FlexboxGrid.Item className='pt-3 d-flex justify-content-end flex-grow-1 border-top border-1 border-black-subtle'>
                      <div className=''>
                        <div>{item.action}</div>
                      </div>
                    </FlexboxGrid.Item>
                  </FlexboxGrid>
                </List.Item>
              ))
            ) : (
              <List.Item className='p-3 border-bottom border-start border-end border-1 border-black-subtle'>
                <FlexboxGrid className='justify-content-center'>
                  <FlexboxGrid.Item>
                    <div
                      className='p-2'
                      style={{ textAlign: 'center', flexGrow: 1 }}
                    >
                      <div>No Data</div>
                      <div></div>
                    </div>
                  </FlexboxGrid.Item>
                </FlexboxGrid>
              </List.Item>
            )}
          </List>
        )}
      </Container>
    </>
  );
}
