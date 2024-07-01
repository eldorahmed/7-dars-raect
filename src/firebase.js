// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDcPnliiNgBSQ4PUYX04Zk9C1X5Nlelr9M",
  authDomain: "auth-development-9f37a.firebaseapp.com",
  projectId: "auth-development-9f37a",
  storageBucket: "auth-development-9f37a.appspot.com",
  messagingSenderId: "105736891126",
  appId: "1:105736891126:web:7c05f1a5fa4dee7c629ad7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth };

