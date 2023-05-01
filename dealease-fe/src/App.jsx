import { Route, Routes } from 'react-router-dom';
import { Loader } from './Components/Loader/Loader';
import { GlobalStyles } from './GlobalStyle.style';
import { NotFound } from './Pages/NotFound';

// User Components
import { AuthUserLayout } from './Layouts/AuthUserLayout';
// import { ChangePasswordBuyer } from './Pages/Buyer/ChangePassword';
// import { ProfileBuyer } from './Pages/Users/Profile';

// Seller Components
import { AuthSellerLayout } from './Layouts/AuthSellerLayout';
import { HomeUser } from './Pages/Users/Home';
// import { ChangePasswordSeller } from './Pages/Users/ChangePassword';
// import { ProductSeller } from './Pages/Users/Product';
// import { InboxSeller } from './Pages/Users/Inbox';
// import { MessageSeller } from './Pages/Users/Message';
// import { ProfileSeller } from './Pages/Users/Profile';
// import { WithdrawSeller } from './Pages/Users/Withdraw';

// Admin Components
import { LoginAdmin } from './Pages/Auth/LoginAdmin';
import { AuthAdminLayout } from './Layouts/AuthAdminLayout';
import { ChangePasswordAdmin } from './Pages/Admin/ChangePassword';
import { Dashboard } from './Pages/Admin/Dashboard';
import { InboxAdmin } from './Pages/Admin/Inbox';
import { MessageAdmin } from './Pages/Admin/Message';
import { ProfileAdmin } from './Pages/Admin/Profile';
import { Users } from './Pages/Admin/Users';
import { AnnouncementAdmin } from './Pages/Admin/Announcement';
import { TransactionsAdmin } from './Pages/Admin/Transactions';

// solla
import { Mainpage } from './Pages';
import { Recharge } from './Pages/Buyer/Recharge';
// ramos
import { Test } from './Components/Header/Header';

import { GuestLayout } from './Layouts/GuestLayout';
import { UpdateAccess } from './Pages/Auth/UpdateAccess';
import { ForgotPassword } from './Pages/Auth/ForgotPassword';
import { PasswordReset } from './Pages/Auth/PassworReset';
import useAuthContext from './Hooks/Context/AuthContext';
import { TransactionsBuyer } from './Pages/Buyer/Transactions';
import { AddToCart } from './Pages/Buyer/AddToCart';

function App() {
  const { loading } = useAuthContext();

  if (loading) {
    return <Loader visibility={loading}></Loader>;
  }

  return (
    <>
      <div>
        <GlobalStyles />
        {/* User Route */}
        <Routes>
          <Route element={<AuthUserLayout />}>
            <Route path='/home' element={<HomeUser />} />
            {/* <Route path='/recharge' element={<Recharge />} /> */}
            {/* <Route path='/transactions' element={<TransactionsUser />} />
            <Route path='/add-to-cart' element={<AddToCart />} />
            <Route path='/profile' element={<ProfileUser />} />
            <Route path='/change-password' element={<ChangePasswordUser />} />
            <Route path='/transactions' element={<TransactionsUser />} />
            <Route path='/add-to-cart' element={<AddToCart />} />
            <Route path='/Product' element={<ProductUser />} />
            <Route path='/profile' element={<ProfileUser />} />
            <Route path='/change-password' element={<ChangePasswordUser />} />
            <Route path='/withdraw' element={<WithdrawUser />} /> */}
          </Route>

          {/* Admin Route */}
          <Route element={<AuthAdminLayout />}>
            <Route path='/admin/dashboard' element={<Dashboard />} />
            <Route path='/admin/users' element={<Users />} />
            <Route path='/admin/transactions' element={<TransactionsAdmin />} />
            <Route path='/admin/profile' element={<ProfileAdmin />} />
            <Route
              path='/admin/change-password'
              element={<ChangePasswordAdmin />}
            />
            <Route path='/admin/announcement' element={<AnnouncementAdmin />} />
          </Route>
          <Route element={<GuestLayout />}>
            {/*Solla */}
            <Route path='/' element={<Mainpage />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/password-reset/:token' element={<PasswordReset />} />
          </Route>

          <Route path='/admin/login' element={<LoginAdmin />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
