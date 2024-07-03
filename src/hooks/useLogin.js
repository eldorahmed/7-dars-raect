import { useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { useGlobalContext } from "../context/GlobalContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
 
export const useLogin=()=>{
    const [isPending,setIsPending]=useState(false)
    const{dispatch}=useGlobalContext()
const signIn = async (email, password) => {
  try {
    setIsPending(true)
    const register = await signInWithEmailAndPassword(auth, email, password);
    const user =  register.user;
    dispatch({type:"LOG_IN", payload:user})
    toast.success(`Welcome ${user.displayName}`)
    setIsPending(false)
  } catch (error) {
    const errorMessage = error.message;
    toast.error(errorMessage)
    setIsPending(false)
  }
}
return {isPending,signIn}
}
