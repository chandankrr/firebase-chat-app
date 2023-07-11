import { initializeApp } from 'firebase/app';

import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyC42zSF9mvHIxfXlTcrUlxJbyYDmUIhGuc',
  authDomain: 'chat-app-c1812.firebaseapp.com',
  projectId: 'chat-app-c1812',
  storageBucket: 'chat-app-c1812.appspot.com',
  messagingSenderId: '560827929390',
  appId: '1:560827929390:web:c24e63dafb395410d160bf',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
