import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

var firebaseConfig = {
};

var firebaseProject = firebase.initializeApp(firebaseConfig);

export const firebaseDB = firebaseProject.database();

export const firebaseAuth = firebaseProject.auth();

export const firebaseEmailAuthProvider = firebase.auth.EmailAuthProvider;