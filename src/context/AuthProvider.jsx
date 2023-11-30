import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from "../firebase/firebase.config";
import Swal from "sweetalert2";

export const AuthContext = createContext(null)
const auth = getAuth(app)
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider()

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)

    }

    const userSignin = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)

    }

    const googleSignin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)
            if (currentUser && currentUser.email) {
                const loggedUser = {
                    email: currentUser?.email
                }
                fetch("https://car-doctors-server-pink.vercel.app/jwt", {
                    method: 'POST',
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(loggedUser),
                })
                    .then(res => res.json())
                    .then(data => {
                        localStorage.setItem("car-access-token", data.token)
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Login has been done",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    })
            }
            else {
                localStorage.removeItem("car-access-token")
            }
        });
        return () => {
            return unsubcribe()
        }
    }, [])
    const authInfo = {
        user,
        loading,
        createUser,
        userSignin,
        googleSignin,
        logOut
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;