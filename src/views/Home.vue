<template>
    <section class="scene bg-home">
        <div class="container my-auto align-items-center align-middle">
            <div class="row">
                <div class="col-12 col-lg-7 order-lg-2 overflow-hidden">
                    <!-- Image -->
                    <img class="img-home-card" src="@/assets/img/home-card_1.svg" alt="card"/>
                </div>
                <div class="col-12 col-lg-5 my-auto">
                    <!-- Heading -->
                    <h2 class="text-uppercase">De Giorgi's Card</h2>
                    <h1 class="display-3">Accedi a un mondo di vantaggi.</h1>
                    <a class="btn btn-large btn-light shadow text-center mt-3" v-on:click="homeButton">{{ buttonText }}</a>
                </div>
            </div>
            <div class="row mt-5">
                <h5>Accolta nei migliori negozi</h5>
                <p>Rooster - Martinucci - Baldieri</p>
            </div>
        </div>
    </section>
</template>

<script>
import { auth } from '../assets/js/firebase'
import router from '../router'
export default {
    created() {
        auth.onAuthStateChanged(user => {
            this.isUserLogged = user ? true : false
        })
    },
    data() {
        return {
            isUserLogged: false
        }
    },
    methods: {
        homeButton() {
            router.push(this.isUserLogged ? "/user" : "/login")
        }
    },
    computed: {
        buttonText() {
            return this.isUserLogged ? "Mostra la card" : "Iscriviti ora"            
        }       
    }
}
</script>
