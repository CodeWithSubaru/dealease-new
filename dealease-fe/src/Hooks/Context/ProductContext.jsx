import { createContext, useContext, useState } from 'react';
import axiosClient from '../../api/axios';
import useAuthContext from './AuthContext';

const ProductContext = createContext('default');

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();

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

  function fetchThisWeek(id) {
    setProducts({});
    setLoading(true);
    axiosClient.get('/product/this-week/' + id).then((resp) => {
      setProducts(resp.data);
      setLoading(false);
    });
  }

  function fetchThisDay(id) {
    setProducts({});
    setLoading(true);
    axiosClient.get('/product/this-day/' + id).then((resp) => {
      setProducts(resp.data);
      setLoading(false);
    });
  }

  function fetchAvailable(id) {
    setProducts({});
    setLoading(true);

    axiosClient.get('/product/available/' + id).then((resp) => {
      setProducts(resp.data);
      setLoading(false);
    });
  }

  function searchProduct(e) {
    if (e.target.value !== '') {
      setProducts({});
      setLoading(true);
      setTimeout(() => {
        axiosClient.get('product/search/' + e.target.value).then((res) => {
          setProducts(res.data);
          setLoading(false);
        });
      }, 1500);
    }
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
