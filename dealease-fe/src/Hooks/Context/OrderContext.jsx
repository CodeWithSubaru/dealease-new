import { useState } from 'react';
import { Finalize } from '../../Components/Notification/Notification';
import { createContext, useContext } from 'react';
const OrderContext = createContext('default');

export function OrderProvider(props) {
  const [step1, setStep1] = useState([]);
  const [step2, setStep2] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [isDoneTransaction, setDoneTransaction] = useState(false);
  const [otherAddress, setOtherAddress] = useState({});

  return (
    <OrderContext.Provider
      value={{
        step1,
        setStep1,
        step2,
        setStep2,
        grandTotal,
        setGrandTotal,
        isDoneTransaction,
        setDoneTransaction,
        otherAddress,
        setOtherAddress,
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
}

export default function useOrderContext() {
  return useContext(OrderContext);
}
