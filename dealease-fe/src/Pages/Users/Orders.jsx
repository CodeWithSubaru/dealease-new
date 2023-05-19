import { OrdersTable } from '../../Components/Pages/Orders';
import { useState, useEffect } from 'react';
import axiosClient from '../../api/axios';
import PUBLIC_URL from '../../api/public_url';
import Button from 'react-bootstrap/Button';
import { Finalize } from '../../Components/Notification/Notification';
import useAuthContext from '../../Hooks/Context/AuthContext';
import { SidebarUser } from '../../Components/Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';
import { CustomList } from '../../Components/List/CustomList';

export function OrdersBuyer() {
  const title = 'Buyer';
  const [body, setBody] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pendingOrderNumber, setPendingOrderNumber] = useState(0);
  const [processingOrderNumber, setProcessingOrderNumber] = useState(0);
  const [deliveredOrderNumber, setDeliveredOrderNumber] = useState(0);
  const [viewOrderProduct, setViewOrderProduct] = useState(false);
  const [viewOrders, setViewOrders] = useState([]);
  const { fetchUserInfo } = useAuthContext();
  const [currentColor, setCurrentColor] = useState(0);
  const [pageTitle, setPageTitle] = useState('Pending Orders');

  function fetchNumberOrdersByStatusUser(orderStatus) {
    axiosClient
      .get('/orders/order-status/buyer/' + orderStatus)
      .then((res) => {
        if (orderStatus === 1) {
          setPendingOrderNumber(res.data);
        } else if (
          orderStatus[0] === 2 ||
          orderStatus[1] === 3 ||
          orderStatus[2] === 4 ||
          orderStatus[3] === 5
        ) {
          setProcessingOrderNumber(res.data);
        } else if (
          orderStatus[0] === 6 ||
          orderStatus[1] === 7 ||
          orderStatus[2] === 8
        ) {
          setDeliveredOrderNumber(res.data);
        }
      })
      .catch((error) => console.log(error));
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

  function status(status) {
    if (status === 0) {
      return 'Cancelled';
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
      return 'border-success bg-success bg-opacity-75 text-light';
    }
    if (status === '4') {
      return 'border-info bg-info bg-opacity-75 text-light';
    }
    if (status === '5') {
      return 'border-primary bg-primary bg-opacity-75 text-light';
    }
    if (status === '6') {
      return 'border-success bg-success bg-opacity-75 text-light';
    }
    if (status === '7') {
      return 'border-primary bg-primary bg-opacity-75 text-light';
    }
    if (status === '8') {
      return 'border-danger bg-danger bg-opacity-75 text-light';
    }
  }

  function closeViewOrderProduct() {
    setViewOrderProduct(false);
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

  function cancel(id, grandTotal) {
    Finalize({
      text: 'Are you sure, you want to cancel your order?',
      confirmButton: 'Yes',
      successMsg: 'Order Cancelled Successfully',
    }).then((res) => {
      if (res.isConfirmed) {
        axiosClient
          .put('/orders/user/cancel-order/' + id, { status: 0, grandTotal })
          .then((resp) => {
            fetchUserInfo();
          })
          .catch((e) => console.log(e));
        setUserOrdersTable(1);
      }
    });
  }

  function orderReceived(id) {
    Finalize({
      text: 'Are you sure, your deliver Received?',
      confirmButton: 'Yes',
      successMsg: 'Order Received',
    }).then((res) => {
      if (res.isConfirmed) {
        axiosClient
          .post('/buyer/orderReceived/' + id)
          .then((resp) => {
            fetchUserInfo();
          })
          .catch((e) => console.log(e));
        setUserOrdersTable([6, 7, 8]);
      }
    });
  }

  function calculateGrandTotalPrice(orders) {
    let totalPrice = 0;
    let deliveryFee;
    Object.values(orders).forEach((orderItem) => {
      totalPrice += Number(orderItem.total_price);
      deliveryFee = Number(orderItem.delivery_fee);
    });

    return Number(totalPrice) + deliveryFee;
  }

  function calculateGrandTotalDeliveryFee(totalPrice, delFee) {
    let totalPriceDelFee = 0;
    totalPriceDelFee += Number(totalPrice) + Number(delFee);
    return Number(totalPriceDelFee).toLocaleString('en-US');
  }

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

  function setUserOrdersTable(number) {
    setBody([]);
    setLoading(true);
    axiosClient.get('/orders/orders-user/buyer/' + number).then((resp) => {
      console.log(resp.data);
      const orders = resp.data.map((order, i) => {
        return {
          id: i + 1,
          order_number: order.order_number,
          seller_name: (
            <div
              key={order.order_trans_id}
              className='d-flex'
              style={{ columnGap: '10px' }}
            >
              <div>
                <p className='mb-0'>
                  {order.seller.first_name}{' '}
                  {order.seller.user_details.middle_name
                    ? order.seller.user_details.middle_name[0] + '. '
                    : ''}
                  {order.seller.user_details
                    ? order.seller.user_details.last_name
                    : ' '}{' '}
                  {order.seller.user_details.ext_name
                    ? order.seller.user_details.ext_name
                    : ''}
                </p>
              </div>
            </div>
          ),
          order_status: (
            <span
              className={
                'text-nowrap rounded px-2 text-uppercase border border-2 ' +
                switchColor(order.order_trans_status)
              }
            >
              {status(order.order_trans_status)}
            </span>
          ),
          payment_total_amount: (
            <div className='d-flex justify-content-center'>
              <img
                src='/images/seashell.png'
                style={{ width: '25px' }}
                className='me-2'
              />{' '}
              {calculateGrandTotalDeliveryFee(
                order.total_amount,
                order.delivery_fee
              )}{' '}
            </div>
          ),
          created_at: dateFormat(order.created_at),
          action: (
            <div key={i} className='button-actions text-light d-flex'>
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

              {order.order_trans_status == '1' ? (
                <Button
                  variant='danger'
                  onClick={() => {
                    cancel(
                      order.order_number,
                      calculateGrandTotalDeliveryFee(
                        order.total_amount,
                        order.delivery_fee
                      )
                    );
                  }}
                  style={{ cursor: 'pointer' }}
                  className='badge rounded text-bg-danger px-2'
                >
                  Cancel
                </Button>
              ) : (
                ''
              )}

              {order.order_trans_status == '6' ? (
                <Button
                  variant='danger'
                  onClick={() => {
                    orderReceived(order.order_trans_id);
                  }}
                  style={{ cursor: 'pointer' }}
                  className='badge rounded bg-success px-2'
                >
                  Order Received
                </Button>
              ) : (
                ''
              )}
            </div>
          ),
        };
      });
      setBody(orders);
      setLoading(false);
    });
  }

  useEffect(() => {
    fetchNumberOrdersByStatusUser(1);
    fetchNumberOrdersByStatusUser([2, 3, 4, 5]);
    fetchNumberOrdersByStatusUser([6, 7, 8]);
    setUserOrdersTable(1);
  }, []);

  return (
    <div className='mt-4 pt-2 mx-2'>
      <SidebarUser />
      {/* <main className='w-100'>
        <OrdersTable
          loading={loading}
          setLoading={setLoading}
          header={header}
          body={body}
          title={title}
          pendingOrderNumber={pendingOrderNumber}
          processingOrderNumber={processingOrderNumber}
          deliveredOrderNumber={deliveredOrderNumber}
          viewOrderProduct={viewOrderProduct}
          closeViewOrderProduct={closeViewOrderProduct}
          viewOrders={viewOrders}
          status={status}
          calculateGrandTotalPrice={calculateGrandTotalPrice}
          setUserOrdersTable={setUserOrdersTable}
          fetchNumberOrdersByStatusUser={fetchNumberOrdersByStatusUser}
        />
      </main> */}

      <div className='mt-5'>
        <div className='d-flex mb-2'>
          <span
            className={
              'px-1 rounded-pill btn btn-filter-product mt-3 fw-semibold ' +
              (currentColor == 0 ? 'btn-primary' : 'btn-secondary')
            }
            onClick={() => {
              setUserOrdersTable(1);
              fetchNumberOrdersByStatusUser(1);
              fetchNumberOrdersByStatusUser([2, 3, 4, 5]);
              fetchNumberOrdersByStatusUser([6, 7, 8]);
              setPageTitle('Pending Orders');
              setCurrentColor(0);
            }}
            disabled={loading}
          >
            Pending
          </span>

          <span
            className={
              'px-1 rounded-pill btn btn-filter-product mt-3 fw-semibold ' +
              (currentColor == 1 ? 'btn-primary' : 'btn-secondary')
            }
            onClick={() => {
              setUserOrdersTable([2, 3, 4, 5]);
              fetchNumberOrdersByStatusUser(1);
              fetchNumberOrdersByStatusUser([2, 3, 4, 5]);
              fetchNumberOrdersByStatusUser([6, 7, 8]);
              setPageTitle('Processing Orders');
              setCurrentColor(1);
            }}
            disabled={loading}
          >
            Processing
          </span>

          <span
            className={
              'px-1 rounded-pill btn btn-filter-product mt-3  fw-semibold ' +
              (currentColor == 2 ? 'btn-primary' : 'btn-secondary')
            }
            onClick={() => {
              setUserOrdersTable([6, 7, 8]);
              fetchNumberOrdersByStatusUser(1);
              fetchNumberOrdersByStatusUser([2, 3, 4, 5]);
              fetchNumberOrdersByStatusUser([6, 7, 8]);
              setPageTitle('Delivered Orders');
              setCurrentColor(2);
              disabled = { loading };
            }}
            disabled={loading}
          >
            Delivered
          </span>
        </div>

        <CustomList
          data={body}
          title={title}
          pageTitle={pageTitle}
          loading={loading}
          setLoading={setLoading}
          header={header}
          pendingOrderNumber={pendingOrderNumber}
          processingOrderNumber={processingOrderNumber}
          deliveredOrderNumber={deliveredOrderNumber}
          viewOrderProduct={viewOrderProduct}
          closeViewOrderProduct={closeViewOrderProduct}
          viewOrders={viewOrders}
          status={status}
          calculateGrandTotalPrice={calculateGrandTotalPrice}
          setUserOrdersTable={setUserOrdersTable}
          fetchNumberOrdersByStatusUser={fetchNumberOrdersByStatusUser}
        />
      </div>
    </div>
  );
}

export function OrdersSeller() {
  const title = 'Seller';
  const [body, setBody] = useState([]);
  const [pendingOrderNumber, setPendingOrderNumber] = useState(0);
  const [processingOrderNumber, setProcessingOrderNumber] = useState(0);
  const [deliveredOrderNumber, setDeliveredOrderNumber] = useState(0);
  const [loading, setLoading] = useState(false);
  const [viewOrderBuyerModal, setViewOrderBuyerModal] = useState(false);
  const [viewOrders, setViewOrders] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [currentColor, setCurrentColor] = useState(0);
  const [pageTitle, setPageTitle] = useState('Pending Orders');

  if (user.verified_user == 0) {
    navigate('/orders');
  }

  function fetchNumberOrdersByStatusUser(orderStatus) {
    axiosClient
      .get('/orders/order-status/seller/' + orderStatus)
      .then((res) => {
        if (orderStatus === 1) {
          setPendingOrderNumber(res.data);
        } else if (
          orderStatus[0] === 2 ||
          orderStatus[1] === 3 ||
          orderStatus[2] === 4 ||
          orderStatus[3] === 5
        ) {
          setProcessingOrderNumber(res.data);
        } else if (
          orderStatus[0] === 6 ||
          orderStatus[1] === 7 ||
          orderStatus[2] === 8
        ) {
          setDeliveredOrderNumber(res.data);
        }
      })
      .catch((error) => console.log(error));
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

  function status(status) {
    if (status === '0') {
      return 'Cancelled';
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
      return 'border-success bg-success bg-opacity-75 text-light';
    }
    if (status === '4') {
      return 'border-info bg-info bg-opacity-75 text-light';
    }
    if (status === '5') {
      return 'border-primary bg-primary bg-opacity-75 text-light';
    }
    if (status === '6') {
      return 'border-success bg-success bg-opacity-75 text-light';
    }
    if (status === '7') {
      return 'border-primary bg-primary bg-opacity-75 text-light';
    }
    if (status === '8') {
      return 'border-danger bg-danger bg-opacity-75 text-light';
    }
  }

  function accept(orderNumber) {
    Finalize({
      text: 'You want accept this order request',
      confirmButton: 'Yes',
      successMsg: 'Order Accepted Successfully.',
    }).then((res) => {
      if (res.isConfirmed) {
        axiosClient
          .put('/orders/' + orderNumber, { status: 2 })
          .then((resp) => {})
          .catch((e) => console.log(e));
        fetchNumberOrdersByStatusUser(1);
        fetchNumberOrdersByStatusUser([2, 3, 4, 5]);
        fetchNumberOrdersByStatusUser([6, 7, 8]);
        setUserOrdersTable(1);
      }
    });
  }

  function findRider(orderNumber) {
    Finalize({
      text: 'You want accept this order request and Find Rider',
      confirmButton: 'Yes',
      successMsg: 'Order Accepted Successfully.',
    }).then((res) => {
      if (res.isConfirmed) {
        axiosClient
          .put('/orders/' + orderNumber, { status: 3 })
          .then((resp) => {})
          .catch((e) => console.log(e));
        fetchNumberOrdersByStatusUser(1);
        fetchNumberOrdersByStatusUser([2, 3, 4, 5]);
        fetchNumberOrdersByStatusUser([6, 7, 8]);
        setUserOrdersTable([2, 3, 4, 5]);
      }
    });
  }

  function closeViewOrderBuyerModal() {
    setViewOrderBuyerModal(false);
  }

  function viewByOrderNumberBuyer(orderNumber) {
    setViewOrders([]);
    axiosClient
      .get('/orders/' + orderNumber)
      .then((res) => {
        setViewOrders(res.data);
      })
      .catch((e) => console.log(e));
  }

  function calculateGrandTotalPrice(orders) {
    let totalPrice = 0;
    let deliveryFee;
    Object.values(orders).forEach((orderItem) => {
      totalPrice += Number(orderItem.total_price);
      deliveryFee = Number(orderItem.delivery_fee);
    });

    return Number(totalPrice) + deliveryFee;
  }

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
      title: 'Buyer Name',
      prop: 'buyer_name',
    },
    {
      title: 'Shipping Address',
      prop: 'shipping_address',
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

  const header1 = [
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
      title: 'Buyer Name',
      prop: 'buyer_name',
    },
    {
      title: 'Shipping Address',
      prop: 'shipping_address',
    },
    {
      title: 'Rider Name',
      prop: 'rider_name',
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

  function cancel(id, grandTotal, customerId) {
    Finalize({
      text: 'Are you sure, you want to cancel this order',
      confirmButton: 'Yes',
      successMsg: 'Order Cancelled Successfully.',
    }).then((res) => {
      if (res.isConfirmed) {
        axiosClient
          .put('/orders/seller/cancel-order/' + id, {
            status: 0,
            grandTotal,
            customerId,
          })
          .then((resp) => {
            fetchUserInfo();
          })
          .catch((e) => console.log(e));
        setUserOrdersTable(1);
      }
    });
  }

  function calculateGrandTotalDeliveryFee(totalPrice, delFee) {
    let totalPriceDelFee = 0;
    totalPriceDelFee += Number(totalPrice) + Number(delFee);
    return Number(totalPriceDelFee).toLocaleString('en-US');
  }

  function setUserOrdersTable(number) {
    setBody([]);
    setLoading(true);
    axiosClient.get('/orders/orders-user/seller/' + number).then((resp) => {
      const orders = resp.data.map((order, i) => {
        return {
          id: i + 1,
          order_number: order.order_number,
          buyer_name: (
            <div
              key={order.order_trans_id}
              className='d-flex'
              style={{ columnGap: '10px' }}
            >
              <div>
                <p className='mb-0'>
                  {order.buyer.first_name ? order.buyer.first_name : ''}{' '}
                  {order.buyer.user_details.middle_name
                    ? order.buyer.user_details.middle_name[0] + '. '
                    : ''}
                  {order.buyer.user_details.last_name
                    ? order.buyer.user_details.last_name
                    : ' '}{' '}
                  {order.buyer.user_details.ext_name
                    ? order.buyer.user_details.ext_name
                    : ''}
                </p>
              </div>
            </div>
          ),
          shipping_address:
            (order.delivery_address_id
              ? order.delivery_address_id
              : order.buyer.user_details.street
              ? order.buyer.user_details.street
              : '') +
            ' ' +
            (order.buyer.user_details.barangay
              ? order.buyer.user_details.barangay
              : '') +
            ' ' +
            (order.buyer.user_details.city
              ? order.buyer.user_details.city
              : ''),
          rider_name: (
            <div key={order.order_trans_id}>
              <div>
                <p className='mb-0'>
                  {order.delivery
                    ? order.delivery.rider.first_name
                      ? order.delivery.rider.first_name
                      : ''
                    : ''}{' '}
                  {order.delivery
                    ? order.delivery.rider
                      ? order.delivery.rider.user_details.middle_name
                        ? order.delivery.rider.user_details.middle_name[0] +
                          '. '
                        : ''
                      : ''
                    : ''}
                  {order.delivery
                    ? order.delivery.rider
                      ? order.delivery.rider.user_details.last_name
                      : ' '
                    : ''}{' '}
                  {order.delivery
                    ? order.delivery.rider
                      ? order.delivery.rider.user_details.ext_name
                      : ''
                    : ''}
                </p>
              </div>
            </div>
          ),
          order_status: (
            <span
              className={
                'text-nowrap rounded px-2 text-uppercase border border-2 ' +
                switchColor(order.order_trans_status)
              }
            >
              {status(order.order_trans_status)}
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
                order.total_amount,
                order.delivery_fee
              )}{' '}
            </>
          ),
          created_at: dateFormat(order.created_at),
          action: (
            <div key={i} className='button-actions text-light d-flex'>
              <Button
                variant='primary'
                onClick={() => {
                  viewByOrderNumberBuyer(order.order_number);
                  setViewOrderBuyerModal(true);
                }}
                style={{ cursor: 'pointer' }}
                className='badge rounded text-bg-primary px-2 me-2'
              >
                View
              </Button>

              {order.order_trans_status === '1' &&
              order.order_trans_status > 0 ? (
                <>
                  <Button
                    variant='success'
                    onClick={() => {
                      accept(order.order_number);
                    }}
                    style={{ cursor: 'pointer' }}
                    className='badge rounded px-2 me-2'
                  >
                    Accept
                  </Button>
                </>
              ) : (
                ''
              )}

              {order.order_trans_status === '2' &&
              order.order_trans_status > 0 ? (
                <>
                  <Button
                    variant='success'
                    onClick={() => {
                      findRider(order.order_number);
                    }}
                    style={{ cursor: 'pointer' }}
                    className='badge rounded px-2 me-2'
                  >
                    Find Rider
                  </Button>
                </>
              ) : (
                ''
              )}

              {order.order_trans_status == '1' && (
                <Button
                  variant='primary'
                  onClick={() => {
                    cancel(
                      order.order_number,
                      calculateGrandTotalDeliveryFee(
                        order.total_amount,
                        order.delivery_fee
                      ),
                      order.buyer_id
                    );
                  }}
                  style={{ cursor: 'pointer' }}
                  className='badge rounded text-bg-danger px-2 me-2'
                >
                  Cancel
                </Button>
              )}
            </div>
          ),
        };
      });
      setBody(orders);
      setLoading(false);
    });
  }

  useEffect(() => {
    fetchNumberOrdersByStatusUser(1);
    fetchNumberOrdersByStatusUser([2, 3, 4, 5]);
    fetchNumberOrdersByStatusUser([6, 7, 8]);
    setUserOrdersTable(1);
  }, []);

  return (
    <div className='mt-4 pt-2 mx-2'>
      <SidebarUser />
      <main className='w-100'>
        {/* <OrdersTable
          loading={loading}
          setLoading={setLoading}
          header={header}
          header1={header1}
          body={body}
          title={title}
          pendingOrderNumber={pendingOrderNumber}
          processingOrderNumber={processingOrderNumber}
          deliveredOrderNumber={deliveredOrderNumber}
          viewOrders={viewOrders}
          viewOrderBuyerModal={viewOrderBuyerModal}
          closeViewOrderBuyerModal={closeViewOrderBuyerModal}
          status={status}
          calculateGrandTotalPrice={calculateGrandTotalPrice}
          setUserOrdersTable={setUserOrdersTable}
          fetchNumberOrdersByStatusUser={fetchNumberOrdersByStatusUser}
        /> */}

        <div className='mt-5'>
          <div className='d-flex mb-2'>
            <span
              className={
                'px-1 rounded-pill btn btn-filter-product mt-3 fw-semibold ' +
                (currentColor == 0 ? 'btn-primary' : 'btn-secondary')
              }
              onClick={() => {
                setUserOrdersTable(1);
                fetchNumberOrdersByStatusUser(1);
                fetchNumberOrdersByStatusUser([2, 3, 4, 5]);
                fetchNumberOrdersByStatusUser([6, 7, 8]);
                setPageTitle('Pending Orders');
                setCurrentColor(0);
              }}
              disabled={loading}
            >
              Pending
            </span>

            <span
              className={
                'px-1 rounded-pill btn btn-filter-product mt-3 fw-semibold ' +
                (currentColor == 1 ? 'btn-primary' : 'btn-secondary')
              }
              onClick={() => {
                setUserOrdersTable([2, 3, 4, 5]);
                fetchNumberOrdersByStatusUser(1);
                fetchNumberOrdersByStatusUser([2, 3, 4, 5]);
                fetchNumberOrdersByStatusUser([6, 7, 8]);
                setPageTitle('Processing Orders');
                setCurrentColor(1);
              }}
              disabled={loading}
            >
              Processing
            </span>

            <span
              className={
                'px-1 rounded-pill btn btn-filter-product mt-3  fw-semibold ' +
                (currentColor == 2 ? 'btn-primary' : 'btn-secondary')
              }
              onClick={() => {
                setUserOrdersTable([6, 7, 8]);
                fetchNumberOrdersByStatusUser(1);
                fetchNumberOrdersByStatusUser([2, 3, 4, 5]);
                fetchNumberOrdersByStatusUser([6, 7, 8]);
                setPageTitle('Delivered Orders');
                setCurrentColor(2);
              }}
              disabled={loading}
            >
              Delivered
            </span>
          </div>
        </div>

        <CustomList
          data={body}
          title={title}
          pageTitle={pageTitle + ' (Seller)'}
          loading={loading}
          setLoading={setLoading}
          header={header}
          pendingOrderNumber={pendingOrderNumber}
          processingOrderNumber={processingOrderNumber}
          deliveredOrderNumber={deliveredOrderNumber}
          viewOrders={viewOrders}
          status={status}
          calculateGrandTotalPrice={calculateGrandTotalPrice}
          setUserOrdersTable={setUserOrdersTable}
          fetchNumberOrdersByStatusUser={fetchNumberOrdersByStatusUser}
        />
      </main>
    </div>
  );
}
