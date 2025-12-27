import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDwwE1TfMwWc3fjtgTMSDw-U28XWKORENM",
  authDomain: "mandand-b17c7.firebaseapp.com",
  projectId: "mandand-b17c7",
  storageBucket: "mandand-b17c7.firebasestorage.app",
  messagingSenderId: "717189244138",
  appId: "1:717189244138:web:eaa28b1e58df3244efa393"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

