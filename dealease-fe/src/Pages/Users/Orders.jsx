import { OrdersTable } from '../../Components/Pages/Orders';
import { useState, useEffect } from 'react';
import axiosClient from '../../api/axios';
import PUBLIC_URL from '../../api/public_url';
import Button from 'react-bootstrap/Button';
import { Finalize } from '../../Components/Notification/Notification';

export function OrdersBuyer() {
  const title = 'Buyer';
  const [body, setBody] = useState([]);
  const [pendingOrderNumber, setPendingOrderNumber] = useState(0);
  const [processingOrderNumber, setProcessingOrderNumber] = useState(0);
  const [deliveredOrderNumber, setDeliveredOrderNumber] = useState(0);
  const [viewOrderProduct, setViewOrderProduct] = useState(false);
  const [viewOrders, setViewOrders] = useState([]);

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

  function closeViewOrderProduct() {
    setViewOrderProduct(false);
  }

  function view(orderNumber) {
    setViewOrders([]);
    axiosClient
      .get('/orders/' + orderNumber)
      .then((res) => {
        setViewOrders(res.data);
        console.log(res);
      })
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
        setUserOrdersTable(1);
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

  function setUserOrdersTable(number) {
    setBody([]);
    axiosClient.get('/orders/orders-user/buyer/' + number).then((resp) => {
      const orders = resp.data.map((order, i) => {
        return {
          order_number: order.order_number,
          seller_name: (
            <div
              key={order.order_trans_id}
              className='d-flex'
              style={{ columnGap: '10px' }}
            >
              <img
                src={PUBLIC_URL + 'images/' + order.user.prof_img}
                className='rounded-circle pr-5'
                style={{ width: '50px', height: '50px' }}
              />
              <div>
                <p className='mb-0'>
                  {order.user.first_name}{' '}
                  {order.user.user_details
                    ? order.user.user_details.middle_name[0]
                    : ''}
                  {'. '}
                  {order.user.user_details
                    ? order.user.user_details.last_name
                    : ' '}{' '}
                  {order.user.user_details
                    ? order.user.user_details.ext_name
                    : ''}
                </p>
              </div>
            </div>
          ),
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
          payment_total_amount: 'Php ' + order.total_amount,
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
                  onClick={() => cancel(order.order_id)}
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
        body={body}
        title={title}
        pendingOrderNumber={pendingOrderNumber}
        processingOrderNumber={processingOrderNumber}
        deliveredOrderNumber={deliveredOrderNumber}
        viewOrderProduct={viewOrderProduct}
        viewOrders={viewOrders}
        closeViewOrderProduct={closeViewOrderProduct}
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
  const [viewOrderProduct, setViewOrderProduct] = useState(false);
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

  function accept(orderNumber) {
    Finalize({
      text: 'You want accept this order request',
      confirmButton: 'Yes',
      successMsg: 'Order Accepted Successfully.',
    }).then((res) => {
      if (res.isConfirmed) {
        axiosClient
          .put('/orders/' + orderNumber, { status: 2 })
          .then((resp) => console.log(resp))
          .catch((e) => console.log(e));
        setUserOrdersTable(1);
      }
    });
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
        console.log(res);
      })
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
        setUserOrdersTable(1);
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

  function setUserOrdersTable(number) {
    setBody([]);
    axiosClient.get('/orders/orders-user/seller/' + number).then((resp) => {
      const orders = resp.data.map((order, i) => {
        return {
          order_number: order.order_number,
          seller_name: (
            <div
              key={order.order_trans_id}
              className='d-flex'
              style={{ columnGap: '10px' }}
            >
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
          title: order.product.title,
          weight: order.weight,
          stocks: order.product.stocks_per_kg,
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
          payment_total_amount: 'Php ' + order.total_price,
          created_at: dateFormat(order.created_at),
          action: (
            <div key={i} className='button-actions text-light d-flex'>
              <Button
                variant='primary'
                onClick={() => {
                  accept(order.order_number);
                }}
                style={{ cursor: 'pointer' }}
                className='badge rounded text-bg-primary px-2 me-2'
              >
                Accept
              </Button>
            </div>
          ),
        };
      });
      setBody(orders);
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
        body={body}
        title={title}
        pendingOrderNumber={pendingOrderNumber}
        processingOrderNumber={processingOrderNumber}
        deliveredOrderNumber={deliveredOrderNumber}
        viewOrderProduct={viewOrderProduct}
        viewOrders={viewOrders}
        closeViewOrderProduct={closeViewOrderProduct}
        status={status}
        calculateGrandTotalPrice={calculateGrandTotalPrice}
        setUserOrdersTable={setUserOrdersTable}
        fetchNumberOrdersByStatusUser={fetchNumberOrdersByStatusUser}
      />
    </div>
  );
}
