<template>
    <section class="scene mt-5 mt-md-0">
        <div class="container my-auto align-items-center align-middle">
            <div class="row">
                <div v-if="isQRShown" class="col-12 col-lg-7" style="height: 302px;">                
                    <vue-qrcode v-if="this.url" :value="this.url" />
                    <h1 class="mt-3">Inquadra per scansionare</h1>
                    <button type="submit" v-on:click="toggleQR" class="btn btn-large btn-light shadow text-center btn-block btn-big-height mt-3 card-width mx-auto">Torna indietro</button>
                </div>            
                <div v-else class="col-12 col-lg-7">
                    <div class="card-container mx-auto">
                        <div class="card text-left">
                            <h1 class="m-0 card-h1 display-4" style="margin-top: -10px !important;">De Giorgi's</h1>
                            <h1 class="m-0 card-h1 display-4">Card</h1>
                            <div class="mt-3" style="position: absolute; bottom: 10px;">
                                <code class="card-code">{{ this.uid }}</code>
                                <div class="d-flex mt-2 ml-5">
                                    <div class="mr-2 my-auto">
                                        <p class="card-code card-small-code m-0">VALIDA</p>
                                        <p class="card-code card-small-code m-0">FINO A</p>            
                                    </div>
                                    <p class="card-code my-auto m-0">09/21</p>
                                </div>
                                <p class="card-code mt-2" style="color: white;">{{ this.displayName }}</p>
                            </div>  
                        </div>                        
                    </div>
                    <button type="submit" v-on:click="toggleQR" class="btn btn-large btn-light shadow text-center btn-block btn-big-height mt-3 card-width mx-auto">Scansiona la carta</button>
                </div>
                <div class="col-12 col-lg-5 text-lg-right mt-5 mt-lg-0">
                  <h1 class="display-3">Come faccio ad utilizzare la card?</h1>
                  <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea com</p>
                </div>
            </div>       
        </div>
    </section>
    
</template>

<script>
import { auth } from '../assets/js/firebase'
import VueQrcode from 'vue-qrcode'
export default {
    created() {
        auth.onAuthStateChanged(user => {
            if (user) {
                this.url = `${window.location.origin}/viewcard/${user.uid}`
                this.displayName = user.displayName
                this.uid = user.uid.match(/.{1,4}/g).join(" ")
            } else {
            console.log('no logged in')
        }
        })
    },
    data() {
        return {
            url: false,
            displayName: "Mario Rossi",
            isQRShown: false,
            uid: "8Cle Pnbm KUsM vXQc G3qg"
        }
    },
    methods: {
        toggleQR() {
            this.isQRShown = !this.isQRShown
        }
    },
    components: {
    VueQrcode,
  },
}
</script>