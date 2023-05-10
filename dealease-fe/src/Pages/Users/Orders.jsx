import { OrdersTable } from '../../Components/Pages/Orders';
import { useState, useEffect } from 'react';
import axiosClient from '../../api/axios';
import PUBLIC_URL from '../../api/public_url';
import Button from 'react-bootstrap/Button';
import { Finalize } from '../../Components/Notification/Notification';
import useAuthContext from '../../Hooks/Context/AuthContext';

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

  function fetchNumberOrdersByStatusUser(orderStatus) {
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
      return 'Preparing';
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
      text: 'Once you cancel this order, Your money will be refunded',
      confirmButton: 'Yes',
      successMsg: 'Order Cancelled Successfully.',
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

  function setUserOrdersTable(number) {
    setLoading(true);
    setBody([]);
    axiosClient.get('/orders/orders-user/buyer/' + number).then((resp) => {
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
              <img
                src={PUBLIC_URL + 'images/' + order.seller.prof_img}
                className='rounded-circle pr-5'
                style={{ width: '50px', height: '50px' }}
              />
              <div>
                <p className='mb-0'>
                  {order.seller.first_name}{' '}
                  {order.seller.user_details
                    ? order.seller.user_details.middle_name[0]
                    : ''}
                  {'. '}
                  {order.seller.user_details
                    ? order.seller.user_details.last_name
                    : ' '}{' '}
                  {order.seller.user_details
                    ? order.seller.user_details.ext_name
                    : ''}
                </p>
              </div>
            </div>
          ),
          contact_number: order.seller.user_details.contact_number,
          order_status: (
            <span
              className={
                'rounded px-2 text-uppercase border border-2 ' +
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

              {order.order_trans_status === '1' ? (
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
    fetchNumberOrdersByStatusUser(2);
    fetchNumberOrdersByStatusUser(3);
    setUserOrdersTable(1);
  }, []);

  return (
    <div>
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

  function fetchNumberOrdersByStatusUser(orderStatus) {
    axiosClient
      .get('/orders/order-status/seller/' + orderStatus)
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
      return 'Preparing';
    }

    if (status === '3') {
      return 'Finding Rider';
    }

    if (status === '4') {
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

  function accept(orderNumber) {
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
        fetchNumberOrdersByStatusUser(2);
        fetchNumberOrdersByStatusUser(3);
        setUserOrdersTable(1);
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
              <img
                src={PUBLIC_URL + 'images/' + order.buyer.prof_img}
                className='rounded-circle pr-5'
                style={{ width: '50px', height: '50px' }}
              />
              <div>
                <p className='mb-0'>
                  {order.buyer.first_name}{' '}
                  {order.buyer.user_details
                    ? order.buyer.user_details.middle_name[0]
                    : ''}
                  {'. '}
                  {order.buyer.user_details
                    ? order.buyer.user_details.last_name
                    : ' '}{' '}
                  {order.buyer.user_details
                    ? order.buyer.user_details.ext_name
                    : ''}
                </p>
              </div>
            </div>
          ),
          contact_number: order.buyer.user_details.contact_number,
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
                      accept(order.order_number);
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
    fetchNumberOrdersByStatusUser(2);
    fetchNumberOrdersByStatusUser(3);
    setUserOrdersTable(1);
  }, []);

  return (
    <div>
      <OrdersTable
        loading={loading}
        setLoading={setLoading}
        header={header}
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
      />
    </div>
  );
}
