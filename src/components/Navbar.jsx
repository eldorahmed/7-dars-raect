import {Link, useNavigate,NavLink} from "react-router-dom"
import { useGlobalContext } from "../context/GlobalContext"
import { signOut } from "firebase/auth"
import { auth } from "../firebase/firebaseConfig"
import toast from "react-hot-toast"
function Navbar() {
    const signOutProfile= async()=>{
      await signOut(auth)
      toast.success('See you soon!')
    }
    const {user}=useGlobalContext()

  return (
    <div className=" container mx-auto navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">Woo</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><NavLink to="/">Home </NavLink></li>
      <li><NavLink to="/about">About</NavLink></li>
      <li><NavLink to="/contact">Contact</NavLink></li>
    </ul>
  </div>
  <div className="navbar-end">
    <p>{user.displayName}</p>
  <div className="dropdown dropdown-end mr-2">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={user.photoURL ? user.photoURL : "https://freight.cargo.site/t/original/i/a80d0a3b47187f1b4614528914996af4a56216840bd3d903e85b2a8d348ec9c7/Artboard-2.png"} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span onClick={signOutProfile} className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a onClick={signOutProfile}>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
  )
}

export default Navbar