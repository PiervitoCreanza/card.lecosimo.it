import {firebase, db } from './firebase'
import router from '../../router'

export const googleSignIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().useDeviceLanguage();

    let isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
    if (isMobile) {
        firebase.auth().signInWithRedirect(provider);
        firebase.auth().getRedirectResult().then(function(result) {
            handleSignIn(result)
        }).catch(function(error) {
            console.log(error)
        });
    } else {
        firebase.auth().signInWithPopup(provider).then(function(result) {
            handleSignIn(result)
        }).catch(function(error) {
            console.log(error)
        });
        }

    const handleSignIn = (result) => {
        if (result.additionalUserInfo.isNewUser) {
            let user = result.user
            db.collection("users").doc(user.uid).set({
                displayName: user.displayName || "",
                email: user.email,
                photoURL: user.photoURL || "",
                uid: user.uid,
                suspended: false
            }).then(() => {
                console.log("doc added with success")
                handleRedirect()
            }).catch(err => {
                console.log("erorr adding user", err)
            })
        } else {
            handleRedirect()
        }                       
    }
    const handleRedirect = () => {
        if (this.$route.query.redirect) {
            router.push(this.$route.query.redirect)
        } else {
            router.push("/user")
        } 
    }
}