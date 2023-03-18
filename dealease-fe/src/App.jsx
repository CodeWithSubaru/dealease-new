import { Route, Routes } from 'react-router-dom';
import { Loader } from './Components/Loader/Loader';
import { GlobalStyles } from './GlobalStyle.style';
import { NotFound } from './Pages/NotFound';

import { Login } from './Pages/Auth/Login';
import { LoginAdmin } from './Pages/Auth/LoginAdmin';
import { LoginSeller } from './Pages/Auth/LoginSeller';

// Buyer Components
import { AuthBuyerLayout } from './Layouts/AuthBuyerLayout';
import { Home } from './Pages/Buyer/Home';
import { InboxBuyer } from './Pages/Buyer/Inbox';
import { MessageBuyer } from './Pages/Buyer/Message';
import { ProfileBuyer } from './Pages/Buyer/Profile';

// Seller Components
import { AuthSellerLayout } from './Layouts/AuthSellerLayout';
import { HomeSeller } from './Pages/Seller/Home';
import { InboxSeller } from './Pages/Seller/Inbox';
import { MessageSeller } from './Pages/Seller/Message';
import { ProfileSeller } from './Pages/Seller/Profile';

// Admin Components
import { AuthAdminLayout } from './Layouts/AuthAdminLayout';
import { Dashboard } from './Pages/Admin/Dashboard';
import { InboxAdmin } from './Pages/Admin/Inbox';
import { MessageAdmin } from './Pages/Admin/Message';
import { ProfileAdmin } from './Pages/Admin/Profile';
import { Users } from './Pages/Admin/Users';

// solla
import { Mainpage } from './Pages';
//
import useAuthContext from './Hooks/Context/AuthContext';
import { GuestLayout } from './Layouts/GuestLayout';
import { Register } from './Pages/Auth/Register';
import { RegisterExist } from './Pages/Auth/RegisterExist';

function App() {
  const { loading, user } = useAuthContext();

  if (loading && !user) {
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
          </Route>

          {/* Seller Route */}
          <Route element={<AuthSellerLayout />}>
            <Route path='/seller/home' element={<HomeSeller />} />
            <Route path='/seller/inbox' element={<InboxSeller />} />
            <Route
              path='/seller/message/:message_id'
              element={<MessageSeller />}
            />
            <Route path='/seller/profile' element={<ProfileSeller />} />
          </Route>

          {/* Admin Route */}
          <Route element={<AuthAdminLayout />}>
            <Route path='/admin/dashboard' element={<Dashboard />} />
            <Route path='/admin/users' element={<Users />} />
            <Route path='/admin/inbox' element={<InboxAdmin />} />
            <Route
              path='/admin/message/:message_id'
              element={<MessageAdmin />}
            />
            <Route path='/admin/profile' element={<ProfileAdmin />} />
          </Route>

          <Route element={<GuestLayout />}>
            {/*Solla */}
            <Route path='/Dealease' element={<Mainpage />} />
            {/*  */}
            <Route path='/login' element={<Login />} />
            <Route path='/seller/login' element={<LoginSeller />} />
            <Route path='/admin/login' element={<LoginAdmin />} />
            <Route path='/register' element={<Register />} />
            <Route path='/register-exist' element={<RegisterExist />} />
          </Route>

          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
