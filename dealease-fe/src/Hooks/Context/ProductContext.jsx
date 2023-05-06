import { createContext, useContext, useState } from 'react';
import axiosClient from '../../api/axios';
import useAuthContext from './AuthContext';

const ProductContext = createContext('default');

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(false);

  function fetchProduct() {
    axiosClient.get('/seller/product').then((resp) => {
      setProducts(resp.data);
    });
  }

  function fetchPublicProducts(id) {
    setProducts({});
    setLoading(true);
    axiosClient.get('/public/product/' + id).then((resp) => {
      setProducts(resp.data);
      setLoading(false);
    });
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        fetchProduct,
        fetchPublicProducts,
        loading,
        setLoading,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default function useProductContext() {
  return useContext(ProductContext);
}
