import { Navigate, Outlet } from 'react-router-dom';

import useAuthContext from '../Hooks/Context/AuthContext';
import Header from '../Components/Header/Header';

export function AuthSellerLayout() {
  const { user_type } = useAuthContext();

  return (
    <>
      <Header />
      {user_type === 'Seller' ? <Outlet /> : <Navigate to='/seller/login' />}
    </>
  );
}
