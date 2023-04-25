import { createContext, useContext, useState } from 'react';
import { useEffect } from 'react';
import axiosClient from '../../api/axios';

const AddToCartContext = createContext();

export const AddToCartProvider = ({ children }) => {
  const [msgStatus, setMsgStatus] = useState('');
  const [status, setStatus] = useState('');
  const [countItemsInCart, setCountItemsInCart] = useState(0);

  function fetchCountInItemsCart() {
    axiosClient
      .get('/orders/items-in-cart-count')
      .then((res) => setCountItemsInCart(res.data));
  }

  useEffect(() => {
    function removeStatuses() {
      setTimeout(function () {
        setMsgStatus('');
        setStatus(false);
      }, 3000);
    }

    removeStatuses();

    return () => {
      removeStatuses();
    };
  }, [msgStatus]);

  return (
    <AddToCartContext.Provider
      value={{
        msgStatus,
        status,
        countItemsInCart,
        setStatus,
        setMsgStatus,
        fetchCountInItemsCart,
      }}
    >
      {children}
    </AddToCartContext.Provider>
  );
};

export default function useAddToCartContext() {
  return useContext(AddToCartContext);
}
