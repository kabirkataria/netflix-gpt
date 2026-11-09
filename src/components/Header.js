import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice"
import { useDispatch } from "react-redux"    
import { LOGO } from "../utils/constants";

const Header =  () => {
    const navigate = useNavigate();
    const user = useSelector(store => store.user)
    const dispatch = useDispatch();

    const handleSignOut = () => {
        signOut(auth).then(() => {
        }).catch((error) => {
            navigate("/error");
        });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName, photoURL} = user;
                dispatch(addUser({uid: uid, email: email, displayName: displayName , photoURL: photoURL }));
                navigate("/browse");
            } else {
                dispatch(removeUser());
                navigate("/");
            }
        });

        // Unsubscribe when components unmounts
        return () => unsubscribe();
        
    },[])

    return (
        <div className="absolute w-screen px-12 py-12 bg-gradient-to-b from-black z-20 flex justify-between">
            <img className="w-44" 
            src={LOGO} alt="logo"/>
        {user && (
            <div className="flex p-2">
                <img alt="usericon" className="w-12 h-12" src={user?.photoURL}/>
                <button onClick={handleSignOut} className="font-bold text-white">(Sign out)</button>
            </div>
        )}
        </div>
        
    )
}

export default Header
