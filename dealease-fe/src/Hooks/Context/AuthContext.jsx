import { createContext, useContext, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from '../../api/axios';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const csrf = () => axios.get('/sanctum/csrf-cookie');

  const getUser = () => {
    axios.get('/api/user').then((res) => {
      setUser(res.data[0]);
    });
  };

  // Login Methods for each user
  const login = ({ ...data }, redirect) => {
    csrf();
    axios
      .post('/login', data)
      .then(() => {
        getUser();
        navigate(redirect);
      })
      .catch((e) => {
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
    csrf();
    axios.post('/logout').then(() => setUser(null));
  };

  const register = ({ ...data }) => {
    axios
      .post('/register', data)
      .then(() => {
        // navigate();
        console.log('User Created');
      })
      .catch((e) => {
        setErrors(e.response.data.errors);
      });
  };

  useLayoutEffect(() => {
    if (!user) {
      getUser();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        errors,
        setErrors,
        loginBuyer,
        loginSeller,
        loginAdmin,
        register,
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
