import React, {useState} from 'react';
import './Login.css';
import { auth } from './firebase.config';
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

const Login = () => {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false
    });

    const googleProvider = new GoogleAuthProvider();

    const handleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const { displayName, email, photoURL } = result.user;
                console.log(displayName, email, photoURL);
                //save data in state
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                }
                setUser(signedInUser);

            }).catch((error) => {
                // Handle Errors here.
                console.log(error);
                console.log(error.message);
            });
    }

    const handleSignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            const signedOutUser = {
                isSignedIn: true,
                name: '',
                email: '',
                photo: ''
            }
            setUser(signedOutUser);
        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <div className='login'>
            {
                user.isSignedIn ? <button onClick={handleSignOut}>Sign-out</button> :
                <button onClick={handleSignIn}>Sign-in</button>
            }
             {user.success && <p style={{color: "blue"}}>Successfully user {newUser ? "created" : "logged in"}!</p>}
        </div>
    );
};

export default Login;