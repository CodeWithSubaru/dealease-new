import { Navigate, Outlet } from 'react-router-dom';

import useAuthContext from '../Hooks/Context/AuthContext';

import Header from '../Components/Header/Header';

export function GuestLayout() {
  const { user_type, token } = useAuthContext();
  const localStoreUserType = localStorage.getItem('USER_TYPE');
  if (token) {
    if (user_type == 'User') {
      return <Navigate to='/home' />;
    } else if (user_type == 'Admin') {
      return <Navigate to='/admin/dashboard' />;
    }
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
