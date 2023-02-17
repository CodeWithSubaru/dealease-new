import { Navigate, Outlet } from 'react-router-dom';

import useAuthContext from '../Hooks/Context/AuthContext';
import Header from '../Components/Header/Header';

export function AuthSellerLayout() {
  const { user } = useAuthContext();

  return (
    <>
      <Header />
      {user && user.user_type == 'Seller' ? (
        <Outlet />
      ) : (
        <Navigate to='/seller/login' />
      )}
    </>
  );
}
