//firebase imports
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
//react imports
import { useState } from "react";

export const useRegister = () => {
  const [isPanding, setIsPanding] = useState(false);

  const registerWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setIsPanding(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);
      setIsPanding(false);
    } catch (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
      setIsPanding(false);
    }
  };

  return { registerWithGoogle, isPanding };
};