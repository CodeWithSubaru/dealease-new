import { Route, Routes } from 'react-router-dom';
import { Loader } from './Components/Loader/Loader';
import { GlobalStyles } from './GlobalStyle.style';
import { NotFound } from './Pages/NotFound';

// User Components
import { AuthUserLayout } from './Layouts/AuthUserLayout';
import { HomeUser } from './Pages/Users/Home';
import { ChangePasswordUser } from './Pages/Users/ChangePassword';
import { ProfileUser } from './Pages/Users/Profile';
import { ProductUser } from './Pages/Users/Product';
import { WithdrawUser } from './Pages/Users/Withdraw';
import { Recharge } from './Pages/Users/Recharge';
import { AddToCart } from './Pages/Users/AddToCart';
import { OrdersBuyer, OrdersSeller } from './Pages/Users/Orders';

// Rider Components
import { HomeRider } from './Pages/Rider/Home';
import { LoginRider } from './Pages/Auth/LoginRider';

// Admin Components
import { LoginAdmin } from './Pages/Auth/LoginAdmin';
import { AuthAdminLayout } from './Layouts/AuthAdminLayout';
import { ChangePasswordAdmin } from './Pages/Admin/ChangePassword';
import { Dashboard } from './Pages/Admin/Dashboard';
import { ProfileAdmin } from './Pages/Admin/Profile';
import { Users } from './Pages/Admin/Users';
import { AnnouncementAdmin } from './Pages/Admin/Announcement';
import { TransactionsAdmin } from './Pages/Admin/Transactions';
import { TransactionsUser } from './Pages/Users/Transactions';

// solla
// Guest Layout
import { Mainpage } from './Pages';
import { GuestLayout } from './Layouts/GuestLayout';
import { ForgotPassword } from './Pages/Auth/ForgotPassword';
import { PasswordReset } from './Pages/Auth/PassworReset';
import useAuthContext from './Hooks/Context/AuthContext';

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
            <Route path='/recharge' element={<Recharge />} />
            <Route path='/transactions' element={<TransactionsUser />} />
            <Route path='/add-to-cart' element={<AddToCart />} />
            <Route path='/profile' element={<ProfileUser />} />
            <Route path='/change-password' element={<ChangePasswordUser />} />
            <Route path='/add-to-cart' element={<AddToCart />} />
            <Route path='/Product' element={<ProductUser />} />
            <Route path='/profile' element={<ProfileUser />} />
            <Route path='/change-password' element={<ChangePasswordUser />} />
            <Route path='/withdraw' element={<WithdrawUser />} />
            <Route path='/orders' element={<OrdersBuyer />} />
            <Route path='/orders/seller' element={<OrdersSeller />} />
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

          {/* Rider */}
          <Route path='/rider/home' element={<HomeRider />} />
          <Route path='/rider/login' element={<LoginRider />} />
          <Route path='/admin/login' element={<LoginAdmin />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
