<template>
  <div class="pt-20 py-8">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <!-- Product Card -->
        <div
          v-for="product in article?.variants"
          :key="product.id"
          @click="openModal(String(product?.id))"
          class="p-4 flex flex-col items-center rounded-lg hover:shadow-md transition-shadow duration-300"
        >
          <LazyImage
            :src="`/assets/images/${product?.image}`"
            alt="Product"
            class="cursor-pointer w-full h-62 object-cover mb-4"
          />
          <div class="text-left w-full">
            <p class="text-text-secondary-light font-medium">s.Oliver</p>
            <p class="text-text-primary">
              {{ article?.name }}
            </p>
            <p class="text-text-primary font-bold">
              {{ article?.price }} {{ article?.currency?.symbol }}
            </p>
            <div class="flex items-center mt-2">
              <!-- Color Images -->
              <span
                v-for="variant in article?.variants"
                :key="variant?.colorLabel"
                :style="{ backgroundColor: variant?.colorHEX }"
                class="cursor-pointer w-4 h-4 mx-3 rounded-full inline-block ring-1 ring-gray-200 ring-offset-4"
              ></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal Backdrop -->
  <transition name="modal">
    <div
      v-if="isModalOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-center"
      @click="closeModal"
    >
      <div class="modal-content" @click.stop>
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
import ProductView from "@/component/product/ProductView.vue";
import { useProductData } from "@/composable/useProductData";

export default defineComponent({
  name: "ProductPage",
  components: {
    ProductView,
    LazyImage: defineAsyncComponent(
      () => import("@/component/ui/LazyImage.vue")
    ),
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

<style scoped>
.no-scroll {
  overflow: hidden;
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
.modal-content {
  background-color: transparent;
  border-radius: 8px;
  max-height: 90vh;
  max-width: 90vw;
  overflow-y: auto;
}
</style>
