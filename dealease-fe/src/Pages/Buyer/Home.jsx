import useAuthContext from '../../Hooks/Context/AuthContext';

export const Home = () => {
  const { user } = useAuthContext();
  return (
    <div>
      <h1>Posts</h1>
    </div>
  );
};
