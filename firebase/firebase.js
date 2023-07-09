import { initializeApp } from 'firebase/app';

import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDtRICxiCm6uCaA4F1rQW0vCRNLpUvqkj0',
  authDomain: 'chat-app-3c2c5.firebaseapp.com',
  projectId: 'chat-app-3c2c5',
  storageBucket: 'chat-app-3c2c5.appspot.com',
  messagingSenderId: '391994667816',
  appId: '1:391994667816:web:aa553268e9d247201d161d',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
