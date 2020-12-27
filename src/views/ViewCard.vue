<template>
  <section class="scene mt-5 mt-md-0">
    <div class="container my-auto">
      <div class="row">
        <div class="col-12 col-md-6 my-auto">
          <div v-if="this.permissionError">
            <div class="error-message message py-4 px-5 mx-auto">
              <h1>Permessi non sufficienti</h1>
            </div>
          </div>
          <div v-else-if="this.card.exists && !this.card.suspended">
            <div class="success-message message py-4 px-5 mx-auto">
              <h1>Carta autorizzata</h1>
            </div>
            <h5 class="mt-3">Proprietario: {{ this.card.displayName }}</h5>
          </div>
          <div v-else-if="!this.card.exists">
            <div class="error-message message py-4 px-5 mx-auto">
              <h1>Card non valida</h1>
            </div>
          </div>
          <div v-else-if="this.card.exists && this.card.suspended">
            <div class="error-message message py-4 px-5 mx-auto">
              <h1>Card sospesa o scaduta</h1>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6 my-auto mt-4 mt-md-0">
          <div v-if="this.permissionError" class="text-md-right">
            <h1 class="display-4">Cosa significa?</h1>
            <p>
              Non hai i permessi per visualizzare queste informazioni. Se sei un
              esercente esegui l'accesso. Nel caso dovessi continuare a
              riscontrare problemi contatta l'assistenza.
            </p>
            <button
              @click="signIn"
              class="btn btn-large btn-light shadow text-center"
            >
              Accedi come esercente
            </button>
          </div>
          <div
            v-else-if="this.card.exists && this.card.suspended"
            class="text-md-right"
          >
            <h1 class="display-4">Cosa significa?</h1>
            <p>
              La card scansionata è scaduta oppure è stata sospesa. L'utente che
              la possiede non ha diritto a eventuali sconti. Per approfondimenti
              contatta l'assistenza.
            </p>
          </div>
          <div v-else-if="!this.card.exists" class="text-md-right">
            <h1 class="display-4">Cosa significa?</h1>
            <p>
              La card scansionata non esiste nei nostri sistemi, potrebbe
              trattarsi di una carta falsa o duplicata. L'utente che la possiede
              non ha diritto a eventuali sconti. Per approfondimenti contatta
              l'assistenza.
            </p>
          </div>
          <div v-else-if="this.card.exists && !this.card.suspended">
            <h1 class="display-4">Ultima scansione</h1>
            <p v-if="this.card.lastScan" class="mb-0">
              L'ultima volta che questa card è stata utilizzata presso il tuo
              negozio era il:
            </p>
            <div v-if="this.card.lastScan">
              <h1>{{ this.card.lastScan }}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { db, auth } from "../assets/js/firebase";
export default {
  created() {
    auth.onAuthStateChanged((user) => {
      console.log(user.uid);
      db.collection("users")
        .doc(this.$route.params.id)
        .get()
        .then((res) => {
          if (res.exists) {
            let data = res.data();
            console.log(data);
            this.card = {
              exists: true,
              suspended: data.suspended,
              displayName: data.displayName,
              lastScan:
                data.lastScan[user.uid] &&
                data.lastScan[user.uid]
                  .toDate()
                  .toISOString()
                  .split("T")[0],
            };
            db.collection("users")
              .doc(data.uid)
              .update({
                lastScan: {
                  [user.uid]: new Date(),
                },
              });
          } else {
            this.card.exists = false;
          }
        })
        .catch((err) => {
          this.permissionError = true;
          console.log(err);
          console.log("permessi non sufficienti");
        });
    });
  },
  data() {
    return {
      card: {
        exists: false,
        suspended: false,
        displayName: null,
        lastScan: null,
      },
      permissionError: false,
    };
  },
  methods: {
    signIn() {},
  },
};
</script>
