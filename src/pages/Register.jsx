import { FormInput } from "../components";
import { Form, Link, useActionData, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

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

import { useRegister } from "../hooks/useRegister";

function Register() {
  const registerData = useActionData();
  const {registerWithGoogle,isPanding,registerEmailAndPassword}=useRegister()

useEffect(()=>{
  if(registerData){
    registerEmailAndPassword(registerData.email,registerData.password,registerData.passwordConfirm,registerData.displayName,registerData.imgURL)
  }

},[registerData])
  

  return (
    <>
      <div className="auth-container">
        <div className="bg-slate-400 hidden lg:flex items-center justify-center ">
          <div className="  w-[70%] h-[70%] hidden lg:block bg-center bg-[url('./assets/signup.svg')] bg-no-repeat bg-contain"></div>
        </div>
        <div className="bg-slate-200 flex justify-center items-center ">
          <Form method="post" className="flex flex-col gap-1">
            <h1 className="text-center text-xl">Register</h1>
           
            <FormInput
              name="displayName"
              type="text"
              label="Name"
              placeholder="Enter your Name"
              required
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
              required
            />
            <FormInput
              name="password"
              type="password"
              label="Password"
              placeholder="Enter your password"
              required
            />
            <FormInput
              name="passwordConfirm"
              type="password"
              label=" Confirm Password"
              placeholder="Repeat your password"
              required
            />
            <div>
              <button disabled={isPanding}  className="btn bg-slate-400 text-white mr-2">
                {isPanding ? "Loading" : "Register"}
              </button>
              <button disabled={isPanding} onClick={registerWithGoogle} type="button" className="btn bg-slate-600 text-white">
                {" "}
                {isPanding ? 'Loading...' : 'Sign up with Google' }
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
