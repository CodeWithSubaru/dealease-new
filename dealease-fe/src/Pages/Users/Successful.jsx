import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import useAuthContext from '../../Hooks/Context/AuthContext';
import useOrderContext from '../../Hooks/Context/OrderContext';
import { Link, useNavigate } from 'react-router-dom';

export function SuccessfulUser() {
  const { user } = useAuthContext();
  const { step1, step2, setStep1, setStep2, grandTotal, setGrandTotal } =
    useOrderContext();
  const navigate = useNavigate();

  if (step1.length === 0 || step2.length === 0) {
    return navigate('../shipping');
  }

  return (
    <div className='mx-auto w-75'>
      <Card style={{ height: '85vh' }}>
        <div className='d-flex justify-content-center align-items-center h-100 p-5'>
          <div
            className='border-end border-2 border-info pe-3 w-50'
            style={{ height: '65vh', overflowY: 'auto' }}
          >
            <p>
              {' '}
              <span className='fw-bold'> Order Number :</span> #ORD000001
            </p>
            <div className='border border-2 border-info rounded p-3 mb-5'>
              <h4 className='fw-light mb-3'> Customer Information</h4>
              <div className='d-flex justify-content-between'>
                <div>
                  <h6 className='fw-light mb-1 text-secondary'>
                    Contact Information
                  </h6>
                  <p>
                    {' '}
                    {user.first_name}{' '}
                    {user.user_details ? user.user_details.middle_name[0] : ''}{' '}
                    {'. '}{' '}
                    {user.user_details ? user.user_details.last_name : ''}{' '}
                    {user.user_details ? user.user_details.ext_name : ''}
                  </p>
                </div>
                <div>
                  <h6 className='fw-light text-secondary'>Payment Method</h6>
                  <p> Cash on Delivery (COD) - Php 2602</p>
                </div>
              </div>
              <div>
                <h6 className='fw-light mb-1 text-secondary'>
                  Shipping Address
                </h6>
                <span className='d-block'>Street</span>
                <span className='d-block'>Barangay</span>
                <span className='d-block'>Obando</span>
                <span className='d-block'>Bulacan</span>
                <span className='d-block'>Region III (Central Luzon)</span>
              </div>
            </div>
            <div className='border border-2 border-info rounded p-3 bg-info bg-opacity-25 mb-4'>
              <div className='d-flex justify-content-between'>
                <span className='fw-semibold'>Total Order Amount</span>
                <span>{2} shells</span>
              </div>
            </div>
            <div className='border border-2 border-info rounded p-3 bg-info bg-opacity-25 mb-4'>
              <div className='d-flex justify-content-between'>
                <span className='fw-semibold'>Delivery Fee</span>
                <span>{20 * 1.5 * 2} shells</span>
              </div>
            </div>
            <div className='d-flex justify-content-end'>
              <span className='d-block'>
                <Link
                  to='/home'
                  className='rounded px-3 me-2 text-decoration-none text-success'
                  type='submit'
                >
                  Shop Again
                </Link>

                <Link
                  to='/orders'
                  className='btn btn-primary text-light rounded px-3'
                  type='submit'
                >
                  My Orders
                </Link>
              </span>
            </div>
          </div>
          <div className='d-flex flex-column justify-content-center align-items-center ps-3 w-50'>
            <FontAwesomeIcon
              icon={faCircleCheck}
              className='text-success mb-2'
              style={{ fontSize: '70px' }}
            />
            <h1 className='fw-semibold capitalize mb-3'>Successful</h1>
            <p className='mb-0'>Your order is on pending.</p>
            <p>Please wait for the confirmation of Seller</p>
            <hr />
          </div>
        </div>
      </Card>
    </div>
  );
}
