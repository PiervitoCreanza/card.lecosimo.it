

const submitSignUp = () => {
    console.log('ciao')
    return false
}


const googleSignIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().useDeviceLanguage();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
        console.log(result.additionalUserInfo.isNewUser)
        console.log(user.photoURL)
        
        if (result.additionalUserInfo.isNewUser) {
            db.collection("users").doc(user.uid).set({
                displayName: user.displayName || "",
                email: user.email,
                photoURL: user.photoURL || "",
                uid: user.uid,
                suspended: false
            }).then(() => {
                console.log("doc added with success")
            }).catch(err => {
                console.log("erorr adding user", err)
            })
        }
        console.log("redirect")
        //window.location.href = 'user.html';
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
}
/*
*/