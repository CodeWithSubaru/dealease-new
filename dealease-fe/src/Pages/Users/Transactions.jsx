import axiosClient from '../../api/axios';
import { Transactions } from '../../Components/Pages/Transactions';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faClose, faRefresh } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import PUBLIC_URL from '../../api/public_url';
import { SidebarUser } from '../../Components/Sidebar/Sidebar';

export function TransactionsUser() {
  const [body, setBody] = useState([]);
  const [loading, setLoading] = useState(false);
  const [numberOfUnderReviewTransaction, setNumberOfUnderReviewTransaction] =
    useState(0);
  const [numberOfApprovedTransaction, setNumberOfApprovedTransaction] =
    useState(0);
  const [numberOfCancelledTransaction, setNumberOfCancelledTransaction] =
    useState(0);

  const header = [
    {
      title: 'Id',
      prop: 'id',
      isSortable: true,
    },
    {
      title: 'Payment Number',
      prop: 'payment_number',
      isSortable: true,
    },
    {
      title: 'Full Name',
      prop: 'fullname',
    },
    {
      title: 'Other Details',
      prop: 'other_details',
      isFilterable: true,
    },
    {
      title: 'Status',
      prop: 'payment_status',
      isFilterable: true,
      isSortable: true,
    },
    {
      title: 'Total Amount',
      prop: 'payment_total_amount',
      isSortable: true,
    },
    {
      title: 'Description',
      prop: 'payment_description',
    },
    {
      title: 'Date Request',
      prop: 'created_at',
      isSortable: true,
    },
    // { title: 'Action', prop: 'action' },
  ];

  function fetchUnderReviewTransaction() {
    axiosClient.get('/admin/transactions/under-review').then((res) => {
      setNumberOfUnderReviewTransaction(res.data);
    });
  }

  function fetchApprovedTransaction() {
    axiosClient.get('/admin/transactions/approved').then((res) => {
      setNumberOfApprovedTransaction(res.data);
    });
  }

  function fetchCancelledTransaction() {
    axiosClient.get('/admin/transactions/cancelled').then((res) => {
      console.log(res);
      setNumberOfCancelledTransaction(res.data);
    });
  }

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

  function switchColor(status) {
    if (status === '0') {
      return 'border-danger bg-danger bg-opacity-75 text-light';
    }

    if (status === '1') {
      return 'border-warning bg-warning bg-opacity-75 text-light';
    }
    if (status === '2') {
      return 'border-primary bg-primary bg-opacity-75 text-light';
    }
    if (status === '3') {
      return 'border-secondary bg-secondary bg-opacity-75 text-light';
    }
  }

  function status(status) {
    if (status === '0') {
      return 'Declined';
    }
    if (status === '1') {
      return 'Pending';
    }
    if (status === '2') {
      return 'Approved';
    }
  }

  function setUserTransactionsDataTable(id) {
    setBody([]);
    setLoading(true);
    axiosClient
      .get('/admin/transactions/show/transactions/' + id)
      .then((resp) => {
        const transactions = resp.data.map((transaction, i) => {
          return {
            id: i + 1,
            payment_number: transaction.payment_number,
            fullname: (
              <div key={i} className='d-flex' style={{ columnGap: '10px' }}>
                <img
                  src={PUBLIC_URL + 'images/' + transaction.user.prof_img}
                  className='rounded-circle pr-5'
                  style={{ width: '50px', height: '50px' }}
                />
                <div>
                  <p className='mb-0'>
                    {transaction.user.first_name + ' '}
                    {transaction.user.user_details.middle_name
                      ? transaction.user.user_details.middle_name[0] + '. '
                      : ''}
                    {transaction.user.user_details.last_name}{' '}
                    {transaction.user.user_details.ext_name
                      ? transaction.user.user_details.ext_name
                      : ''}
                  </p>
                </div>
              </div>
            ),
            other_details: (
              <>
                <span>
                  {' '}
                  <span className='fw-semibold'>Email: </span>{' '}
                  {transaction.user.email}
                </span>{' '}
                <span>
                  <span className='fw-semibold'> Contact #:</span>{' '}
                  {transaction.user.user_details.contact_number
                    ? transaction.user.user_details.contact_number
                    : ''}
                </span>
              </>
            ),

            payment_status: (
              <span
                className={
                  'text-nowrap rounded px-2 text-uppercase border border-2 ' +
                  switchColor(transaction.payment_status)
                }
              >
                {status(transaction.payment_status)}
              </span>
            ),
            payment_description: transaction.payment_description,
            payment_total_amount: (
              <>
                {' '}
                <img
                  src='/images/seashell.png'
                  height={25}
                  width={25}
                  className='mx-1'
                  alt=''
                />{' '}
                {transaction.payment_total_amount}
              </>
            ),
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
        setLoading(false);
      });
  }

  useEffect(() => {
    setUserTransactionsDataTable(1);
    fetchUnderReviewTransaction();
    fetchApprovedTransaction();
  }, [body.id]);

  return (
    <>
      <div style={{ display: 'flex', height: '100%' }}>
        <SidebarUser />
        <main className='w-100' style={{ height: '85vh' }}>
          <Transactions
            header={header}
            body={body}
            changePaymentStatus={setUserTransactionsDataTable}
            loading={loading}
            numberOfUnderReviewTransaction={numberOfUnderReviewTransaction}
            numberOfApprovedTransaction={numberOfApprovedTransaction}
            numberOfCancelledTransaction={numberOfCancelledTransaction}
            fetchUnderReviewTransaction={fetchUnderReviewTransaction}
            fetchApprovedTransaction={fetchApprovedTransaction}
            fetchCancelledTransaction={fetchCancelledTransaction}
          />
        </main>
      </div>
    </>
  );
}
