import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import axiosClient from '../../api/axios';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Notification } from '../../Components/Notification/Notification';

export function Recharge() {
  const [errors, setErrors] = useState([]);
  const [amountToShell, setAmountToShell] = useState(0);
  const data = {
    amountToShell,
  };
  // Submit Recharge
  const handleRecharge = (e) => {
    e.preventDefault();
    console.log(data);
    axiosClient
      .post('/recharge', data)
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          Notification({
            title: 'Success',
            message: 'cute mo po',
            icon: 'success',
          }).then(() => {
            setAmountToShell('');
          });
        }
      })
      .catch((e) => {
        Notification({
          title: 'Error',
          message: 'Errors Found',
          icon: 'error',
        });
        setErrors(e.response.data.errors);
      });
  };

  return (
    <div className='mx-auto w-75'>
      <Card>
        <h3>Recharge</h3>
        <Form onSubmit={handleRecharge}>
          <Form.Control
            type='number'
            min=''
            max='99999999'
            placeholder='Enter your Amount'
            value={amountToShell}
            onChange={(e) => setAmountToShell(e.target.value)}
          />
          <FontAwesomeIcon icon={faArrowRightArrowLeft} />
          <p> 1.50 Shell Coins</p>
          <Button type='submit' variant='primary'>
            Purchase
          </Button>
        </Form>
        <p> Converted Amount: {amountToShell * 1.5}</p>
      </Card>
    </div>
  );
}
