import { Module } from "vuex";
import { ProductPageState, RootState } from "../storeInterface";
import { productState } from "../storeInitialState";

const productModule: Module<ProductPageState, RootState> = {
  namespaced: true,
  state: productState,
  mutations: {
    setModalState(state, isOpen: boolean) {
      state.isModalOpen = isOpen;
    },
    setSelectedProduct(state, productId: string | null) {
      state.selectedProduct = productId;
    },
  },
  actions: {
    openModal({ commit }, productId: string) {
      commit("setModalState", true);
      commit("setSelectedProduct", productId);
    },
    closeModal({ commit }) {
      commit("setModalState", false);
      commit("setSelectedProduct", null);
    },
  },
};

export default productModule;
