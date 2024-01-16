import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import store from "./store";
import { makeServer } from "./mocks/mirage";

// if (process.env.NODE_ENV === "development") {
makeServer();
// }

const app = createApp(App);
app.use(store);
app.mount("#app");
