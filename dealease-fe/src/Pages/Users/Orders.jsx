import Card from 'react-bootstrap/Card';
import { OrdersTable } from '../../Components/Pages/Orders';
import { useEffect, useState } from 'react';
import axiosClient from '../../api/axios';
import PUBLIC_URL from '../../api/public_url';

export function OrdersUser() {
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

  function switchUserType(user) {
    if (user.role_type === 'User') {
      return user.role_type;
    }

    if (user.is_seller === 'Rider') {
      return user.role_type;
    }

    if (user.role_type === 'Admin') {
      return user.role_type;
    }
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

  function setUserOrdersTable($id) {
    axiosClient.get('/orders/orders-of-user').then((resp) => {
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
                  {order.product.user.first_name +
                    ' ' +
                    order.product.user.user_details.middle_name +
                    '.' +
                    ' ' +
                    order.product.user.user_details.last_name +
                    ' ' +
                    order.product.user.user_details.ext_name}
                </p>
                <span className='badge rounded-pill text-bg-primary'>
                  {switchUserType(order.product.user)}
                </span>
              </div>
            </div>
          ),
          order_status: (
            <span className='border border-2 border-warning rounded px-2 text-uppercase bg-warning bg-opacity-50 text-light'>
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
    setUserOrdersTable();
  }, []);

  return (
    <div>
      <Card className='mx-auto w-75'>
        <OrdersTable header={header} body={body} />
      </Card>
    </div>
  );
}
