import "./App.css";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import { Home, About, Contact, Login, Register } from "./pages";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { useGlobalContext } from "./context/GlobalContext";
// actions
import { action as RegisterAction } from "./pages/Register";
import { action as LoginAction } from "./pages/Login";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";

function App() {
  const{user,dispatch,isAuthready}=useGlobalContext()
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <RootLayout />
        </ProtectedRoutes>
      ),
      children: [
        { index: true, element: <Home /> },
        { path: "about", element: <About /> },
        { path: "contact", element: <Contact /> },
      ],
    },
    {
      path: "login",
      element: user ? <Navigate to='/'/> : <Login />,
      action: LoginAction,
    },
    {
      path: "register",
      element: user ? <Navigate to='/'/>: <Register />,
      action: RegisterAction,
    },
  ]);

  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
   dispatch({type:'LOG_IN',payload:user})
   dispatch({type:'IS_AUTH_READY'})
    })

  },[])

  return <>{ isAuthready && <RouterProvider router={routes} />}</> ;
}

export default App;
