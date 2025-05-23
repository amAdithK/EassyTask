import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCaVHO-zfvvJdaTtyxggOvk7YFcRSE3xjU",
  authDomain: "eassycorptrack.firebaseapp.com",
  projectId: "eassycorptrack",
  storageBucket: "eassycorptrack.firebasestorage.app",
  messagingSenderId: "960870842985",
  appId: "1:960870842985:web:07ac09e3adf039144e98f8",
  measurementId: "G-4HTK059Y2F",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const messaging = getMessaging(app);
