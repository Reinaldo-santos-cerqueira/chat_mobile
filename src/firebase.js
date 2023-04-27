import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase

const firebaseConfig = {
    apiKey: "AIzaSyB12ppHMP21-RW0cbUN3KTQg7NIE7JVeZo",
    authDomain: "chatsnappy-12e1e.firebaseapp.com",
    projectId: "chatsnappy-12e1e",
    storageBucket: "chatsnappy-12e1e.appspot.com",
    messagingSenderId: "705712167993",
    appId: "1:705712167993:web:42a9b6cb646553438e81e8"
};
const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
 