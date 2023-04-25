import { Route, Routes } from 'react-router-dom';
import { Loader } from './Components/Loader/Loader';
import { GlobalStyles } from './GlobalStyle.style';
import { NotFound } from './Pages/NotFound';

import { LoginAdmin } from './Pages/Auth/LoginAdmin';

// Buyer Components
import { AuthBuyerLayout } from './Layouts/AuthBuyerLayout';
import { ChangePasswordBuyer } from './Pages/Buyer/ChangePassword';
import { Home } from './Pages/Buyer/Home';
import { InboxBuyer } from './Pages/Buyer/Inbox';
import { MessageBuyer } from './Pages/Buyer/Message';
import { ProfileBuyer } from './Pages/Buyer/Profile';
import { DonationBuyer } from './Pages/Buyer/Donation';

// Seller Components
import { AuthSellerLayout } from './Layouts/AuthSellerLayout';
import { ChangePasswordSeller } from './Pages/Seller/ChangePassword';
import { ProductSeller } from './Pages/Seller/Product';
import { HomeSeller } from './Pages/Seller/Home';
import { InboxSeller } from './Pages/Seller/Inbox';
import { MessageSeller } from './Pages/Seller/Message';
import { ProfileSeller } from './Pages/Seller/Profile';
import { DonationSeller } from './Pages/Seller/Donation';

// Admin Components
import { AuthAdminLayout } from './Layouts/AuthAdminLayout';
import { ChangePasswordAdmin } from './Pages/Admin/ChangePassword';
import { Dashboard } from './Pages/Admin/Dashboard';
import { InboxAdmin } from './Pages/Admin/Inbox';
import { MessageAdmin } from './Pages/Admin/Message';
import { ProfileAdmin } from './Pages/Admin/Profile';
import { Users } from './Pages/Admin/Users';
import { AnnouncementAdmin } from './Pages/Admin/Announcement';

// solla
import { Mainpage } from './Pages';
import { Recharge } from './Pages/Recharge';
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
        {/* Buyer Route */}
        <Routes>
          <Route element={<AuthBuyerLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/inbox' element={<InboxBuyer />} />
            <Route path='/message/:message_id' element={<MessageBuyer />} />
            <Route path='/profile' element={<ProfileBuyer />} />
            <Route path='/change-password' element={<ChangePasswordBuyer />} />
            <Route path='/donation' element={<DonationBuyer />} />
            <Route path='/transactions' element={<TransactionsBuyer />} />
            <Route path='/add-to-cart' element={<AddToCart />} />
          </Route>
          {/* Seller Route */}
          <Route element={<AuthSellerLayout />}>
            <Route path='/seller/home' element={<HomeSeller />} />
            <Route path='/seller/Product' element={<ProductSeller />} />
            <Route path='/seller/inbox' element={<InboxSeller />} />
            <Route
              path='/seller/message/:message_id'
              element={<MessageSeller />}
            />
            <Route path='/seller/profile' element={<ProfileSeller />} />
            <Route
              path='/seller/change-password'
              element={<ChangePasswordSeller />}
            />
            <Route path='/seller/donation' element={<DonationSeller />} />
          </Route>
          {/* Admin Route */}
          <Route element={<AuthAdminLayout />}>
            <Route path='/admin/dashboard' element={<Dashboard />} />
            <Route path='/admin/users' element={<Users />} />
            {/* <Route path='/admin/transactions' element={<Transactions />} /> */}
            <Route path='/admin/inbox' element={<InboxAdmin />} />
            <Route
              path='/admin/message/:message_id'
              element={<MessageAdmin />}
            />
            <Route path='/admin/profile' element={<ProfileAdmin />} />
            <Route
              path='/admin/change-password'
              element={<ChangePasswordAdmin />}
            />
            <Route path='/admin/announcement' element={<AnnouncementAdmin />} />
          </Route>
          <Route element={<GuestLayout />}>
            {/*Solla */}
            <Route path='/recharge' element={<Recharge />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/password-reset/:token' element={<PasswordReset />} />
            <Route path='/home' element={<Mainpage />} />
            <Route path='/update-access' element={<UpdateAccess />} />
          </Route>

          <Route path='/admin/login' element={<LoginAdmin />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
