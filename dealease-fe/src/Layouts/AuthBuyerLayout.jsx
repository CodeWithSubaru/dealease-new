import { Navigate, Outlet } from 'react-router-dom';

import useAuthContext from '../Hooks/Context/AuthContext';
import Header from '../Components/Header/Header';

export function AuthBuyerLayout() {
  const { user_type } = useAuthContext();

  return (
    <>
      <Header />
      {user_type === 'Buyer' ? <Outlet /> : <Navigate to='/login' />}
    </>
  );
}
