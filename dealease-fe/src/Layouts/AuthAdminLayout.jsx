import { Navigate, Outlet } from 'react-router-dom';
import useAuthContext from '../Hooks/Context/AuthContext';

import Header from '../Components/Header/Header';

export function AuthAdminLayout() {
  const { user } = useAuthContext();

  return (
    <>
      <Header />
      {user && user.user_type == 'Admin' ? (
        <Outlet />
      ) : (
        <Navigate to='/admin/login' />
      )}
    </>
  );
}
