import { createContext, useContext, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axiosClient from '../../api/axios';

const AuthContext = createContext({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
});

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
  const [user_type, _setUserType] = useState(localStorage.getItem('USER_TYPE'));
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const csrf = () => axiosClient.get('../sanctum/csrf-cookie');

  const setTokenAndUType = (token, type) => {
    _setToken(token);
    _setUserType(type);
    console.log(token, type);
    if (token && type) {
      localStorage.setItem('ACCESS_TOKEN', token);
      localStorage.setItem('USER_TYPE', type);
    } else {
      localStorage.removeItem('ACCESS_TOKEN');
    }
  };

  // Login Methods for each user
  const login = ({ ...data }, redirect) => {
    csrf();
    axiosClient
      .post('/login', data)
      .then((res) => {
        console.log(res);
        if (res.data.user[0].role_type === 'Admin') {
          setTokenAndUType(res.data.token, res.data.user[0].role_type);
          console.log('Admin');
        }

        if (res.data.user[0].role_type === 'User') {
          if (res.data.user[0].is_buyer === 'Buyer' || res.data.user[0].is_buyer === 'Buyer_Seller') {
            setTokenAndUType(res.data.token, res.data.user[0].is_buyer);
         
          }

          if (
            res.data.user[0].is_seller === 'Seller' ||
            res.data.user[0].is_seller === 'Buyer_Seller'
          ) {
            setTokenAndUType(res.data.token, res.data.user[0].is_seller);
          }
        }

        setUser(res.data.user[0]);
        navigate(redirect);
      })
      .catch((e) => {
        console.log(e);
        setErrors(e.response.data.errors);
      });
  };

  const loginBuyer = (data) => {
    login(data, '/');
  };

  const loginSeller = (data) => {
    login(data, '/seller/home');
  };

  const loginAdmin = (data) => {
    login(data, '/admin/dashboard');
  };

  const logout = () => {
    axiosClient.post('/logout').then(() => {
      setUser({});
      setTokenAndUType(
        localStorage.removeItem('ACCESS_TOKEN'),
        localStorage.removeItem('USER_TYPE')
      );
    });
  };

  const register = ({ ...data }) => {
    axiosClient
      .post('/register', data)
      .then((resp) => {
        setUser({});
        setErrors(null);
        _setToken(data.token);
        navigate('/');
        console.log(resp, data.token);
      })
      .catch((e) => {
        setErrors(e.response.data.errors);
      });
  };

  const registerExist = ({ ...data }) => {
    axiosClient
      .post('/register-exist', data)
      .then((resp) => {
        console.log(resp);
      })
      .catch((e) => {
        console.log(e);
        setErrors(e.response.data.errors);
      });
  };

  useLayoutEffect(() => {
    axiosClient.get('/user').then((res) => {
      setUser(res.data[0]);
      setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loading,
        user,
        token,
        errors,
        user_type,
        setErrors,
        loginBuyer,
        loginSeller,
        loginAdmin,
        register,
        registerExist,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext() {
  return useContext(AuthContext);
}
