import React, { useState } from "react";
import { signInWithGoogle, signInWithEmail } from "../../utils/firebase";
import {
    getAuth,
    signOut,
    setPersistence,
    browserLocalPersistence,
} from "firebase/auth";
import LoginForm from "../../components/login/Login.comp";
import ForgotPasswordForm from "../../components/forgot-password/ForgotPassword.comp";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loadLoginScreen, setLoadLoginScreen] = useState("login");
    const auth = getAuth();

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        if (name === "email") setEmail(value);
        if (name === "password") setPassword(value);
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) return alert("Fill up all the fields!");

        try {
            await signOut(auth);
            await setPersistence(auth, browserLocalPersistence);

            const user = await signInWithEmail(email, password);
            console.log("Logged in:", user);
            alert(`Welcome, ${user.displayName || email}!`);
        } catch (error) {
            console.error(error);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await signOut(auth);
            await setPersistence(auth, browserLocalPersistence);

            const user = await signInWithGoogle();
            console.log("Google Login Successful:", user);
            alert(`Welcome, ${user.displayName}!`);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="login-screen">
            {loadLoginScreen === "login" && (
                <LoginForm
                    handleOnChange={handleOnChange}
                    handleOnSubmit={handleOnSubmit}
                    handleOnFormChange={setLoadLoginScreen}
                    handleGoogleLogin={handleGoogleLogin}
                    email={email}
                    password={password}
                />
            )}
            {loadLoginScreen === "reset" && (
                <ForgotPasswordForm
                    handleOnChange={handleOnChange}
                    handleOnSubmit={handleOnSubmit}
                    handleOnFormChange={setLoadLoginScreen}
                    email={email}
                />
            )}
        </div>
    );
};

export default LoginPage;
