// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-XuEO-etaiBIXBc5KmSKZBbDrjvHt9Ak",
  authDomain: "mvp-pet-sitter.firebaseapp.com",
  projectId: "mvp-pet-sitter",
  storageBucket: "mvp-pet-sitter.appspot.com",
  messagingSenderId: "904694209410",
  appId: "1:904694209410:web:fbab06f6051d5b2c2e0d9b",
  measurementId: "G-J9FM97YH24"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);