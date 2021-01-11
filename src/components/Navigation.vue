<template>
  <nav class="navbar navbar-expand-lg light">
    <div class="container mt-2">
      <!-- Brand -->
      <router-link class="navbar-brand" to="/">
        <h3>De Giorgi's Card</h3>
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
import router from "../router";
import { mapActions, mapGetters } from "vuex";
export default {
  methods: {
    ...mapActions(["signInWithGoogleAction", "signOutAction"]),
    onButton2Click() {
      if (this.isUserAuth) {
        this.signOutAction();
      } else {
        router.push({ name: "Esercenti" });
      }
    },
    onButton1Click() {
      this.isUserAuth
        ? router.push("/user")
        : this.signInWithGoogleAction(this.$route);
    },
  },
  computed: {
    ...mapGetters(["getUser", "isUserAuth"]),
    buttonMessage1() {
      return this.isUserAuth ? "La mia card" : "Accedi";
    },
    button1Href() {
      return this.isUserAuth ? "/user" : "/login";
    },
    buttonMessage2() {
      return this.isUserAuth ? "Esci" : "Esercenti";
    },
  },
};
</script>
