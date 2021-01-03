import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";
// import { postSignUpScripts } from './signIn' Decomment after March 2021

// Firebase app config
var firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// utils
const db = firebase.firestore();
const auth = firebase.auth();

// Method for path guard
auth.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};
/* Decomment after March 2021
firebase.auth().getRedirectResult().then((result)=> {
    if (result.user) {
        result.additionalUserInfo.isNewUser && postSignUpScripts(result.user)
    }    
})*/

// export utils
export { auth, db, firebase };
