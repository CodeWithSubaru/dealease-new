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

  function fetchThisWeek() {
    setProducts({});
    setLoading(true);
    axiosClient.get('/product/this-week').then((resp) => {
      setProducts(resp.data);
      setLoading(false);
    });
  }

  function fetchThisDay() {
    setProducts({});
    setLoading(true);
    axiosClient.get('/product/this-day').then((resp) => {
      setProducts(resp.data);
      setLoading(false);
    });
  }

  function fetchAvailable() {
    setProducts({});
    setLoading(true);
    axiosClient.get('/product/available').then((resp) => {
      setProducts(resp.data);
      setLoading(false);
    });
  }

  function searchProduct(e) {
    setProducts({});
    setLoading(true);
    setTimeout(() => {
      axiosClient.get('product/search/' + e.target.value).then((res) => {
        setProducts(res.data);
        setLoading(false);
      }, 1500);
    });
    clearTimeout(timeout);
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        fetchProduct,
        fetchPublicProducts,
        loading,
        setLoading,
        fetchThisWeek,
        fetchThisDay,
        fetchAvailable,
        searchProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default function useProductContext() {
  return useContext(ProductContext);
}
