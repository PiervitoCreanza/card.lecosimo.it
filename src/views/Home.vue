<template>
  <section class="scene bg-home mt-3 mt-md-0">
    <div class="container my-auto align-items-center align-middle">
      <div class="row">
        <div class="col-12 col-lg-6 my-lg-auto order-lg-2">
          <!-- Image -->
          <theCard />
        </div>
        <div class="col-12 col-lg-6 my-lg-auto mt-5">
          <!-- Heading -->
          <h2 class="text-uppercase">De Giorgi's Card</h2>
          <h1 class="display-3">Accedi a un mondo di vantaggi.</h1>
          <a
            class="btn btn-large btn-light shadow text-center mt-3"
            @click="homeButton"
            >{{ buttonText }}</a
          >
        </div>
      </div>
      <div class="mt-4 mt-md-7">
        <h5>Resa possibile grazie a</h5>
        <img src="@/assets/img/sponsors@2x.png" height="100" />
        <p class="mt-2">
          <i
            >Rooster - Martinucci - Baldieri - Bar Caylè - Silvio Palma - Punto
            di Vista
          </i>
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import router from "../router";
import theCard from "@/components/TheCard.vue";
import { mapGetters } from "vuex";
export default {
  methods: {
    homeButton() {
      if (!this.isUserAuth) {
        return router.push({ name: "Login" });
      }
      if (this.isUserRetailer) {
        return router.push({ name: "RetailerHome" });
      }
      return router.push({ name: "UserHome" });
    },
  },
  computed: {
    ...mapGetters(["isUserRetailer", "isUserAuth"]),
    buttonText() {
      if (!this.isUserAuth) {
        return "Iscriviti ora";
      }
      if (this.isUserRetailer) {
        return "Scansiona la card";
      }
      return "Mostra la card";
    },
  },
  components: {
    theCard,
  },
};
</script>
