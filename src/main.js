import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/global.scss";
import { store } from "./store";

const app = createApp(App);

// Install the store instance as a plugin
app.config.devtools = true;
app.use(router);
app.use(store);
app.mount("#app");
