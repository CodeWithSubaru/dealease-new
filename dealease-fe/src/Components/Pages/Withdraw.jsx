import { useState } from 'react';
import { Notification, Finalize } from '../Notification/Notification';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../api/axios';
import Form from 'react-bootstrap/Form';
import useAuthContext from '../../Hooks/Context/AuthContext';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Container } from 'react-bootstrap';
import '../../assets/scss/withdraw.scss';
export function Withdraw() {
  // Withdraw from shell into money
  const { user, fetchUserInfo } = useAuthContext();
  const [shellToConvert, setShellToConvert] = useState(0);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  // get the total fee
  function calculateFee() {
    if (shellToConvert === 1000) {
      return 20;
    } else {
      let amountToMultiply = Math.ceil(shellToConvert / 500);
      return amountToMultiply * 10;
    }
  }

  return (
    <Container className='withdraw-container'>
      <Card className='withdraw-card'>
        <div className=''>
          <Form
            onSubmit={(e) => {
              e.preventDefault();

              Finalize({
                text: 'Are you sure, Withdraw?',
                confirmButton: 'Yes',
                successMsg: 'Transaction Confirmed Successfully.',
              }).then((res) => {
                if (res.isConfirmed) {
                  axiosClient
                    .post('/request-withdrawal', {
                      amountToWithdraw: shellToConvert - calculateFee(),
                      shell_coin_amount: shellToConvert,
                    })
                    .then((res) => {
                      if (res.status === 200) {
                        setShellToConvert('');
                        setErrors([]);
                        fetchUserInfo();
                        navigate('/transactions');
                      }
                    })
                    .catch((e) => {
                      Notification({
                        title: 'Error',
                        message: 'Something went wrong',
                        icon: 'error',
                      }).then(() => {
                        setErrors(e.response.data.message);
                        console.log(e);
                      });
                    });
                }
              });
            }}
          >
            <img
              src='/images/seashell.png'
              className='me-2 d-inline-block align-top'
              width='25'
              height='25'
            ></img>
            {user.wallet ? user.wallet.shell_coin_amount : null}
            <h1 className='fs-1 request-title mb-3'>Request for Withdrawal</h1>
            <Form.Group>
              <Form.Label className='text-black'>Shell amount</Form.Label>
              <Form.Control
                style={{ margin: '0px 10px 0px  5px', width: '95%' }}
                type='number'
                onChange={(e) => {
                  setShellToConvert(e.target.value);
                  setErrors([]);
                }}
                isInvalid={
                  shellToConvert >
                    Number(user.wallet ? user.wallet.shell_coin_amount : 0) ||
                  !!errors.length > 0
                }
                className='mb-3'
              />
              <Form.Control.Feedback type='invalid'>
                {errors.length > 0
                  ? errors
                  : shellToConvert - calculateFee() >
                      Number(user.wallet ? user.wallet.shell_coin_amount : 0) &&
                    'Insufficient Balance!'}
              </Form.Control.Feedback>
              <span className=''>
                <span className='mb-2'> Converted to Peso </span>
                <br />
                Shell {shellToConvert} - Fee {calculateFee()}
                {' = '}
                Php {shellToConvert - calculateFee()}
              </span>
            </Form.Group>

            <Button
              type='submit'
              variant='primary'
              disabled={
                shellToConvert >
                  Number(user.wallet ? user.wallet.shell_coin_amount : 0) ||
                shellToConvert < 1000
              }
              className='rounded mt-3 w-100'
            >
              Withdraw
            </Button>
          </Form>
        </div>
      </Card>
    </Container>
  );
}
