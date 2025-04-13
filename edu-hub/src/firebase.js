import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDRllIX5LNUZNsP2RtkyS0NKrSvdBzMkOU",
    authDomabutin: "hackathon-auth-e26f0.firebaseapp.com",
    projectId: "hackathon-auth-e26f0",
    storageBucket: "hackathon-auth-e26f0.firebasestorage.app",
    messagingSenderId: "894732868208",
    appId: "1:894732868208:web:615541feb9541de77932b5",
    measurementId: "G-27GF4W2ZXF"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)