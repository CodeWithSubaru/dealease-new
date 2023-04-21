import { createContext, useContext, useState } from 'react';
import axiosClient from '../../api/axios';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState({});

  function fetchProduct() {
    axiosClient.get('/seller/shop').then((resp) => {
      setProducts(resp.data);
    });
  }

  function fetchPublicProducts() {
    axiosClient.get('/public/product').then((resp) => {
      setProducts(resp.data);
    });
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        fetchProduct,
        fetchPublicProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default function useProductContext() {
  return useContext(ProductContext);
}
