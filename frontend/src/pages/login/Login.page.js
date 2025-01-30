import React from "react";
import { useState } from "react";
import LoginForm from "../../components/login/Login.comp";
import ForgotPasswordForm from "../../components/forgot-password/ForgotPassword.comp";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loadLoginScreen, setloadLoginScreen] = useState("login");

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case "email":
                setEmail(value);
                break;
            case "password":
                setPassword(value);
                break;
            default:
                break;
        }
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            return alert("Fill up all the form!");
        }

        //TODO: call api to submit the form
        console.log(email);
        console.log(password);
    };

    const handleOnFormChange = (formType) => {
        setloadLoginScreen(formType);
    };

    return (
        <div className="login-screen">
            {loadLoginScreen === "login" && (
                <LoginForm
                    handleOnChange={handleOnChange}
                    handleOnSubmit={handleOnSubmit}
                    handleOnFormChange={handleOnFormChange}
                    email={email}
                    password={password}
                />
            )}
            {loadLoginScreen === "reset" && (
                <ForgotPasswordForm
                    handleOnChange={handleOnChange}
                    handleOnSubmit={handleOnSubmit}
                    handleOnFormChange={handleOnFormChange}
                    email={email}
                />
            )}
        </div>
    );
};

export default LoginPage;
