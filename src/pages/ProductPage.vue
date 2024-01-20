<template>
  <div class="product-page" data-e2e="product-page-test">
    <!-- Product Card -->
    <div
      v-for="product in article?.variants"
      :key="product.image"
      class="product-page__card"
      :data-e2e="'product-card-' + product.id + '-test'"
    >
      <LazyImage
        :src="product?.image"
        :alt="product?.image"
        aspectRatio="142%"
        class="product-page__card-image"
        :containerClass="{ 'bg-white': true }"
        :data-e2e="'product-image-' + product.id + '-test'"
        @click="openModal(String(product?.id))"
      />
      <div
        class="product-page__card-detail"
        :data-e2e="'product-detail-' + product.id + '-test'"
      >
        <div class="product-page__logo" data-e2e="product-logo-test">
          s.Oliver
        </div>
        <div
          class="product-page__name"
          :data-e2e="'product-name-' + product.id + '-test'"
        >
          {{ article?.name }}
        </div>
        <div
          class="product-page__price"
          :data-e2e="'product-price-' + product.id + '-test'"
        >
          {{ article?.price }} {{ article?.currency?.symbol }}
        </div>
        <div
          class="product-page__color-images"
          :data-e2e="'product-colors-' + product.id + '-test'"
        >
          <!-- Color Images -->
          <div
            v-for="variant in article?.variants"
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
    v-if="isModalOpen"
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
  defineAsyncComponent,
  defineComponent,
  onUnmounted,
  ref,
  watchEffect,
} from "vue";
import { useProductData } from "@/composables/useProductData";

export default defineComponent({
  name: "ProductPage",
  components: {
    ProductView: defineAsyncComponent(
      () => import("@/pages/product/ProductView.vue")
    ),
    SharedModal: defineAsyncComponent(
      () => import("@/components/shared/SharedModal.vue")
    ),
    LazyImage: defineAsyncComponent(
      () => import("@/components/shared/LazyImage.vue")
    ),
  },
  setup() {
    const isModalOpen = ref(false);
    const selectedProduct = ref("1");

    watchEffect(() => {
      document.body.classList.toggle("no-scroll", isModalOpen.value);
    });

    onUnmounted(() => {
      document.body.classList.remove("no-scroll");
    });

    const closeModal = () => (isModalOpen.value = false);
    const openModal = (productId: string) => {
      isModalOpen.value = true;
      selectedProduct.value = productId;
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
      openModal,
      article,
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
</style>
<style lang="scss" scoped>
.product-page {
  @apply grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-20 py-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8;

  &__card {
    @apply p-4 flex flex-col items-center rounded-lg hover:shadow-md transition-shadow duration-300;

    &-detail {
      @apply text-left w-full;
    }

    &-image {
      @apply cursor-pointer mb-4;
    }
  }
  &__color-images {
    @apply flex items-center mt-2;
  }
  &__color-box {
    @apply cursor-pointer w-4 h-4 mx-2 rounded-full inline-block ring-1 ring-gray-200 ring-offset-4;
  }
  &__logo {
    @apply text-text-secondary-light font-medium;
  }
  &__name {
    @apply text-text;
  }

  &__price {
    @apply font-bold text-text;
  }
}
</style>
