import { useState, useEffect } from "react";
import { auth, signOutUser } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "../assets/images/default-avatar.png";
import { fetchRequests } from "../services/api";

const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userPhoto, setUserPhoto] = useState(defaultAvatar);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            if (localStorage.getItem("register") === "formData") {
                const result = await fetchRequests();
                setIsLoggedIn(!!result);
            } else {
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
            }
        };

        checkAuth();
    }, []);

    const handleLogout = async () => {
        localStorage.removeItem("token");
        localStorage.removeItem("register");
        localStorage.removeItem("email");
        await signOutUser();
        setIsLoggedIn(false);
        navigate("/");
    };

    return { isLoggedIn, userPhoto, handleLogout };
};

export default useAuth;
