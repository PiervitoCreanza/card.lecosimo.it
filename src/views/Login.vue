<template>
    <section class="scene">
        <div class="container my-auto">
            <div class="row">
                <div class="col-12 col-lg-6 order-lg-2 my-auto">
                    <img class="" src="@/assets/img/home-card_1.svg" alt="card" />
                    <h1 class="display-3 text-center">Accedi o Registrati</h1>
                    <button type="submit" v-on:click="googleSignIn" class="btn btn-large btn-light shadow text-center btn-block btn-big-height mt-3">Accedi con Google</button>
                </div>
                <div class="col-12 col-lg-6 my-auto mt-5 my-lg-auto order-2">
                        <h2 class="text-uppercase text-right mb-0">Genera la tua</h2>
                        <h1 class="display-3 text-right">De Giorgi's Card</h1>
                        <p class="lead text-right">Accedi da subito a tutti i vantaggi dedicati agli studenti del Liceo Cosimo De Giorgi di Lecce. Registrati subito per usufruire delle numerose promozioni messe a disposizione degli utenti del liceo. </p>                    
                </div>            
            </div>
        </div>
    </section>
</template>

<script>
import {firebase, db } from '../assets/js/firebase'
import router from '../router'
export default {
    methods: {
        googleSignIn() {
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
    }
}
</script>