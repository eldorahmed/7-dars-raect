import { FormInput } from "../components";
import { Form, Link, useActionData, Navigate } from "react-router-dom";
import { useAuth } from "../context/GlobalContext";
import { useState } from "react";
import { doCreateUserWithEmailAndPassword } from "../auth"; 
// action

export const action = async ({ request }) => {
  let formData = await request.formData();
  let displayName = formData.get("displayName");
  let imgURL = formData.get("imgURL");
  let email = formData.get("email");
  let password = formData.get("password");
  let passwordConfirm = formData.get("passwordConfirm");
  return { displayName, imgURL, email, password,passwordConfirm};
};

function Register() {
  const registerData = useActionData();
  registerData && console.log(registerData);
  const [isRegistering, setIsRegistering] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { userLoggedIn } = useAuth()

  const onSubmit = async (e) => {
    e.preventDefault()
    if(!isRegistering) {
        setIsRegistering(true)
        await doCreateUserWithEmailAndPassword(registerData && registerData.email, registerData && registerData.password)
    }
}

  

  return (
    <>
     {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}
      <div className="auth-container">
        <div className="bg-slate-400 hidden lg:flex items-center justify-center ">
          <div className="  w-[70%] h-[70%] hidden lg:block bg-center bg-[url('./assets/signup.svg')] bg-no-repeat bg-contain"></div>
        </div>
        <div className="bg-slate-200 flex justify-center items-center ">
          <Form  onSubmit={onSubmit} method="post" className="flex flex-col gap-1">
            <h1 className="text-center text-xl">Register</h1>
           
            <FormInput
              name="displayName"
              type="text"
              label="Name"
              placeholder="Enter your Name"
            />
            <FormInput
              name="imgURL"
              type="text"
              label="Image URL"
              placeholder="Enter your image URL"
            />
            <FormInput
              name="email"
              type="email"
              label="Email"
              placeholder="Enter your email"
            />
            <FormInput
              name="password"
              disabled={isRegistering}
              type="password"
              label="Password"
              placeholder="Enter your password"
            />
            <FormInput
              name="passwordConfirm"
              type="password"
              label=" Confirm Password"
              placeholder="Repeat your password"
            />
            <div>
              <button disabled={isRegistering} className="btn bg-slate-400 text-white mr-2">
                Register
              </button>
              <button type="button" className="btn bg-slate-600 text-white">
                {" "}
                Sign up with Google
              </button>
            </div>
            <div>
              <p>
                Already have an account?{" "}
                <Link to="/login" className="link link-accent">
                  Login Now
                </Link>
              </p>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Register;