<template>
   <nav class="navbar navbar-expand-lg light">
    <div class="container mt-2">
      <!-- Brand -->
      <router-link class="navbar-brand" to="/"><h3>De Giorgi's Card</h3></router-link>

      <div>
        <router-link class="btn btn-light-grey shadow mr-2" :to="button1Href">{{ buttonMessage1 }}</router-link>
        <div class="btn btn-light shadow" v-on:click="onButton2Click">{{ buttonMessage2 }}</div>
      </div>
    </div>
  </nav> 
</template>

<script>
import { auth, firebase } from '../assets/js/firebase'
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
        onButton2Click() {
            if (this.isUserLogged) {
                firebase.auth().signOut().then(() => {
                    router.push("/")
                })
            } else {
                router.push("/signup")
            }
            
        }
    },
    computed: {
        buttonMessage1() {
            return this.isUserLogged ? "La mia card" : "Accedi"            
        },
        button1Href() {
            return this.isUserLogged ? "/user" : "/login"
        },
        buttonMessage2() {
            return this.isUserLogged ? "Esci" : "Registrati"
        }        
    }
}
</script>
