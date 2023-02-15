import { GlobalStyles } from './GlobalStyle.style';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Loader } from './Components/Loader/Loader';
import { NotFound } from './Pages/NotFound';

import { Login } from './Pages/Auth/Login';
import { LoginSeller } from './Pages/Auth/LoginSeller';
import { LoginAdmin } from './Pages/Auth/LoginAdmin';

// Buyer Components
import { Home } from './Pages/Buyer/Home';
import { Message } from './Pages/Buyer/Message';
import { AuthBuyerLayout } from './Layouts/AuthBuyerLayout';

// Seller Components
import { HomeSeller } from './Pages/Seller/Home';
import { AuthSellerLayout } from './Layouts/AuthSellerLayout';

// Admin Components
import { Dashboard } from './Pages/Admin/Dashboard';
import { AuthAdminLayout } from './Layouts/AuthAdminLayout';

import { GuestLayout } from './Layouts/GuestLayout';
import { Register } from './Pages/Auth/Register';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div>
      <Loader visibility={isLoading} />
      <GlobalStyles />

      {/* Buyer Route */}
      <Routes>
        <Route element={<AuthBuyerLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/message' element={<Message />} />
        </Route>

        {/* Seller Route */}
        <Route element={<AuthSellerLayout />}>
          <Route path='/seller/home' element={<HomeSeller />} />
        </Route>

        {/* Admin Route */}
        <Route element={<AuthAdminLayout />}>
          <Route path='/admin/dashboard' element={<Dashboard />} />
        </Route>

        <Route element={<GuestLayout />}>
          <Route path='/login' element={<Login />} />
          <Route path='/seller/login' element={<LoginSeller />} />
          <Route path='/admin/login' element={<LoginAdmin />} />
          <Route path='/register' element={<Register />} />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
