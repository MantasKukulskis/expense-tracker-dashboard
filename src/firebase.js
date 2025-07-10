import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // <- duomenų bazė
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB810jN0G5XZ0VpebJ99zEKs_V8RVcFIRY",
    authDomain: "expense-tracker-dashboar-7ca0c.firebaseapp.com",
    projectId: "expense-tracker-dashboar-7ca0c",
    storageBucket: "expense-tracker-dashboar-7ca0c.appspot.com",
    messagingSenderId: "392737278963",
    appId: "1:392737278963:web:ae8eba8201fcb8f917e086",
    measurementId: "G-8M7CZP1VDG"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);