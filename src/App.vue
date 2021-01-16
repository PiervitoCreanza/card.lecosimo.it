<template>
  <div>
    <template v-if="!isAuthLoading">
      <Navigation />
      <router-view />
    </template>
    <LoadingScreen
      :loadingText="isAuthLoading && 'Accesso in corso'"
      v-if="isAuthLoading"
      :fullWidth="true"
    />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { auth } from "./assets/js/firebase";
import Navigation from "./components/Navigation.vue";
import LoadingScreen from "./components/LoadingScreen.vue";

export default {
  mounted() {
    this.authAction(); // Monit user status
    // If user is not legged in
    if (!auth.currentUser) {
      this.setAuthLoading(true); // Show loading screen
      console.log("%c waiting for login", "background: #222; color: #bada55");
    }
  },
  methods: {
    ...mapActions(["authAction"]),
    ...mapMutations(["setAuthLoading"]),
  },
  computed: {
    ...mapState(["isAuthLoading"]),
  },
  components: {
    Navigation,
    LoadingScreen,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
