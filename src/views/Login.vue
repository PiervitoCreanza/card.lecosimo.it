<template>
    <section class="scene">
        <div class="container my-auto">
            <div class="row">
                <div class="col-12 col-lg-6 order-lg-2 my-auto">
                    <img class="" src="@/assets/img/home-card_1.svg" alt="card" />
                    <h1 class="display-3 text-center">Accedi o Registrati</h1>
                    <button type="submit" v-on:click="handleClick" class="btn btn-large btn-light shadow text-center btn-block btn-big-height mt-3">Accedi con Google</button>
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
import {googleSignIn} from '../assets/js/signIn'
export default {
    methods: {
        handleClick() {
            googleSignIn()
        }
    }
}
</script>