import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBCDI4HRDY7kAl3ocE1tfIWD_PnB92qbDU",
  authDomain: "instagram-clone-b1cb2.firebaseapp.com",
  projectId: "instagram-clone-b1cb2",
  storageBucket: "instagram-clone-b1cb2.appspot.com",
  messagingSenderId: "595521939428",
  appId: "1:595521939428:web:2d71b0dff3cb28d32fc9f1",
  measurementId: "G-VR7JJ7LLMM",
};

// const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const storage = getStorage();
const db = getFirestore();

export { app, auth, storage, db };
