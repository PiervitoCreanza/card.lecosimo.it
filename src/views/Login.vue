<template>
  <section class="scene">
    <div class="container my-auto">
      <div class="row">
        <div class="col-12 col-lg-6 order-lg-2 my-auto mt-3 mt-md-0">
          <theCard />
          <h1 class="display-3 text-center mt-3 mt-md-5">
            Accedi o Registrati
          </h1>
          <button
            type="submit"
            @click="signIn"
            class="btn btn-large btn-light shadow text-center btn-block btn-big-height mt-3"
          >
            {{ buttonMessage }}
          </button>
        </div>
        <div class="col-12 col-lg-6 my-auto mt-5 my-lg-auto order-2">
          <h2 class="text-uppercase text-right mb-0">Genera la tua</h2>
          <h1 class="display-3 text-right">De Giorgi's Card</h1>
          <p class="lead text-right">
            Accedi da subito a tutti i vantaggi dedicati agli studenti del Liceo
            Cosimo De Giorgi di Lecce. Registrati subito per usufruire delle
            numerose promozioni messe a disposizione degli utenti del liceo.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { auth } from "../assets/js/firebase";
import { mapActions } from "vuex";
import router from "../router";
import theCard from "@/components/TheCard.vue";
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
  computed: {
    buttonMessage() {
      return this.isUserLogged
        ? "Mostra la card"
        : "Accedi o Registrati con Google";
    },
  },
  methods: {
    ...mapActions(["signInWithGoogleAction"]),
    signIn() {
      if (this.isUserLogged) {
        return router.push({ name: "UserHome" });
      }
      this.signInWithGoogleAction();
    },
  },
  components: {
    theCard,
  },
};
</script>
