import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import store from "./store";
import { makeServer } from "./mocks/mirage";
import VueLazyload from "vue-lazyload";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faShoppingCart,
  faShirt,
  faBan,
  faWater,
  faWind,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faShoppingCart, faShirt, faBan, faWater, faWind);

if (process.env.NODE_ENV === "development") {
  makeServer();
}
const app = createApp(App);
app.use(store);
app.use(VueLazyload, {
  // Optional configuration options
  preLoad: 1.3,
  // error: "./assets/images/1-1.webp",
  // loading: "./assets/images/1-1.webp",
  attempt: 1,
});

app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
