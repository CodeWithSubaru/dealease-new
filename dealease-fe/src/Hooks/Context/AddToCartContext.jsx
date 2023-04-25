import { createContext, useContext, useState } from 'react';
import { useEffect } from 'react';

const AddToCartContext = createContext();

export const AddToCartProvider = ({ children }) => {
  const [msgStatus, setMsgStatus] = useState('');
  const [status, setStatus] = useState('');

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
        setStatus,
        setMsgStatus,
      }}
    >
      {children}
    </AddToCartContext.Provider>
  );
};

export default function useAddToCartContext() {
  return useContext(AddToCartContext);
}
