<template>
  <qr-stream v-if="!isQrLoaded" @decode="onDecode"></qr-stream>
</template>
<script>
import { QrStream } from "vue3-qr-reader";
import router from "@/router";
console.log("data", QrStream);
export default {
  data() {
    return {
      isQrLoaded: false,
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
  },
  components: {
    QrStream,
  },
};
</script>
