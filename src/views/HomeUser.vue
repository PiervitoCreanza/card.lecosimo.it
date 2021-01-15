<template>
  <section class="scene mt-3 mt-md-0">
    <div class="container my-auto align-items-center align-middle">
      <div class="row">
        <div v-if="isQRShown" class="col-12 col-lg-7">
          <vue-qrcode v-if="this.url" :value="this.url" :width="189" />
          <h1 class="mt-3">Inquadra per scansionare</h1>
          <button
            type="submit"
            @click="toggleQR"
            class="btn btn-large btn-light shadow text-center btn-block btn-big-height mt-3 card-width mx-auto"
          >
            Torna indietro
          </button>
        </div>
        <div v-else class="col-12 col-lg-7">
          <theCard :cardId="uid" :fullName="displayName" />
          <button
            type="submit"
            @click="toggleQR"
            class="btn btn-large btn-light shadow text-center btn-block btn-big-height mt-3 card-width mx-auto"
          >
            Scansiona la carta
          </button>
        </div>
        <div class="col-12 col-lg-5 text-lg-right mt-5 mt-lg-0">
          <h1 class="display-3">Come faccio ad utilizzare la card?</h1>
          <p>
            Seleziona l'opzione <i>scansiona la carta</i> e mostra il codice qr
            a un qualsiasi negozio convenzionato. Se la tua card risulterà
            valida ed attiva sarai in grado di usufruire di tutti gli sconti
            garantiti dalla De Giorgi's Card.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { auth } from "../assets/js/firebase";
import VueQrcode from "vue-qrcode";
import theCard from "@/components/TheCard.vue";
export default {
  created() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.url = `${window.location.origin}/viewcard/${user.uid}`;
        //this.url = user.uid;
        this.displayName = user.displayName;
        this.uid = user.uid.match(/.{1,4}/g).join(" ");
      }
    });
  },
  data() {
    return {
      url: false,
      displayName: "Mario Rossi",
      isQRShown: false,
      uid: "8Cle Pnbm KUsM vXQc G3qg",
    };
  },
  methods: {
    toggleQR() {
      this.isQRShown = !this.isQRShown;
    },
  },
  components: {
    VueQrcode,
    theCard,
  },
};
</script>
