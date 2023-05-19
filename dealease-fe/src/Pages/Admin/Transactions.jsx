import axiosClient from '../../api/axios';
import { Transactions } from '../../Components/Pages/Transactions';
import { useState, useEffect } from 'react';
import PUBLIC_URL from '../../api/public_url';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Button, Modal, Nav } from 'react-bootstrap';
import {
  Notification,
  Finalize,
} from '../../Components/Notification/Notification';
import useAuthContext from '../../Hooks/Context/AuthContext';

export function TransactionsAdmin() {
  const [body, setBody] = useState([]);
  const [loading, setLoading] = useState([]);
  const [numberOfUnderReviewTransaction, setNumberOfUnderReviewTransaction] =
    useState(0);
  const [numberOfApprovedTransaction, setNumberOfApprovedTransaction] =
    useState(0);
  const [numberOfCancelledTransaction, setNumberOfCancelledTransaction] =
    useState(0);
  const [viewModal, setViewModal] = useState(false);
  const [showData, setData] = useState([]);
  const [loader, setLoader] = useState(false);

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
      setNumberOfCancelledTransaction(res.data);
    });
  }

  function confirmRecharge(id) {
    Finalize({
      text: 'Are you sure, You want to confirm this transaction?',
      confirmButton: 'Yes',
      successMsg: 'Transaction Confirmed Successfully.',
    }).then((res) => {
      if (res.isConfirmed) {
        axiosClient
          .put('/admin/confirm-recharge/' + id)
          .then((res) => setUserTransactionsDataTable(1))
          .catch((err) => setErrors(err.response.data.errors));

        setUserTransactionsDataTable(1);
        fetchUnderReviewTransaction();
        fetchApprovedTransaction();
        fetchCancelledTransaction();
      }
    });
  }

  function confirmWithdraw(id) {
    Finalize({
      text: 'Are you sure, You want to confirm this transaction?',
      confirmButton: 'Yes',
      successMsg: 'Transaction Confirmed Successfully.',
    }).then((res) => {
      if (res.isConfirmed) {
        axiosClient
          .put('/admin/confirm-withdraw/' + id)
          .then((res) => setUserTransactionsDataTable(1))
          .catch((err) => setErrors(err.response.data.errors));

        setUserTransactionsDataTable(1);
        fetchUnderReviewTransaction();
        fetchApprovedTransaction();
        fetchCancelledTransaction();
      }
    });
  }

  function decline(url, id) {
    console.log(url);
    Finalize({
      text: 'You want to decline this request?',
      confirmButton: 'Yes',
      successMsg: 'Transaction Declined Successfully.',
    }).then((res) => {
      if (res.isConfirmed) {
        axiosClient
          .put(url + id)
          .then((resp) => {
            console.log(resp);
          })
          .catch((e) => console.log(e));
        setUserTransactionsDataTable(1);
        fetchUnderReviewTransaction();
        fetchApprovedTransaction();
        fetchCancelledTransaction();
      }
    });
  }

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
      title: 'Amount',
      prop: 'payment_total_amount',
      isSortable: true,
    },
    {
      title: 'Description',
      prop: 'payment_description',
      isSortable: true,
    },

    {
      title: 'Date Request',
      prop: 'created_at',
      isSortable: true,
    },
    { title: 'Action', prop: 'action' },
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
    if (status === '3') {
      return 'Approved';
    }
    if (status === '4') {
      return 'Approved';
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
      return 'border-primary bg-primary bg-opacity-75 text-light';
    }
    if (status === '3') {
      return 'border-secondary bg-secondary bg-opacity-75 text-light';
    }
  }

  function checkDetails(session_id) {
    setLoader(true);
    setViewModal(true);
    setData([]);
    axiosClient
      .get('/admin/transaction/paymongo/' + session_id)
      .then((resp) => {
        setLoader(false);
        setData(resp.data.data.attributes.payments);
      });
  }

  function setUserTransactionsDataTable(id) {
    setBody([]);
    setLoading(true);
    axiosClient
      .get('/admin/transactions/show/transactions/' + id)
      .then((resp) => {
        console.log(resp);
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
              <div className='d-flex align-items-center text-nowrap'>
                {' '}
                {transaction.payment_description === 'Recharge' ? (
                  <>
                    <span> Php {transaction.payment_total_amount}</span>{' '}
                    <span className='mx-1'> &rarr; </span>{' '}
                    <img
                      src='/images/seashell.png'
                      height={20}
                      width={20}
                      className='mx-1 me-1'
                      alt=''
                    />{' '}
                    {transaction.shells}
                  </>
                ) : (
                  <>
                    <span>
                      <img
                        src='/images/seashell.png'
                        height={20}
                        width={20}
                        className='mx-1 me-1'
                        alt=''
                      />{' '}
                      {transaction.shells}{' '}
                    </span>{' '}
                    <span className='mx-1'> &rarr; </span> Php{' '}
                    {transaction.payment_total_amount}
                  </>
                )}
              </div>
            ),
            created_at: dateFormat(transaction.created_at),
            action: (
              <div key={i} className='button-actions text-light d-flex'>
                {transaction.payment_status === '1' && (
                  <>
                    <Button
                      variant='primary'
                      onClick={() =>
                        checkDetails(transaction.checkout_session_id)
                      }
                      style={{ cursor: 'pointer' }}
                      className='badge rounded px-2 me-2 btn'
                    >
                      View
                    </Button>
                    <Button
                      variant='primary'
                      onClick={() =>
                        transaction.payment_description === 'Recharge'
                          ? confirmRecharge(transaction.payment_number)
                          : confirmWithdraw(transaction.payment_number)
                      }
                      style={{ cursor: 'pointer' }}
                      className='badge rounded px-2 me-2 btn'
                    >
                      Confirm
                    </Button>
                    <Button
                      variant='danger'
                      onClick={() =>
                        transaction.payment_description === 'Recharge'
                          ? decline(
                              '/admin/decline-recharge/',
                              transaction.payment_number
                            )
                          : decline(
                              '/admin/decline-withdraw/',
                              transaction.payment_number
                            )
                      }
                      style={{ cursor: 'pointer' }}
                      className='badge rounded px-2 me-2 btn'
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            ),
          };
        });
        setLoading(false);
        fetchUnderReviewTransaction();
        fetchApprovedTransaction();
        setBody(transactions);
      });
  }

  useEffect(() => {
    setUserTransactionsDataTable(1);
    fetchUnderReviewTransaction();
    fetchApprovedTransaction();
  }, [body.id]);

  return (
    <>
      {/* Modal */}
      <Modal
        size='lg'
        show={viewModal}
        onHide={() => setViewModal(false)}
        animation={true}
        aria-labelledby='contained-modal-title-vcenter'
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            Payment Status
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className='mb-0'>
            {!loader
              ? showData.length > 0
                ? 'Paid'
                : 'Not Paid Yet'
              : 'Loading...'}
          </p>

          {console.log(showData)}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setViewModal(false)} className='rounded'>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

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
    </>
  );
}
