import { Navigate, Outlet } from 'react-router-dom';

import useAuthContext from '../Hooks/Context/AuthContext';

import Header from '../Components/Header/Header';

export function GuestLayout() {
  const { user } = useAuthContext();

  return (
    <>
      <Header />
      {!user ? (
        <Outlet />
      ) : user && user.user_type == 'Buyer' ? (
        <Navigate to='/' />
      ) : user && user.user_type == 'Seller' ? (
        <Navigate to='/seller/home' />
      ) : (
        user && user.user_type == 'Admin' && <Navigate to='/admin/dashboard' />
      )}
    </>
  );
}
