//firebase imports
import { GoogleAuthProvider, signInWithPopup,createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
//react imports
import { useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import toast from "react-hot-toast";

export const useRegister = () => {
    const [isPanding, setIsPanding] = useState(false);
    const {dispatch}=useGlobalContext()
  const registerWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setIsPanding(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      dispatch({type:'LOG_IN',payload:user});
      toast.success(`Welcome ${user.displayName}`)
      setIsPanding(false);
    } catch (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
      setIsPanding(false);
    }
  };

  const registerEmailAndPassword= async(email,password,passwordConfirm,displayName,photoURL)=>{
try{
    if(password!==passwordConfirm){
        throw new Error('Passwords not matching!')
    }
    setIsPanding(true)
    const register=createUserWithEmailAndPassword(auth,email,password)
    const user=(await register).user
    await updateProfile(auth.currentUser,{
        photoURL,
        displayName
    })

    dispatch({type:"LOG_IN",payload:user})
    toast.success(`Welcome ${user.displayName}`)
    setIsPanding(false)

}catch(error){
    const errorMessage=error.message
    toast.error(errorMessage)
    setIsPanding(false)

}
  }

  return { registerWithGoogle, isPanding,registerEmailAndPassword };
};