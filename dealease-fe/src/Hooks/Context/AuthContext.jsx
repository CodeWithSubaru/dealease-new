import { createContext, useContext, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Notification } from '../../Components/Notification/Notification';

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
  const logoutTimerIdRef = useRef(null);

  const csrf = () => axiosClient.get('../sanctum/csrf-cookie');

  const setTokenAndUType = (token, type) => {
    _setToken(token);
    _setUserType(type);
    if (token && type) {
      localStorage.setItem('ACCESS_TOKEN', token);
      localStorage.setItem('USER_TYPE', type);
    } else {
      localStorage.removeItem('ACCESS_TOKEN');
      localStorage.removeItem('USER_TYPE');
    }
  };

  // Login Methods for each user
  const login = ({ ...data }, redirect, loginAs) => {
    csrf();
    axiosClient
      .post('/login', data)
      .then((res) => {
        setLoading(true);
        if (res.data.user[0].role_type === 'Admin') {
          setTokenAndUType(res.data.token, res.data.user[0].role_type);
        }

        if (res.data.user[0].role_type === 'User') {
          if (
            res.data.user[0].is_buyer === 'Buyer' ||
            (res.data.user[0].is_buyer === 'Buyer_seller1' && loginAs === 1)
          ) {
            setTokenAndUType(res.data.token, res.data.user[0].is_buyer);
          }

          if (
            res.data.user[0].is_seller === 'Seller' ||
            (res.data.user[0].is_seller === 'Buyer_seller2' && loginAs === 2)
          ) {
            setTokenAndUType(res.data.token, res.data.user[0].is_seller);
          }
        }
        Notification({
          title: 'Success',
          message: res.data.message,
          icon: 'success',
        }).then(() => {
          setUser(res.data.user[0]);
          navigate(redirect);
        });
      })
      .catch((e) => {
        Notification({
          title: 'Error',
          message: 'Something went wrong',
          icon: 'error',
        });
        setErrors(e.response.data.errors);
        console.log(e);
      });
  };

  const loginBuyer = (data) => {
    login(data, '/', 1);
  };

  const loginSeller = (data) => {
    login(data, '/seller/home', 2);
  };

  const loginAdmin = (data) => {
    login(data, '/admin/dashboard');
  };

  const logout = () => {
    axiosClient.post('/logout').then((res) => {
      Notification({
        title: 'Success',
        message: res.data.message,
        icon: 'success',
      }).then((res) => {
        setLoading(true);
        setUser({});
        setTokenAndUType(
          localStorage.removeItem('ACCESS_TOKEN'),
          localStorage.removeItem('USER_TYPE')
        );
      });
    });
  };

  const register = ({ ...data }) => {
    axiosClient
      .post('/register', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
        if (res.status == 200) {
          setLoading(true);
          Notification({
            title: 'Success',
            message: res.data.message,
            icon: 'success',
          }).then((res) => {
            setLoading(false);
            setUser({});
            setErrors([]);
            _setToken(data.token);
            navigate('/home');
          });
        }
      })
      .catch((e) => {
        Notification({
          title: 'Error',
          message: 'Errors Found',
          icon: 'error',
        });
        setErrors(e.response.data.errors);
      });
  };

  const registerExist = ({ ...data }) => {
    axiosClient
      .post('/register-exist', data)
      .then((res) => {
        if (res.status == 200) {
          setLoading(true);
          Notification({
            title: 'Success',
            message: res.data.message,
            icon: 'success',
          }).then(() => {
            navigate('/home');
            setLoading(false);
          });
          setErrors([]);
        }
      })
      .catch((e) => {
        Notification({
          title: 'Error',
          message: 'Errors Found',
          icon: 'error',
        });
        setErrors(e.response.data.errors);
      });
  };

  useEffect(() => {
    if (user) {
      axiosClient
        .get('/user')
        .then((res) => {
          setLoading(false);
          setUser(res.data[0]);
        })
        .catch((e) => setLoading(false));
    }
    setErrors([]);
  }, [user.user_id]);

  useEffect(() => {
    const autoLogout = () => {
      if (document.visibilityState === 'hidden') {
        const timeOutId = window.setTimeout(() => {
          logout();
        }, 5 * 60 * 1000);
        logoutTimerIdRef.current = timeOutId;
      } else {
        window.clearTimeout(logoutTimerIdRef.current);
      }
    };

    document.addEventListener('visibilitychange', autoLogout);

    return () => {
      document.removeEventListener('visibilitychange', autoLogout);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        csrf,
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
