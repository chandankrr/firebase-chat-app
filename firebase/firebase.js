import { initializeApp } from 'firebase/app';

import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCe2R05kRIioOXeD0kM9AO-aaId-mqcRpQ',
  authDomain: 'chat-app-37816.firebaseapp.com',
  projectId: 'chat-app-37816',
  storageBucket: 'chat-app-37816.appspot.com',
  messagingSenderId: '793168999572',
  appId: '1:793168999572:web:2976dd74e80babc1663081',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
