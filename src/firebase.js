import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBXjUGbU2ujeDVW2HgFar19UyRf_p4lBYA",
  authDomain: "easytask-new.firebaseapp.com",
  projectId: "easytask-new",
  storageBucket: "easytask-new.firebasestorage.app",
  messagingSenderId: "914814720542",
  appId: "1:914814720542:web:b8fbfb138a89d72347ec0f",
  measurementId: "G-TY5ZK1R4HC",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const messaging = getMessaging(app);
