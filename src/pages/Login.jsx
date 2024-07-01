import { FormInput } from "../components";
import { useState } from "react";
import { Form ,Link, useActionData,Navigate} from "react-router-dom";
import { doSignInWithEmailAndPassword,doSignInWithGoogle } from "../auth";
import { useAuth } from "../context/GlobalContext";
// action 
export const action= async({request})=>{
    let formData=await request.formData()
    let email=formData.get("email")
    let password=formData.get("password")
    return {email,password}
    
    }

function Login() {
  const loginData=useActionData()
  const { userLoggedIn } = useAuth()
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
    loginData && console.log(loginData)

    const onSubmit = async (e) => {
      e.preventDefault()
      if(!isSigningIn) {
          setIsSigningIn(true)
          await doSignInWithEmailAndPassword(loginData &&loginData.email, loginData && loginData.password)
          // doSendEmailVerification()
      }
  }

  return (
    <>
     {userLoggedIn && (<Navigate to={'/'} replace={true} />)}
      <div className="auth-container">
       <div className="bg-slate-400 hidden lg:flex items-center justify-center ">
          <div className="  w-[70%] h-[70%] hidden lg:block bg-center bg-[url('./assets/login.svg')] bg-no-repeat bg-contain"></div>
        </div>
        <div className="bg-slate-200 flex justify-center items-center ">
          <Form onSubmit={onSubmit} method="post" className="flex flex-col gap-5">
            <h1 className="text-center text-xl">Login</h1>
            <FormInput
              name="email"
              type="email"
              label="Email"
              placeholder="Enter your email"
            />
            <FormInput
              name="password"
              type="password"
              label="Password"
              placeholder="Enter your password"
            />
            <div>
              <button className="btn bg-slate-400 text-white mr-2">Login</button>
              <button type="button" className="btn bg-slate-600 text-white"> Continue with Google</button>
            </div>
            <div>
              <p>No Account? No Worries! <Link to='/register' className="link link-accent">Register</Link></p>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Login;
