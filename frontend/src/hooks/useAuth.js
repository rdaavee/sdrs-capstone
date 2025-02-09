import { useState, useEffect } from "react";
import { auth, signOutUser } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "../assets/images/default-avatar.png";

const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userPhoto, setUserPhoto] = useState(defaultAvatar);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(true);
                setUserPhoto(user.photoURL || defaultAvatar);
            } else {
                setIsLoggedIn(false);
                setUserPhoto(defaultAvatar);
            }
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        localStorage.removeItem("token");
        await signOutUser();
        navigate("/");
    };

    return { isLoggedIn, userPhoto, handleLogout };
};

export default useAuth;
