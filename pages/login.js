import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { IoLogoFacebook, IoLogoGoogle } from 'react-icons/io';

import { useAuth } from '@/context/authContext';
import { auth, db } from '@/firebase/firebase';
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import ToastMessage from '@/components/ToastMessage';
import { toast } from 'react-toastify';

import Loader from '@/components/Loader';
import { profileColors } from '@/utils/constants';

const gProvider = new GoogleAuthProvider();
const fProvider = new FacebookAuthProvider();
fProvider.setCustomParameters({
  display: 'popup',
});
fProvider.addScope('email');
fProvider.addScope('public_profile');

const Login = () => {
  const router = useRouter();
  const { currentUser, isLoading } = useAuth();
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (!isLoading && currentUser) {
      // it means user logged in
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, isLoading]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/');
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('An error occured: ', error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { user } = await signInWithPopup(auth, gProvider);

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        const colorIndex = Math.floor(Math.random() * profileColors.length);
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          color: profileColors[colorIndex],
        });

        await setDoc(doc(db, 'userChats', user.uid), {});
      }

      setTimeout(() => {
        window.location.reload();
        router.push('/');
      }, 0);
    } catch (error) {
      console.error('An error occurred: ', error);
    }
  };

  const signInWithFacebook = async () => {
    try {
      const result = await signInWithPopup(auth, fProvider);
      const user = result.user;
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        const colorIndex = Math.floor(Math.random() * profileColors.length);
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          color: profileColors[colorIndex],
        });

        await setDoc(doc(db, 'userChats', user.uid), {});
      }

      setTimeout(() => {
        window.location.reload();
        router.push('/');
      }, 0);
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);

      console.error('An error occurred: ', error);
    }
  };

  const resetPassword = async () => {
    try {
      toast.promise(
        async () => {
          await sendPasswordResetEmail(auth, email);
        },
        {
          pending: 'Generating reset link.',
          success: 'Reset email send to your registered email id.',
          error: 'You may have entered wrong email id',
        },
        {
          autoClose: 5000,
        }
      );
    } catch (error) {
      console.error('An error occured: ', error);
    }
  };

  return isLoading || (!isLoading && currentUser) ? (
    <Loader />
  ) : (
    <div className="h-[100vh] flex justify-center items-center bg-c1">
      <ToastMessage />
      <div className="flex items-center flex-col mx-4">
        <div className="text-center">
          <div className="text-4xl font-bold">Login to Your Account</div>
          <div className="mt-3 text-c3">
            Connect and chat with anyone, from anywhere
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 w-full mt-10 mb-5 md:flex-row md:gap-3">
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full md:w-1/2 h-14 rounded-md cursor-pointer p-[1px]">
            <div
              className="flex items-center justify-center gap-3 text-white font-semibold bg-c1 w-full h-full rounded-md"
              onClick={signInWithGoogle}
            >
              <IoLogoGoogle size={24} />
              <span>Login with Google</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full md:w-1/2 h-14 rounded-md cursor-pointer p-[1px]">
            <div
              className="flex items-center justify-center gap-3 text-white font-semibold bg-c1 w-full h-full rounded-md"
              onClick={signInWithFacebook}
            >
              <IoLogoFacebook size={24} />
              <span>Login with Facebook</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <span className="w-5 h-[1px] bg-c3"></span>
          <span className="text-c3 font-semibold">OR</span>
          <span className="w-5 h-[1px] bg-c3"></span>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-3 w-full md:w-[500px] mt-5"
        >
          <input
            type="email"
            placeholder="Email"
            className="w-full h-14 bg-c5 rounded-xl outline-none border-none px-5 text-c3"
            required
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full h-14 bg-c5 rounded-xl outline-none border-none px-5 text-c3"
            required
            autoComplete="off"
          />
          <div className="text-right w-full text-c3">
            <span className="cursor-pointer" onClick={resetPassword}>
              Forgot Password
            </span>
          </div>
          <button className="mt-4 w-full h-14 rounded-xl outline-none text-base font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            Login to Your Account
          </button>
        </form>

        <div className="flex justify-center gap-1 text-c3 mt-5">
          <span>Not a member yet?</span>
          <Link
            href="/register"
            className="font-semibold text-white underline underline-offset-2 cursor-pointer"
          >
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
