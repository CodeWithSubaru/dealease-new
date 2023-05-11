import { useState } from 'react';
import { Notification, Finalize } from '../Notification/Notification';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../api/axios';
import Form from 'react-bootstrap/Form';
import useAuthContext from '../../Hooks/Context/AuthContext';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export function Withdraw() {
  // Withdraw from shell into money
  const { user, fetchUserInfo } = useAuthContext();
  const [shellToConvert, setShellToConvert] = useState(0);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  return (
    <Card className='mx-auto w-75'>
      <div className='p-5'>
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
                    wallet: 0,
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
          <h1>Request for Withdrawal</h1>
          <Form.Group>
            <Form.Label className='text-black'>Shell amount</Form.Label>
            <Form.Control
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
            />
            <Form.Control.Feedback type='invalid'>
              {errors.length > 0
                ? errors
                : shellToConvert >
                    Number(user.wallet ? user.wallet.shell_coin_amount : 0) &&
                  'Insufficient Balance!'}
            </Form.Control.Feedback>
            Converted to Peso
            <br />
            Php {Number(shellToConvert).toFixed(2)}
          </Form.Group>

          <Button
            type='submit'
            variant='primary'
            disabled={
              shellToConvert >
                Number(user.wallet ? user.wallet.shell_coin_amount : 0) ||
              shellToConvert < 100
            }
            className='rounded'
          >
            Withdraw
          </Button>
        </Form>
      </div>
    </Card>
  );
}
