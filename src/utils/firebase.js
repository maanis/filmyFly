// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCj3MMNqMXJkHo5L742mByDoptIowtNmJc",
    authDomain: "filmyflyy.firebaseapp.com",
    projectId: "filmyflyy",
    storageBucket: "filmyflyy.firebasestorage.app",
    messagingSenderId: "872101217154",
    appId: "1:872101217154:web:016c5e1cb17cba9dcb059b",
    measurementId: "G-XGYD8QCVN0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);