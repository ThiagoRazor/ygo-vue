// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyCq3HE8btR8si_mupJZYSXNRNidi9K1MjA",
  authDomain: "forbidden-2.firebaseapp.com",
  projectId: "forbidden-2",
  storageBucket: "forbidden-2.appspot.com",
  messagingSenderId: "801876228707",
  appId: "1:801876228707:web:e7260e2eade47fc6981656",
  measurementId: "G-Q1SBYZVC8Z"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
