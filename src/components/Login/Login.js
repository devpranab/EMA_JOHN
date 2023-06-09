import React, { useState, useContext } from 'react';
import { UserContext } from '../../App';
import { useNavigate, useLocation } from 'react-router-dom';
import './Login.css';
import { initLoginFramework } from './LoginManager';
import { handleFbSignIn, handleGoogleSignIn, handleSignOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './LoginManager';

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

    initLoginFramework();

    const navigate = useNavigate();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    //console.log(loggedInUser.email);

    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/shipment" } };

    const GoogleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                handleResponse(res, true);
            })
    }

    // handleFbSignIn function
    const FbSignIn = () => {
        handleFbSignIn()
            .then(res => {
                handleResponse(res, true);
            })
    }

    const SignOut = () => {
        handleSignOut()
            .then(res => {
                handleResponse(res, false);
            });
    }

    const handleChange = (e) => {
        let isFormValid = true;
        if (e.target.name === "email") {
            isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === "password") {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFormValid = isPasswordValid && passwordHasNumber;
        }
        if (isFormValid) {
            // if true isFormValid then work this
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }

    const handleSubmit = (e) => {
        //console.log(user.email, user.password);
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                })
    }

    if (!newUser && user.email && user.password) {
        signInWithEmailAndPassword(user.email, user.password)
            .then(res => {
                handleResponse(res, true);
            })
        }
    e.preventDefault();
}

const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
        navigate(from);
    }
}

return (
    <div className='login'>
        {
            user.isSignedIn ? <button onClick={SignOut}>Sign-out</button> :
                <button onClick={GoogleSignIn}>Sign-in</button>
        }
        <br />
        <button onClick={FbSignIn}>Sign-in with Facebook</button>
        {
            user.isSignedIn && <div>
                <p>Welcome! {user.name}</p>
                <p>Your email: {user.email}</p>
                <img src={user.photo} alt=""></img>
            </div>
        }
        {/* create simple login form email and password */}
        <h2>Our own Firebase Authentication</h2>
        <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" />
        <label htmlFor="newUser">New User Sign up</label>
        <form action="" onSubmit={handleSubmit}>
            {
                newUser &&
                <input type="text" onChange={handleChange} name="name" placeholder="your name" required />
            }
            <br />
            <input type="text" onChange={handleChange} name="email" placeholder="your email" required />
            <br />
            <input type="password" onChange={handleChange} name="password" placeholder="your passwor" required />
            <br />
            <input type="submit" value={newUser ? "Sign-up" : "Sign-in"} />
        </form>
        <p style={{ color: "red" }}>{user.error}</p>

        {user.success && <p style={{ color: "blue" }}>Successfully user {newUser ? "created" : "logged in"}!</p>}
    </div>

)
}

export default Login;