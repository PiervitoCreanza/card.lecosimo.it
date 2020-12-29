<template>
  <section class="scene mt-3 mt-md-0">
    <div class="container my-auto">
      <div class="row">
        <div class="col-12 col-md-6">
          <template v-if="!isQrLoaded && !error.isError">
            <h1 class="mb-4">Inquadra il QR Code</h1>
            <qr-stream @decode="onDecode" @init="onInit"></qr-stream>
          </template>

          <h1 v-if="isScannerLoaded">Caricamento in corso..</h1>
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
        router.push("/viewcard/" + decodedString);
        this.isQrLoaded = false;
      }
      console.log(decodedString);
    },
    async onInit(promise) {
      this.isScannerLoaded = false;
      console.log("hello");
      try {
        const { capabilities } = await promise;
        console.log(capabilities);
        // successfully initialized
        this.isScannerLoaded = false;
      } catch (error) {
        this.error = formatError(error.name);
      } finally {
        console.log("working");
        //
      }
    },
  },
  components: {
    QrStream,
  },
};
</script>
