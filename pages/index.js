import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { useAuth } from '@/context/authContext';

const Home = () => {
  const router = useRouter();
  const { signOut, currentUser, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !currentUser) {
      router.push('/login');
    }
  }, [currentUser, isLoading, router]);

  return (
    <div>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
};

export default Home;
