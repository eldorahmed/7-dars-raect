import { createContext, useContext, useEffect, useState } from "react"





 export const GlobalContext=createContext()



  export function useAuth(){
return useContext(GlobalContext)
 }


function GlobalContextProvider({children}) {
 

  return (<GlobalContext.Provider value={1}>
             {children}
          </GlobalContext.Provider>)
}

export default GlobalContextProvider