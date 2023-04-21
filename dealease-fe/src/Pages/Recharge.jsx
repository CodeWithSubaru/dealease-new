import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export function Recharge() {
  const [amountToShell, setAmountToShell] = useState(0);
  return (
    <div className='mx-auto w-75'>
      <Card>
        <h3>Recharge</h3>
        <Form>
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
