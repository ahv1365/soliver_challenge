<template>
  <section
    class="pt-20 py-8"
    :class="{
      'overflow-hidden': isModalOpen,
      'h-screen': isModalOpen,
    }"
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <!-- Product Card -->
        <div
          v-for="product in article?.variants"
          :key="product.id"
          @click="openModal(String(product?.id))"
          class="bg-white px-2 py-4 flex flex-col items-center rounded-lg hover:shadow transition-shadow"
        >
          <img
            :src="`/assets/images/${product?.image}`"
            loading="lazy"
            alt="Product"
            class="cursor-pointer w-62 h-62 object-cover mb-4"
          />
          <div class="text-left w-full">
            <p class="font-medium text-gray-400">s.Oliver</p>
            <p class="text-md font-medium">
              {{ article?.name }}
            </p>
            <p class="text-md font-semibold">
              {{ article?.price }} {{ article?.currency?.symbol }}
            </p>
            <div class="flex items-center mt-2">
              <!-- Color dots -->
              <span
                v-for="variant in article?.variants"
                :key="variant?.colorLabel"
                :style="{ backgroundColor: variant?.colorHEX }"
                class="cursor-pointer w-4 h-4 mx-3 rounded-full inline-block mr-1 ring-1 ring-gray-200 ring-offset-4"
              ></span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Backdrop -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-0"
      @click="closeModal"
    ></div>

    <!-- Modal -->
    <ProductView
      :key="`productView_${selectedProduct}`"
      v-if="isModalOpen"
      :productId="selectedProduct"
      @close="closeModal"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import ProductView from "./ProductView/ProductView.vue";
import { useProductData } from "@/composables/useProductData";

export default defineComponent({
  name: "ProductPageView",
  components: {
    ProductView,
  },
  setup() {
    const isModalOpen = ref(false);
    const selectedProduct = ref("1");
    const closeModal = () => {
      isModalOpen.value = false;
    };
    const openModal = (product: string) => {
      isModalOpen.value = true;
      selectedProduct.value = String(product);
    };
    const {
      article,
      selectedVariantImage,
      selectSize,
      sizeClass,
      selectImage,
    } = useProductData(selectedProduct.value);
    return {
      isModalOpen,
      closeModal,
      article,
      selectedVariantImage,
      selectSize,
      sizeClass,
      selectImage,
      openModal,
      selectedProduct,
    };
  },
});
</script>

<style>
/* ... Your styles here ... */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
