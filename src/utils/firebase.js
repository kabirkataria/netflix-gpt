// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsmZP8CkSFdEC6oSKahdHHiUodySE9yNw",
  authDomain: "netflixgpt-14cb2.firebaseapp.com",
  projectId: "netflixgpt-14cb2",
  storageBucket: "netflixgpt-14cb2.firebasestorage.app",
  messagingSenderId: "1019788925159",
  appId: "1:1019788925159:web:3f301a6b6cd72a9720aa42",
  measurementId: "G-6W47L651BB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();