<template>
  <div>
    <Navigation />
    <router-view />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Navigation from "./components/Navigation.vue";
export default {
  mounted() {
    this.authAction();
  },
  methods: {
    ...mapActions(["authAction"]),
  },
  components: {
    Navigation,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
