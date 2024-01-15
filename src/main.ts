import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import store from "./store";
import { makeServer } from "./mocks/mirage";
import LazyLoadPlugin from "./plugins/lazyload";
import FontAwesomePlugin from "./plugins/fontawesome";

// if (process.env.NODE_ENV === "development") {
makeServer();
// }

const app = createApp(App);
app.use(store);
app.use(LazyLoadPlugin);
app.use(FontAwesomePlugin);
app.mount("#app");
