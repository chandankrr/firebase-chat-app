import { auth, db } from '@/firebase/firebase';
import { signOut as authSignOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const clear = async () => {
    try {
      if (currentUser) {
        await updateDoc(doc(db, 'users', currentUser.uid), {
          isOnline: false,
        });
      }
      setCurrentUser(null);
      setIsLoading(false);
    } catch (error) {
      console.error('An error occured: ', error);
    }
  };

  const authStateChanged = async (user) => {
    setIsLoading(true);

    if (!user) {
      clear();
      return;
    }

    const userDocExist = await getDoc(doc(db, 'users', user.uid));
    if (userDocExist.exists()) {
      await updateDoc(doc(db, 'users', user.uid), {
        isOnline: true,
      });
    }

    const userDoc = await getDoc(doc(db, 'users', user.uid));

    setCurrentUser(userDoc.data());
    setIsLoading(false);
  };

  const signOut = () => {
    authSignOut(auth).then(() => clear());
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged);
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserContext.Provider
      value={{ currentUser, setCurrentUser, isLoading, setIsLoading, signOut }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
