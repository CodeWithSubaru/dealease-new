import useAuthContext from '../../Hooks/Context/AuthContext';
import { ViewSingleUser } from './ViewSingleUser';

export const ProfileAdmin = () => {
  const { user } = useAuthContext();

  return <ViewSingleUser data={user} />;
};
