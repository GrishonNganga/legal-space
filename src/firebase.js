// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQUmaRXyvV-0yt5sYTX1SOgF2vResWtHM",
  authDomain: "legal-space-74771.firebaseapp.com",
  projectId: "legal-space-74771",
  storageBucket: "legal-space-74771.appspot.com",
  messagingSenderId: "442376705799",
  appId: "1:442376705799:web:bcaae4959170097dff97a2",
  measurementId: "G-0QVJCDNGJT"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);