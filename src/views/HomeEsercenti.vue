<template>
  <section class="scene mt-3 mt-md-0">
    <div class="container my-auto">
      <LoadingScreen
        class="mt-5 mt-md-0"
        v-if="!error.isError && !isScannerLoaded"
        loadingText="Caricamento fotocamera"
      />
      <div class="row">
        <div class="col-12 col-md-6">
          <div v-show="isScannerLoaded && !error.isError">
            <h1 class="mb-4">Inquadra il QR Code</h1>
            <qr-stream @decode="onDecode" @init="onInit"></qr-stream>
          </div>
          <div
            v-if="error.isError"
            class="error-message message py-4 px-5 mx-auto"
          >
            <h1>{{ error.message.title }}</h1>
          </div>
        </div>
        <div class="col-12 col-md-6 my-auto mt-4 mt-md-0">
          <div v-if="error.isError" class="text-md-right">
            <h1 class="display-4">Cosa significa?</h1>
            <p>{{ error.message.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { QrStream } from "vue3-qr-reader";
import router from "@/router";
import { formatError } from "@/assets/js/errorHandler";
import LoadingScreen from "@/components/LoadingScreen.vue";
export default {
  data() {
    return {
      isQrLoaded: false,
      isScannerLoaded: false,
      test: true,
      error: {
        isError: false,
        message: {
          title: null,
          description: null,
        },
      },
    };
  },
  methods: {
    onDecode(decodedString) {
      if (decodedString) {
        router.push(
          "/viewcard/" + decodedString.match(/(?:viewcard\/)(.+)/)[1]
        );
        this.isQrLoaded = false;
      }
      console.log(decodedString);
    },
    async onInit(waitForLoading) {
      console.log("LOADING_QRSCANNER");

      waitForLoading
        .then((capabilities) => {
          console.log("SUCCESS_QRSCANNER");
          console.log(capabilities);
          this.isScannerLoaded = true;
        })
        .catch((err) => {
          console.log("ERROR_QRSCANNER");
          this.error = formatError(err.name);
        });
    },
  },
  components: {
    QrStream,
    LoadingScreen,
  },
};
</script>
