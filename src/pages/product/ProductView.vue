<template>
  <div class="product-view" data-e2e="product-view-test">
    <div class="product-view__close-button">
      <CloseButton @close="closeModal" />
    </div>
    <div class="product-view__container" data-e2e="product-view-container-test">
      <ImageCarousel v-if="productData" :product="productData" />
      <ProductDetails
        v-if="productData"
        :product="productData"
        :selectColor="selectColor"
        :sizeClass="sizeClass"
        :selectSize="selectSize"
      />
    </div>
    <TabsComponent
      v-if="productData"
      class="product-view__tab"
      data-e2e="product-view-tab-test"
      :tabs="productData?.tabs"
    />
    <AccordionComponent
      v-if="productData"
      class="product-view__accordion"
      data-e2e="product-view-accordion-test"
      :tabs="productData?.tabs"
    />
    <StickyFooter
      v-if="productData"
      :productName="productData?.name"
      @add-to-cart="handleAddToCart"
    />
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, PropType } from "vue";
import { useProductData } from "@/composables/useProductData";

export default defineComponent({
  name: "ProductView",
  props: {
    productId: {
      type: String as PropType<string>,
      required: true,
    },
  },
  components: {
    CloseButton: defineAsyncComponent(
      () => import("@/components/shared/CloseButton.vue")
    ),
    StickyFooter: defineAsyncComponent(
      () => import("@/components/product/sections/StickyFooter.vue")
    ),
    ProductDetails: defineAsyncComponent(
      () => import("@/components/product/sections/ProductDetails.vue")
    ),
    AccordionComponent: defineAsyncComponent(
      () => import("@/components/product/sections/Accordion.vue")
    ),
    TabsComponent: defineAsyncComponent(
      () => import("@/components/product/sections/Tab.vue")
    ),
    ImageCarousel: defineAsyncComponent(
      () => import("@/components/product/sections/ImageCarousel.vue")
    ),
  },

  setup(props, { emit }) {
    const { productData, selectSize, sizeClass, selectColor } = useProductData(
      props.productId
    );

    const handleAddToCart = (productName: string) => {
      console.log("Product to add to cart:", productName);
      // Further logic to handle adding the product to the cart
    };

    const closeModal = () => {
      emit("close");
    };

    return {
      handleAddToCart,
      productData,
      selectSize,
      selectColor,
      sizeClass,
      closeModal,
    };
  },
});
</script>

<style lang="scss" scoped>
.product-view {
  @apply absolute inset-2 md:inset-2 lg:inset-10 xl:inset-16 max-h-[1000px] m-auto border lg:w-2/3 xl:w-1/2 shadow-lg rounded-md bg-bg overflow-auto;
  &__close-button {
    @apply sticky top-0 right-0 z-10;
  }

  &-enter-active {
    @apply transition-opacity duration-1000;
  }

  &-enter-from {
    opacity: 0;
  }

  &-enter-to {
    opacity: 1;
  }

  &__container {
    @apply container mx-auto my-0 px-5 py-5 flex flex-col md:flex-row;
  }

  &__tab {
    @apply hidden md:block;
  }

  &__accordion {
    @apply block md:hidden;
  }
}
</style>
