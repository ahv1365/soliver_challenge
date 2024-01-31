<template>
  <div class="product-page" data-e2e="product-page-test">
    <!-- Product Card -->
    <div
      v-for="product in productData?.variants"
      :key="product?.image"
      class="product-page__card"
      :data-e2e="'product-card-' + product?.id + '-test'"
    >
      <div class="product-page__card-image">
        <LazyImage
          :src="product?.image"
          :alt="product?.image"
          aspectRatio="142%"
          :containerClass="{ 'bg-white': true }"
          :data-e2e="'product-image-' + product?.id + '-test'"
          @click="openModal(String(product?.id))"
        />
      </div>
      <div
        class="product-page__card-detail"
        :data-e2e="'product-detail-' + product?.id + '-test'"
      >
        <div class="product-page__logo" data-e2e="product-logo-test">
          s.Oliver
        </div>
        <div
          class="product-page__name"
          :data-e2e="'product-name-' + product?.id + '-test'"
        >
          {{ productData?.name }}
        </div>
        <div
          class="product-page__price"
          :data-e2e="'product-price-' + product?.id + '-test'"
        >
          {{ productData?.price }} {{ productData?.currency?.symbol }}
        </div>
        <div
          class="product-page__color-images"
          :data-e2e="'product-colors-' + product?.id + '-test'"
        >
          <!-- Color Images -->
          <div
            v-for="variant in productData?.variants"
            :key="variant?.colorLabel"
            :style="{ backgroundColor: variant?.colorHEX }"
            class="product-page__color-box"
            :data-e2e="'color-box-' + variant.colorLabel + '-test'"
            @click="openModal(String(product?.id))"
          ></div>
        </div>
      </div>
    </div>
  </div>
  <!-- ... other parts of your template ... -->
  <SharedModal
    :isModalOpen="isModalOpen"
    :closeModal="closeModal"
    data-e2e="shared-modal-test"
  >
    <ProductView
      :key="`productView_${selectedProduct}`"
      :productId="selectedProduct"
      @close="closeModal"
      data-e2e="product-view-test"
    />
  </SharedModal>
</template>

<script lang="ts">
import {
  computed,
  defineAsyncComponent,
  defineComponent,
  onUnmounted,
  watchEffect,
} from "vue";
import { useProductData } from "@/composables/useProductData";
import { useStore } from "vuex";
import LazyImage from "@/components/shared/LazyImage.vue";

export default defineComponent({
  name: "ProductPage",
  components: {
    ProductView: defineAsyncComponent(
      () => import("@/pages/product/ProductView.vue")
    ),
    SharedModal: defineAsyncComponent(
      () => import("@/components/shared/SharedModal.vue")
    ),
    LazyImage,
  },
  setup() {
    const store = useStore();
    const isModalOpen = computed(() => store?.state?.product.isModalOpen);
    const selectedProduct = computed(
      () => store?.state?.product.selectedProduct
    );
    const {
      productData,
      selectedVariantImage,
      selectSize,
      sizeClass,
      selectImage,
    } = useProductData(selectedProduct.value);
    const openModal = (productId: string) => {
      document.body.classList.add("no-scroll");
      store.dispatch("product/openModal", productId);
    };
    const closeModal = () => {
      store.dispatch("product/closeModal");
      document.body.classList.remove("no-scroll");
    };

    return {
      isModalOpen,
      closeModal,
      openModal,
      productData,
      selectedVariantImage,
      selectSize,
      sizeClass,
      selectImage,
      selectedProduct,
    };
  },
});
</script>

<style>
.no-scroll {
  overflow: hidden;
}
/* Fade transition styles */
.fade-enter-active {
  transition: opacity 0.5s;
}
.fade-leave-active {
  transition: opacity 0s;
}
.fade-enter-from {
  opacity: 0;
}
.fade-leave-to {
  opacity: 1;
}
</style>

<style lang="scss" scoped>
.product-page {
  @apply grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-20 py-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8;
  &__card {
    @apply p-4 flex flex-col items-center rounded-lg hover:shadow-md transition-shadow duration-300;

    &-detail {
      @apply text-left w-full min-h-20;
    }

    &-image {
      @apply cursor-pointer mb-4 w-full;
    }
  }

  &__color-images {
    @apply flex items-center mt-2 min-h-5;
  }

  &__color-box {
    @apply cursor-pointer w-4 h-4 mx-2 rounded-full inline-block ring-1 ring-gray-200 ring-offset-4;
  }

  &__logo {
    @apply text-text-secondary-light font-medium min-h-5;
  }

  &__name {
    @apply text-text min-h-5;
  }

  &__price {
    @apply font-bold text-text min-h-5;
  }
}
</style>
