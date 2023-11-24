// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDyMS0PFbNfh3HQDqd7-sfeD_uGbdC2O70",
  authDomain: "forbidden-database.firebaseapp.com",
  projectId: "forbidden-database",
  storageBucket: "forbidden-database.appspot.com",
  messagingSenderId: "1068522665102",
  appId: "1:1068522665102:web:c4ecb34b86656b5660c5df",
  measurementId: "G-1VDS05PB2N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
