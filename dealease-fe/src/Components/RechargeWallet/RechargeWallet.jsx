import { Modal, Button, Form } from 'react-bootstrap';
import useAuthContext from '../../Hooks/Context/AuthContext';
import { useState } from 'react';
import { Finalize } from '../Notification/Notification';
import axiosClient from '../../api/axios';
import { useNavigate } from 'react-router-dom';

export function RechargeWallet(props) {
  const openPaymongo = (url) => {
    window.open(url, '_blank', 'noreferrer');
  };

  const { user } = useAuthContext();
  const [active, setActive] = useState(-1);
  const [amount, setAmount] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [erorrs, setErrors] = useState([]);
  const navigate = useNavigate();

  function calculateTotal(amount) {
    let totalAmount = amount * Math.trunc(quantity);

    if (totalAmount > 100000) {
      return 100000;
    } else {
      return totalAmount;
    }
  }

  const data = {
    amount: calculateTotal(amount),
  };

  // Submit Recharge
  const handleRecharge = (e) => {
    e.preventDefault();
    Finalize({
      text: 'Are you sure, Recharge?',
      confirmButton: 'Yes',
      successMsg: 'Transaction Confirmed Successfully.',
    }).then((res) => {
      if (res.isConfirmed) {
        axiosClient
          .post('/recharge', data)
          .then((res) => {
            setActive(-1);
            setAmount(0);
            setQuantity(0);
            setErrors([]);
            props.setModalShow(false);
            navigate('/transactions');
            openPaymongo(res.data[0].original.data.attributes.checkout_url);
          })
          .catch((e) => {
            new Notification({
              title: 'Error',
              message: 'Errors Found',
              icon: 'error',
            });
            setErrors(e.response.data.errors);
          });
      }
    });
  };

  return (
    <Modal
      show={props.modalShow}
      onHide={() => props.setModalShow(false)}
      dialogClassName='wallet-modal modal-md '
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Wallet balance{' '}
          <img
            src='/images/seashell.png'
            className='ms-2 me-2 d-inline-block align-top'
            width='30'
            height='30'
          ></img>
          {user.wallet ? user.wallet.shell_coin_amount : null}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body closeButton>
        <Form onSubmit={handleRecharge}>
          <div className='mb-2 fw-semibold d-flex justify-content-between'>
            <span> Recharge</span>
            <a href='/withdraw'>Withdraw</a>
          </div>
          {/* start */}
          <div
            className={
              'mb-4 rounded p-3 border border-2 ' +
              (active === 0
                ? 'border-info bg-info bg-opacity-25'
                : 'border-black-subtle')
            }
          >
            <div className='d-flex justify-content-between'>
              <div>
                <Form.Check controlId='50'>
                  <Form.Check.Input
                    name='plan'
                    type='radio'
                    className='mt-1'
                    id='50'
                    value={50}
                    onClick={() => {
                      setActive(0);
                      setAmount(50);
                    }}
                  />
                  <Form.Label
                    className='fw-semibold text-black ms-2'
                    htmlFor='50'
                  >
                    Php 50
                  </Form.Label>
                </Form.Check>
              </div>
              <span className='d-flex align-items-center'>
                <img
                  src='/images/seashell.png'
                  height={25}
                  width={25}
                  alt=''
                  className='mx-2'
                />{' '}
                <span>50</span>
              </span>
            </div>
          </div>
          {/* end */}

          {/* start */}
          <div
            className={
              'mb-4 rounded p-3 border border-2 ' +
              (active === 1
                ? 'border-info bg-info bg-opacity-25'
                : 'border-black-subtle')
            }
          >
            <div className='d-flex justify-content-between'>
              <Form.Check controlId='100'>
                <Form.Check.Input
                  name='plan'
                  type='radio'
                  id='100'
                  className='mt-1'
                  value={100}
                  onClick={() => {
                    setActive(1);
                    setAmount(100);
                  }}
                />
                <Form.Label
                  className='fw-semibold text-black ms-2'
                  htmlFor='100'
                >
                  Php 100
                </Form.Label>
              </Form.Check>
              <span className='d-flex align-items-center'>
                <img
                  src='/images/seashell.png'
                  height={25}
                  width={25}
                  alt=''
                  className='mx-2'
                />{' '}
                <span>100</span>
              </span>
            </div>
          </div>
          {/* end */}

          {/* start */}
          <div
            className={
              'mb-4 rounded p-3 border border-2 ' +
              (active === 2
                ? 'border-info bg-info bg-opacity-25'
                : 'border-black-subtle')
            }
          >
            <div className='d-flex justify-content-between'>
              <Form.Check controlId='250'>
                <Form.Check.Input
                  name='plan'
                  type='radio'
                  id='250'
                  className='mt-1'
                  value={250}
                  onClick={() => {
                    setActive(2);
                    setAmount(250);
                  }}
                />
                <Form.Label
                  className='fw-semibold text-black ms-2'
                  htmlFor='250'
                >
                  Php 250
                </Form.Label>
              </Form.Check>
              <span className='d-flex align-items-center'>
                <img
                  src='/images/seashell.png'
                  height={25}
                  width={25}
                  alt=''
                  className='mx-2'
                  htmlFor='250'
                />{' '}
                <span>250</span>
              </span>
            </div>
          </div>
          {/* end */}

          {/* start */}
          <div
            className={
              'mb-4 rounded p-3 border border-2 ' +
              (active === 3
                ? 'border-info bg-info bg-opacity-25'
                : 'border-black-subtle')
            }
          >
            <div className='d-flex justify-content-between'>
              <Form.Check controlId='500'>
                <Form.Check.Input
                  name='plan'
                  type='radio'
                  id='500'
                  className='mt-1'
                  value={500}
                  onClick={() => {
                    setActive(3);
                    setAmount(500);
                  }}
                />
                <Form.Label
                  className='fw-semibold text-black ms-2'
                  htmlFor='500'
                >
                  Php 500
                </Form.Label>
              </Form.Check>
              <span className='d-flex align-items-center'>
                <img
                  src='/images/seashell.png'
                  height={25}
                  width={25}
                  alt=''
                  className='mx-2'
                />{' '}
                <span>500</span>
              </span>
            </div>
          </div>
          {/* end */}

          <div className='d-flex align-items-center justify-content-between mb-3'>
            <Form.Group className='d-flex align-items-center'>
              <Form.Label className='text-body me-3'> Quantity </Form.Label>
              <Form.Control
                type='number'
                className='w-25'
                min={0}
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
              />
            </Form.Group>
            <div className='d-flex flex-column text-end'>
              <h4>
                {' '}
                <img
                  src='/images/seashell.png'
                  height={25}
                  width={25}
                  alt=''
                  className='ml-1'
                  htmlFor='250'
                />{' '}
                {calculateTotal(amount).toLocaleString()}
              </h4>
              <p className='text-nowrap'>Grand total</p>
            </div>
          </div>

          <Button
            type='submit'
            className='rounded w-100'
            disabled={
              calculateTotal(amount) > 100000 || calculateTotal(amount) < 100
            }
          >
            Purchase
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
