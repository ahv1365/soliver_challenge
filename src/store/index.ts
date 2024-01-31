import { createStore } from "vuex";
import productPageModule from "./modules/productPageModule";
import { RootState } from "./storeInterface";
import { productState } from "./storeInitialState";

export default createStore<RootState>({
  state: { productState },
  getters: {},
  mutations: {},
  actions: {},
  modules: { product: productPageModule },
});
