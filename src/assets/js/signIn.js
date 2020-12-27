import { firebase /*db Decomment after March 2021*/ } from "./firebase";
import router from "../../router";

/* Decomment after March 2021
export const postSignUpScripts = (user) => {
    db.collection("users").doc(user.uid).set({
        displayName: user.displayName || "",
        email: user.email,
        photoURL: user.photoURL || "",
        uid: user.uid,
        suspended: false
    }).then(() => {
        console.log("doc added with success")
        //handleRedirect()
    }).catch(err => {
        console.log("erorr adding user", err)
    })
}*/

const handleRedirect = (route) => {
  if (route.query.redirect) {
    router.push(route.query.redirect);
  } else {
    router.push("/user");
  }
};

export const googleSignIn = (route) => {
  console.log(route);
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().useDeviceLanguage();

  let isMobile = window.matchMedia("only screen and (max-width: 760px)")
    .matches;
  if (isMobile) {
    firebase.auth().signInWithRedirect(provider);
  } else {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(/* result Decomment after March 2021*/) {
        handleRedirect(route); // Delete after March 2021
        /* Decomment after March 2021
            if (result.user) {
                if (result.additionalUserInfo.isNewUser) {
                    postSignUpScripts(result.user)
                } else {
                    handleRedirect(route)
                }
            }*/
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
