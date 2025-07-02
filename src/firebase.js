import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = initializeApp({
    apiKey: "AIzaSyC18nPPir5yD0feb8pcEbsK_tB1vC5K-yg",
    authDomain: "demoproject-5e423.firebaseapp.com",
    projectId: "demoproject-5e423",
    storageBucket: "demoproject-5e423.firebasestorage.app",
    messagingSenderId: "1019395924018",
    appId: "1:1019395924018:web:b18aa5369de8a9389f1c2b",
    measurementId: "G-XQC5Y5F8V6"
});

const auth = getAuth(firebaseConfig);
const provider = new GoogleAuthProvider();

export { auth, provider };