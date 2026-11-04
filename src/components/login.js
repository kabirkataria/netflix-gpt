import { useState } from "react"
import Header from "./Header"

const Login =  () => {

    const [isSigninForm, setIsSignInForm] = useState(true);

    const toggleSignInForm = () => {
        setIsSignInForm(!isSigninForm)
    }
    return (
        <div>
            <Header/>
            <div className="absolute">
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/29195c81-5ebb-453e-82e9-d3a50737dfb3/web/IN-en-20261026-TRIFECTA-perspective_ef561213-292c-4768-aef0-c1db800e385e_large.jpg" alt="logo"/>
            </div>
            <form className="w-3/12 absolute p-12 bg-black my-48 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-75">
                <h1 className="font-bold text-3xl py-4">{isSigninForm ? "Sign In" : "Sign Up"}</h1>
                {!isSigninForm && (<input type="text" placeholder="Full Name" className="p-4 my-4 w-full bg-gray-700"/>)}
                <input type="text" placeholder="Email Address" className="p-4 my-4 w-full bg-gray-700"/>
                <input type="password" placeholder="Password" className="p-4 my-4 w-full bg-gray-700"/>
                <button className="p-4 my-6 bg-red-700 w-full rounded-lg">{isSigninForm ? "Sign In" : "Sign Up"}</button>
                <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>{isSigninForm ? "New to Netflix? Sign Up Now" : "Already Registered? Sign In Now"} </p>
            </form>
        </div>
    )
}

export default Login

