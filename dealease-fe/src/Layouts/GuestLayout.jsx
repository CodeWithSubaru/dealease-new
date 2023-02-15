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
      ) : user && user.user_type == 1 ? (
        <Navigate to='/' />
      ) : user.user_type == 2 ? (
        <Navigate to='/seller/home' />
      ) : (
        <Navigate to='/admin/dashboard' />
      )}
    </>
  );
}
