<template>
  <section class="scene">
    <div class="container my-auto">
      <div class="row">
        <div class="col-12 col-lg-6 order-lg-2 my-auto mt-3">
          <theCard />
          <h1 class="display-3 text-center mt-3 mt-md-5">
            Accedi come esercente
          </h1>
          <form>
            <div class="form-group">
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Inserisci la tua email"
                v-model="email"
              />
            </div>
            <div class="form-group mt-3">
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                v-model="password"
              />
            </div>
          </form>

          <button
            type="submit"
            @click="signIn"
            class="btn btn-large btn-light shadow text-center btn-block btn-big-height mt-3"
          >
            {{ buttonMessage }}
          </button>
        </div>
        <div class="col-12 col-lg-6 my-auto mt-5 my-lg-auto order-2">
          <h2 class="text-uppercase text-right mb-0">Valida le</h2>
          <h1 class="display-3 text-right">De Giorgi's Card</h1>
          <p class="lead text-right">
            Sei un esercente? Accedi al pannello di gestione per validare le
            card che vengon utilizzate presso il tuo negozio.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
//<img class="firebaseui-idp-icon" alt="" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg">
import { auth } from "../assets/js/firebase";
import TheCard from "@/components/TheCard.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  created() {
    auth.onAuthStateChanged((user) => {
      this.isUserLogged = user ? true : false;
    });
  },
  data() {
    return {
      isUserLogged: false,
      email: "",
      password: "",
    };
  },
  computed: {
    ...mapGetters(["getUser", "isUserAuth"]),
    buttonMessage() {
      console.log(this.isUserAuth);
      return this.isUserAuth ? "Mostra la card" : "Accedi come esercente";
    },
  },
  methods: {
    ...mapActions(["signInAction"]),
    signIn() {
      this.signInAction({ email: this.email, password: this.password });
    },
  },
  components: {
    TheCard,
  },
};
</script>
