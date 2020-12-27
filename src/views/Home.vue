<template>
  <section class="scene bg-home">
    <div class="container my-auto align-items-center align-middle">
      <div class="row">
        <div class="col-12 col-lg-7 order-lg-2">
          <!-- Image -->
          <div class="img-home-card card-container mx-auto mt-5">
            <div class="card text-left">
              <h1
                class="m-0 card-h1 display-4"
                style="margin-top: -10px !important;"
              >
                De Giorgi's
              </h1>
              <h1 class="m-0 card-h1 display-4">Card</h1>
              <div class="mt-3" style="position: absolute; bottom: 10px;">
                <code class="card-code">8294 8173 6767 5600 3634</code>
                <div class="d-flex mt-2 ml-5">
                  <div class="mr-2 my-auto">
                    <p class="card-code card-small-code m-0">VALIDA</p>
                    <p class="card-code card-small-code m-0">FINO A</p>
                  </div>
                  <p class="card-code my-auto m-0">09/21</p>
                </div>
                <p class="card-code mt-2" style="color: white;">Mario Rossi</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-5 my-lg-auto mt-5">
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
      <div class="row mt-5">
        <h5>Accolta nei migliori negozi</h5>
        <p>Rooster - Martinucci - Baldieri</p>
      </div>
    </div>
  </section>
</template>

<script>
import { auth } from "../assets/js/firebase";
import router from "../router";
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
    homeButton() {
      router.push(this.isUserLogged ? "/user" : "/login");
    },
  },
  computed: {
    buttonText() {
      return this.isUserLogged ? "Mostra la card" : "Iscriviti ora";
    },
  },
};
</script>
