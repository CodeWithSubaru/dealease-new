// import { Adsense } from '@ctrl/react-adsense';
import React from 'react';
import useAuthContext from '../../Hooks/Context/AuthContext';

export const Home = () => {
  const { user } = useAuthContext();
  return (
    <div>
      <h3>Posts</h3>
      <div>
        <p>THis is an article</p>
      </div>
      {/*  responsive ads */}
      {/* <Adsense
        client='ca-pub-6501523458220893'
        slot='2372107736'
        style={{ display: 'block' }}
        format='fluid'
  /> */}
    </div>
  );
};
