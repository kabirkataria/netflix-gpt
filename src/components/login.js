import { useRef, useState } from "react"
import Header from "./Header"
import { checkValidateData } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import  { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { USER_AVATAR } from "../utils/constants";

const Login =  () => {

    const [isSigninForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const dispatch = useDispatch();
    
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const handleButtonClick = () => {
        // Validate the form data
        const message = checkValidateData(email.current.value,password.current.value);
        setErrorMessage(message);

        if(message) return;

        if(!isSigninForm){
            // Sign up Logic
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                updateProfile(user, {
                displayName: name.current.value, photoURL: USER_AVATAR
                }).then(() => {
                    const { uid, email, displayName, photoURL} = auth.currentUser;
                    dispatch(addUser({uid: uid, email: email, displayName: displayName , photoURL: photoURL }));
                }).catch((error) => {
                    setErrorMessage(error.message);
                });
                
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode + "-" + errorMessage)
            });
        } else {
            // Sign In Logic
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode + "-" + errorMessage)
            });
        }
    }
    const toggleSignInForm = () => {
        setIsSignInForm(!isSigninForm)
    }
    return (
        <div>
            <Header/>
            <div className="absolute">
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/29195c81-5ebb-453e-82e9-d3a50737dfb3/web/IN-en-20261026-TRIFECTA-perspective_ef561213-292c-4768-aef0-c1db800e385e_large.jpg" alt="logo"/>
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="w-3/12 absolute p-12 bg-black my-48 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-75">
                <h1 className="font-bold text-3xl py-4">{isSigninForm ? "Sign In" : "Sign Up"}</h1>
                {!isSigninForm && (<input ref={name} type="text" placeholder="Full Name" className="p-4 my-4 w-full bg-gray-700"/>)}
                <input ref={email} type="text" placeholder="Email Address" className="p-4 my-4 w-full bg-gray-700"/>
                <input ref={password} type="password" placeholder="Password" className="p-4 my-4 w-full bg-gray-700"/>
                <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
                <button onClick={handleButtonClick} className="p-4 my-6 bg-red-700 w-full rounded-lg">{isSigninForm ? "Sign In" : "Sign Up"}</button>
                <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>{isSigninForm ? "New to Netflix? Sign Up Now" : "Already Registered? Sign In Now"} </p>
            </form>
        </div>
    )
}

export default Login

