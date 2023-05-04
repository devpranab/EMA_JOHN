import React, { useState } from 'react';
import './Login.css';
import { auth } from './firebase.config';
import { signInWithPopup, GoogleAuthProvider, signOut, FacebookAuthProvider } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    //const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false
    });
    const navigate = useNavigate();

    const googleProvider = new GoogleAuthProvider();
    const fbProvider = new FacebookAuthProvider();

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
                navigate("/shop");

            }).catch((error) => {
                // Handle Errors here.
                console.log(error);
                console.log(error.message);
            });
    }


    const handleFbSignIn = () => {
        console.log("sdgffdg");
        signInWithPopup(auth, fbProvider)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
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

    //for email & password
    const handleChange = () => { }

    const handleSubmit = () => { }

    const updateUserName = () => { }

    return (
        <div className='login'>
            {
                user.isSignedIn ? <button onClick={handleSignOut}>Sign-out</button> :
                    <button onClick={handleSignIn}>Sign-in</button>
            }
            <br />
            <button onClick={handleFbSignIn}>Sign-in with Facebook</button>
            {/* create simple login form email and password */}
            <h2>Our own Firebase Authentication</h2>
            {/* {user.success && <p style={{color: "blue"}}>Successfully user {newUser ? "created" : "logged in"}!</p>} */}

            <form onSubmit={handleSubmit}>
                <input type="text" name="email" placeholder="your email" required onChange={handleChange} />
                <br />
                <input type="password" name="password" placeholder="your passwor" required onChange={handleChange} />
                <br />
                <input type="submit" value="Sign-in" />
            </form>
            <p>Error message!</p>
        </div>
    );
};

export default Login;