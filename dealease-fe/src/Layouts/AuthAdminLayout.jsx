import { Navigate, Outlet } from 'react-router-dom';
import useAuthContext from '../Hooks/Context/AuthContext';

import Header from '../Components/Header/Header';

export function AuthAdminLayout() {
  const { user } = useAuthContext();

  return (
    <>
      <Header />
      {user && user.user_type === 9 ? (
        <Outlet />
      ) : (
        <Navigate to='/admin/login' />
      )}
    </>
  );
}
