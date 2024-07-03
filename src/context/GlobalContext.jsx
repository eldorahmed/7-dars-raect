import { createContext, useContext, useReducer } from "react"


 export const GlobalContext=createContext()
  export function useGlobalContext(){
return useContext(GlobalContext)
 }

 const reducer=(state,action)=>{
  const{type,payload}=action
  switch(type){
    case "LOG_IN":
      return {...state, user:payload}
    case "LOG_OUT":
      return {...state, user:null}
    case "IS_AUTH_READY":
      return {...state, isAuthready:true}
      default:
        return state
  }

 }


function GlobalContextProvider({children}) {
 const [state,dispatch]=useReducer(reducer,{
  user:null,
  isAuthready:false,
 })
 

  return (<GlobalContext.Provider value={{...state,dispatch}}>
             {children}
          </GlobalContext.Provider>)
}

export default GlobalContextProvider