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
        router.push({ name: "LoginEsercenti" });
      }
    },
    onButton1Click() {
      if (!this.isUserAuth) {
        return this.signInWithGoogleAction(this.$route);
      }
      if (this.isUserRetailer) {
        return router.push({ name: "RetailerHome" });
      }
      return router.push({ name: "UserHome" });
    },
  },
  computed: {
    ...mapGetters(["getUser", "isUserAuth", "isUserRetailer"]),
    buttonMessage1() {
      if (!this.isUserAuth) {
        return "Accedi";
      }
      if (this.isUserRetailer) {
        return "Scansiona";
      }
      return "La mia card";
    },
    buttonMessage2() {
      return this.isUserAuth ? "Esci" : "Esercenti";
    },
  },
};
</script>
