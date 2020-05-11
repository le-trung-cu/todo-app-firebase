// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
// import "firebase/database";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyB1NAMiSk3wIPe7B-7Jt5WZBZcVD9VnIb8",
    authDomain: "todo-app-ba288.firebaseapp.com",
    databaseURL: "https://todo-app-ba288.firebaseio.com",
    projectId: "todo-app-ba288",
    storageBucket: "todo-app-ba288.appspot.com",
    messagingSenderId: "693925251734",
    appId: "1:693925251734:web:be00b4f64fac501afd50b7",
    measurementId: "G-FY4WVSFSY1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var provider = new firebase.auth.GoogleAuthProvider();

const firestore = firebase.firestore();
// const database = firebase.database();

export const auth = firebase.auth();

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signInWithEmailAndPassword = (email, pass) => auth.signInWithEmailAndPassword(email, pass);
export const signOut = async () => {await auth.signOut(); console.log('..........sssssssssssss......')}

export const addTask = (task) => {
  if(!auth.currentUser) return;
  firestore.collection(`users/${auth.currentUser.uid}/tasks`).add({task})
}

export const tasksContext = () => firestore.collection(`users/${auth.currentUser.uid}/tasks`);

export const createUserProfileDocument = async (userAuth, addtionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const userShot = await userRef.get();
    if(!userShot.exists){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
              displayName,
              email,
              createdAt,
              ...addtionalData
            })
          } catch (error) {
            console.log('error creating user', error.message);
          }
    }
    return userRef;
}
