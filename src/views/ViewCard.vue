<template>
  <section class="scene mt-3 mt-md-0">
    <div class="container my-auto">
      <div class="row">
        <div class="col-12 col-md-6 my-auto">
          <div v-if="error.isError">
            <div class="error-message message py-4 px-5 mx-auto">
              <h1>{{ error.message.title }}</h1>
              <button
                v-if="error.code === 'permission-denied'"
                @click="signIn"
                class="btn btn-large btn-light shadow text-center"
              >
                Accedi come esercente
              </button>
            </div>
          </div>

          <div v-else-if="card.isLoaded && !card.suspended">
            <div class="success-message message py-4 px-5 mx-auto">
              <h1>Carta autorizzata</h1>
            </div>
            <h5 class="mt-3">Proprietario: {{ card.displayName }}</h5>
          </div>

          <div v-else-if="card.isLoaded && card.suspended">
            <div class="error-message message py-4 px-5 mx-auto">
              <h1>Card sospesa o scaduta</h1>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-6 my-auto mt-4 mt-md-0">
          <div v-if="card.isLoaded && card.suspended" class="text-md-right">
            <h1 class="display-4">Cosa significa?</h1>
            <p>
              La card scansionata è scaduta oppure è stata sospesa. L'utente che
              la possiede non ha diritto a eventuali sconti. Per approfondimenti
              contatta l'assistenza.
            </p>
          </div>

          <div v-else-if="error.isError" class="text-md-right">
            <h1 class="display-4">Cosa significa?</h1>
            <p>{{ error.message.description }}</p>
          </div>

          <div v-else-if="card.isLoaded && !card.suspended">
            <template v-if="card.lastScan">
              <h1 class="display-4">
                Ultima scansione
              </h1>
              <p class="mb-0">
                L'ultima volta che questa card è stata utilizzata presso il tuo
                negozio era il:
              </p>
              <h1>{{ card.lastScan }}</h1>
            </template>

            <button
              @click="redirectToScan"
              class="btn btn-large btn-light shadow text-center mt-lg-4"
            >
              Scansiona un'altra carta
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { db, auth } from "../assets/js/firebase";
import router from "@/router";
import { formatError } from "@/assets/js/errorHandler";
export default {
  created() {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        console.log("user not authenticated");
        return (this.error = formatError("permission-denied"));
      }

      db.collection("users")
        .doc(this.$route.params.id)
        .get()
        .then((res) => {
          if (!res.exists) {
            return (this.error = formatError("cardDoesNotExist"));
          }

          let data = res.data();
          console.log(data);
          this.card = {
            isLoaded: true,
            suspended: data.suspended,
            displayName: data.displayName,
            lastScan:
              data.lastScan &&
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
            })
            .catch((err) => {
              console.log("err updating doc", err);
            });
        })
        .catch((err) => {
          console.log(err);
          this.error = formatError(err.code);
        });
    });
  },
  data() {
    return {
      card: {
        isLoaded: false,
        suspended: false,
        displayName: null,
        lastScan: null,
      },
      error: {
        isError: false,
        message: {
          title: null,
          description: null,
        },
      },
      permissionError: false,
    };
  },
  methods: {
    signIn() {
      console.log(router.currentRoute.value.fullPath);
      router.push({
        name: "LoginEsercenti",
        query: { redirect: router.currentRoute.value.fullPath },
      });
    },
    redirectToScan() {
      router.push("/home-esercenti");
    },
  },
};
</script>
