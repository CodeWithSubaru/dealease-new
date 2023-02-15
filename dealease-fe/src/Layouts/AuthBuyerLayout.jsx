import { Navigate, Outlet } from 'react-router-dom';

import useAuthContext from '../Hooks/Context/AuthContext';
import Header from '../Components/Header/Header';

export function AuthBuyerLayout() {
  const { user } = useAuthContext();

  return (
    <>
      <Header />
      {user && user.user_type == 1 ? <Outlet /> : <Navigate to='/login' />}
    </>
  );
}
