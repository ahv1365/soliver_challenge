import { App } from "vue";
import VueLazyload from "vue-lazyload";

export default {
  install: (app: App): void => {
    app.use(VueLazyload, {
      // Optional configuration options
      preLoad: 0.3,
      // error: "./assets/images/1-1.webp",
      // loading: "./assets/images/1-1.webp",
      attempt: 1,
    });
  },
};
