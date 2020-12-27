<template>
  <nav class="navbar navbar-expand-lg light">
    <div class="container mt-2">
      <!-- Brand -->
      <router-link class="navbar-brand" to="/">
        De Giorgi's Card
        <img src="@/assets/img/logoLicea.png" width="40" height="40" />
      </router-link>

      <div>
        <div class="btn btn-light-grey shadow mr-2" @click="onButton1Click">
          {{ buttonMessage1 }}
        </div>
        <div class="btn btn-light shadow" @click="onButton2Click">
          {{ buttonMessage2 }}
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { auth, firebase } from "../assets/js/firebase";
import router from "../router";
import { googleSignIn } from "../assets/js/signIn";
export default {
  created() {
    auth.onAuthStateChanged((user) => {
      this.isUserLogged = user ? true : false;
    });
  },
  data() {
    return {
      isUserLogged: false,
    };
  },
  methods: {
    onButton2Click() {
      if (this.isUserLogged) {
        firebase
          .auth()
          .signOut()
          .then(() => {
            router.push("/");
          });
      } else {
        router.push("/login");
      }
    },
    onButton1Click() {
      this.isUserLogged ? router.push("/user") : googleSignIn(this.$route);
    },
  },
  computed: {
    buttonMessage1() {
      return this.isUserLogged ? "La mia card" : "Accedi";
    },
    button1Href() {
      return this.isUserLogged ? "/user" : "/login";
    },
    buttonMessage2() {
      return this.isUserLogged ? "Esci" : "Registrati";
    },
  },
};
</script>
