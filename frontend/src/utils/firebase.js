import { initializeApp } from "firebase/app";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({ prompt: "select_account" });

export const signOutUser = async () => {
    try {
        await signOut(auth);
        console.log("User signed out successfully");
        localStorage.removeItem("token");
    } catch (error) {
        console.error("Sign Out Error:", error.message);
    }
};

export const signInWithGoogle = async () => {
    try {
        await signOutUser();

        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        const token = await user.getIdToken();

        console.log("Google Sign-In Success:", user, "Token:", token);
        localStorage.setItem("token", token);

        return { user, token };
    } catch (error) {
        console.error("Google Sign-In Error:", error.message);
        alert(error.message);
    }
};

export const signInWithEmail = async (email, password) => {
    try {
        await signOutUser();

        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;
        const token = await user.getIdToken();

        console.log("Email Login Success:", user, "Token:", token);
        localStorage.setItem("token", token);

        return { user, token };
    } catch (error) {
        console.error("Email Sign-In Error:", error.message);
        alert(error.message);
    }
};
