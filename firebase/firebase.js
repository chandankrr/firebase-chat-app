import { initializeApp } from 'firebase/app';

import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCUYECUwJfq0BkG7-eK8ZPdDy440MRsTUM',
  authDomain: 'chat-app-1ec11.firebaseapp.com',
  projectId: 'chat-app-1ec11',
  storageBucket: 'chat-app-1ec11.appspot.com',
  messagingSenderId: '456397298724',
  appId: '1:456397298724:web:b96d0bc0dc8a269eb3ccb1',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
