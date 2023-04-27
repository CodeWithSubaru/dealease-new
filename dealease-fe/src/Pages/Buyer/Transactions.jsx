import axiosClient from '../../api/axios';
import { Transactions } from '../../Components/Pages/Transactions';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faClose } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import PUBLIC_URL from '../../api/public_url';

export function TransactionsBuyer() {
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
      prop: 'payment_status',
      isFilterable: true,
      isSortable: true,
    },
    {
      title: 'Description',
      prop: 'payment_description',
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
    if (user.is_buyer === 'Buyer') {
      return user.is_buyer;
    }

    if (user.is_seller === 'Seller') {
      return user.is_seller;
    }

    if (
      user.is_buyer === 'Buyer_seller1' ||
      user.is_seller === 'Buyer_seller2'
    ) {
      return 'Buyer + Seller';
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

  function setBuyerTransactionsDataTable() {
    axiosClient.get('/transactions').then((resp) => {
      const transactions = resp.data.map((transaction, i) => {
        return {
          payment_number: i + 1,
          fullname: (
            <div key={i} className='d-flex' style={{ columnGap: '10px' }}>
              <img
                src={PUBLIC_URL + 'images/' + transaction.user.prof_img}
                className='rounded-circle pr-5'
                style={{ width: '50px', height: '50px' }}
              />
              <div>
                <p className='mb-0'>
                  {
                    transaction.user.first_name +
                      ' ' +
                      // transaction.user.user_details.middle_name +
                      // '.' +
                      ' ' +
                      // transaction.user_details.last_name +
                      ' '
                    // transaction.user_details.ext_name
                  }
                </p>
                <span className='badge rounded-pill text-bg-primary'>
                  {switchUserType(transaction.user)}
                </span>
              </div>
            </div>
          ),
          payment_status: (
            <span className='border border-2 border-warning rounded px-2 text-uppercase bg-warning bg-opacity-50 text-light'>
              {status(transaction.payment_status)}
            </span>
          ),
          payment_description: transaction.payment_description,
          payment_total_amount: 'Php ' + transaction.payment_total_amount,
          created_at: dateFormat(transaction.created_at),
          // action: (
          //   <div key={i} className='button-actions text-light d-flex'>
          //     <Button
          //       variant='primary'
          //       onClick={() => viewCompleteDetails(user.user_id)}
          //       style={{ cursor: 'pointer' }}
          //       className='p-2 me-2 rounded'
          //     >
          //       <FontAwesomeIcon icon={faCheck} className='mx-2' />
          //     </Button>
          //     <Button
          //       variant='danger'
          //       onClick={() => findUser(user.user_id)}
          //       style={{ cursor: 'pointer' }}
          //       className='p-2 2 rounded'
          //     >
          //       <FontAwesomeIcon icon={faClose} className='mx-2' />
          //     </Button>
          //   </div>
          // ),
        };
      });

      setBody(transactions);
    });
  }

  useEffect(() => {
    setBuyerTransactionsDataTable();
  }, [body.id]);

  console.log(body);

  return (
    <>
      <Transactions header={header} body={body} />
    </>
  );
}
