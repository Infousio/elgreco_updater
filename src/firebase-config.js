// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADausqCoZfK2WNL55xhL50uke-UaUfP0s",
  authDomain: "menudata-d07f0.firebaseapp.com",
  projectId: "menudata-d07f0",
  storageBucket: "menudata-d07f0.appspot.com",
  messagingSenderId: "709712996693",
  appId: "1:709712996693:web:d3f77980534ccf178e67dc",
  measurementId: "G-TBHFN6T4C9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default db;