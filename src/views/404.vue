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
          <h1 class="display-3">Errore 404</h1>
          <p class="lead">
            Ops... Ci dispiace, ma la pagina che stai cercando non esiste,
            controlla di aver digitato correttamente l'indirizzo url.
          </p>
          <a
            class="btn btn-large btn-light shadow text-center mt-3"
            @click="mainButton"
            >Portami a casa</a
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
import TheCard from "@/components/TheCard.vue";
import router from "@/router";
export default {
  methods: {
    mainButton() {
      router.push({ name: "Home" });
    },
  },
  components: {
    TheCard,
  },
};
</script>
