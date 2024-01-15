<template>
  <div class="product-page">
    <!-- Product Card -->
    <div
      v-for="product in article?.variants"
      :key="product.id"
      @click="openModal(String(product?.id))"
      class="product-page--card"
    >
      <LazyImage
        :src="`/assets/images/${product?.image}`"
        alt="Product"
        class="product-page--card__lazy-image"
      />
      <div class="text-left w-full">
        <p class="text-text-secondary-light font-medium">s.Oliver</p>
        <p class="text-text-primary">
          {{ article?.name }}
        </p>
        <p class="text-text-primary font-bold">
          {{ article?.price }} {{ article?.currency?.symbol }}
        </p>
        <div class="product-page--card--color-image">
          <!-- Color Images -->
          <span
            v-for="variant in article?.variants"
            :key="variant?.colorLabel"
            :style="{ backgroundColor: variant?.colorHEX }"
            class="product-page--card--color-image__box"
          ></span>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal Backdrop -->
  <transition name="modal">
    <div v-if="isModalOpen" class="product-page--modal" @click="closeModal">
      <div class="product-page--modal__content" @click.stop>
        <ProductView
          :key="`productView_${selectedProduct}`"
          :productId="selectedProduct"
          @close="closeModal"
        />
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import {
  defineAsyncComponent,
  defineComponent,
  onUnmounted,
  ref,
  watchEffect,
} from "vue";
import { useProductData } from "@/composables/useProductData";
import LazyImage from "@/components/shared/LazyImage.vue";

export default defineComponent({
  name: "ProductPage",
  components: {
    ProductView: defineAsyncComponent(
      () => import("./product/ProductView.vue")
    ),
    LazyImage,
  },
  setup() {
    const isModalOpen = ref(false);
    const selectedProduct = ref("1");
    watchEffect(() => {
      if (isModalOpen.value) {
        document.body.classList.add("no-scroll");
      } else {
        document.body.classList.remove("no-scroll");
      }
    });
    onUnmounted(() => {
      document.body.classList.remove("no-scroll");
    });
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
.no-scroll {
  overflow: hidden;
}
</style>
<style scoped>
.product-page {
  @apply grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-20 py-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8;
}
.product-page--card {
  @apply p-4 flex flex-col items-center rounded-lg hover:shadow-md transition-shadow duration-300;
}
.product-page--card__lazy-image {
  @apply cursor-pointer min-w-[300px] min-h-[450px] object-cover mb-4;
}
.product-page--card--color-image {
  @apply flex items-center mt-2;
}
.product-page--card--color-image__box {
  @apply cursor-pointer w-4 h-4 mx-3 rounded-full inline-block ring-1 ring-gray-200 ring-offset-4;
}
.product-page--modal {
  @apply fixed inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-center;
}
.product-page--modal__content {
  background-color: transparent;
  border-radius: 8px;
  max-height: 90vh;
  max-width: 90vw;
  overflow-y: auto;
}
.modal-enter-active {
  transition: opacity 0.5s, transform 0.3s;
}
.modal-enter-from {
  opacity: 0;
  transform: opacity(0 0.3s);
}
.modal-enter-to {
  opacity: 1;
  transform: opacity(1 0.3s);
}
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
