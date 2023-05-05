import { useState } from 'react';
import { Finalize } from '../../Components/Notification/Notification';
import { createContext, useContext } from 'react';
const OrderContext = createContext('default');

export function OrderProvider(props) {
  const [step1, setStep1] = useState([]);
  const [step2, setStep2] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [isDoneTransaction, setDoneTransaction] = useState(false);

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
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
}

export default function useOrderContext() {
  return useContext(OrderContext);
}

// Finalize({
//     confirmButton: 'Yes, Place my order',
//     text: "You won't be able to revert this!",
//     successMsg: 'Your Order Placed Successfully.',
//   }).then((res) => {
//     if (res.isConfirmed) {
//       // axiosClient
//       //   .post('/orders/place-order', {
//       //     cartHistoryBySellerId,
//       //   })
//       //   .then((res) => console.log(res))
//       //   .catch((e) => console.log(e));
//       // fetchCountInItemsCart();
//       // fetchCartHistoryBySellerId();
//       // navigate('/orders');
//     }
//   });
