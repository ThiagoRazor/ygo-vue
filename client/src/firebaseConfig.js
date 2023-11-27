// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyDyMS0PFbNfh3HQDqd7-sfeD_uGbdC2O70",
  authDomain: "forbidden-database.firebaseapp.com",
  projectId: "forbidden-database",
  storageBucket: "forbidden-database.appspot.com",
  messagingSenderId: "1068522665102",
  appId: "1:1068522665102:web:c4ecb34b86656b5660c5df",
  measurementId: "G-1VDS05PB2N"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
