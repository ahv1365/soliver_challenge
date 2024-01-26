import { createStore } from "vuex";
import productPage from "./modules/productPage";
import { RootState } from "./storeInterface";
import { productState } from "./storeInitialState";

export default createStore<RootState>({
  state: { product: productState },
  getters: {},
  mutations: {},
  actions: {},
  modules: { product: productPage },
});
