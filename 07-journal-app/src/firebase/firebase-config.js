import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDCukh7u-Q0ZD8OWGMqvP569KDY4dYVSnw",
    authDomain: "react-apps-journal-e0b87.firebaseapp.com",
    projectId: "react-apps-journal-e0b87",
    storageBucket: "react-apps-journal-e0b87.appspot.com",
    messagingSenderId: "877473107076",
    appId: "1:877473107076:web:b51a3cf7e0b3381901c6d1"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
};