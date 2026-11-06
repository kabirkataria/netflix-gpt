import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header =  () => {
    const navigate = useNavigate();
    const user = useSelector(store => store.user)
    console.log("user",user?.photoURL);

    const handleSignOut = () => {
        signOut(auth).then(() => {
            navigate("/");
        }).catch((error) => {
            navigate("/error");
        });
    }
    return (
        <div className="absolute w-screen px-12 py-12 bg-gradient-to-b from-black z-20 flex justify-between">
            <img className="w-44" 
            src="https://occ.a.nflxso.net/dnmt/api/v6/iL4oJVDYZ8KLSrJ6eG2OwtghbfQ/AAAAAchJje9GUBJ_ehbO0uOApH8QmRyuvK0LQI9obzFeGtfkpfLyh4FdolMZR4PtvyNoOomDcY7BzTbhFC3gJinH0UadYBg807AKDSPyfsUDm9T3CZKn9OSZN3II7060MZESFcb6YOS9jvzh.svg" alt="logo"/>
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
