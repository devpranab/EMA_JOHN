// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDD5srIrtobkeyGL9aTP49tI8bB_SeTznw",
    authDomain: "ema-john-51792.firebaseapp.com",
    projectId: "ema-john-51792",
    storageBucket: "ema-john-51792.appspot.com",
    messagingSenderId: "317303505578",
    appId: "1:317303505578:web:e03d38469db6c8b75046d3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);