import { Navigate, Outlet } from 'react-router-dom';

import useAuthContext from '../Hooks/Context/AuthContext';

import Header from '../Components/Header/Header';

export function GuestLayout() {
  const { user_type, token } = useAuthContext();
  const localStoreUserType = localStorage.getItem('USER_TYPE');
  if (token) {
    if (user_type == 'Buyer' || localStoreUserType == 'Buyer_seller1') {
      return <Navigate to='/' />;
    } else if (user_type == 'Seller' || localStoreUserType == 'Buyer_seller2') {
      return <Navigate to='/seller/home' />;
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
