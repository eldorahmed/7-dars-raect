import { createContext, useContext, useEffect, useState } from "react"
import { auth } from "../firebase"
// import { GoogleAuthProvider } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";


 export const GlobalContext=createContext()



  export function useAuth(){
return useContext(GlobalContext)
 }


function GlobalContextProvider({children}) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isEmailUser, setIsEmailUser] = useState(false);
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const [loading, setLoading] = useState(true);


useEffect(()=>{
  const unsubscribe = onAuthStateChanged(auth, initializeUser);
  return unsubscribe;
},[])
async function initializeUser(user) {
  if (user) {

    setCurrentUser({ ...user });

    // check if provider is email and password login
    const isEmail = user.providerData.some(
      (provider) => provider.providerId === "password"
    );
    setIsEmailUser(isEmail);

      // check if the auth provider is google or not
    //   const isGoogle = user.providerData.some(
    //     (provider) => provider.providerId === GoogleAuthProvider.PROVIDER_ID
    //   );
    //   setIsGoogleUser(isGoogle);

    setUserLoggedIn(true);
  } else {
    setCurrentUser(null);
    setUserLoggedIn(false);
  }

  setLoading(false);
}
const value ={
  userLoggedIn,
  isEmailUser,
  isGoogleUser,
  currentUser,
  setCurrentUser

}

  return (<GlobalContext.Provider value={value}>
             {children}
          </GlobalContext.Provider>)
}

export default GlobalContextProvider