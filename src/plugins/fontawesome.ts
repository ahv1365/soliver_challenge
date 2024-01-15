import { App } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faShoppingCart,
  faShirt,
  faBan,
  faWater,
  faWind,
} from "@fortawesome/free-solid-svg-icons";

library.add(faShoppingCart, faShirt, faBan, faWater, faWind);

export default {
  install: (app: App): void => {
    app.component("font-awesome-icon", FontAwesomeIcon);
  },
};
