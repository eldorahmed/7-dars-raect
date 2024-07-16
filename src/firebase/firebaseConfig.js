import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcPnliiNgBSQ4PUYX04Zk9C1X5Nlelr9M",
  authDomain: "auth-development-9f37a.firebaseapp.com",
  projectId: "auth-development-9f37a",
  storageBucket: "auth-development-9f37a.appspot.com",
  messagingSenderId: "105736891126",
  appId: "1:105736891126:web:7c05f1a5fa4dee7c629ad7"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db =getFirestore(app)