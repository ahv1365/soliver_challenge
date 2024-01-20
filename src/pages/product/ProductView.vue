<template>
  <div
    v-if="article"
    :class="{ 'opacity-0': !article }"
    class="product-view"
    data-e2e="product-view-test"
  >
    <CloseButton @close="closeModal" />
    <div class="product-view__container" data-e2e="product-view-container-test">
      <ImageCarousel :article="article" />
      <ProductDetails
        :article="article"
        :selectColor="selectColor"
        :sizeClass="sizeClass"
        :selectSize="selectSize"
      />
    </div>
    <TabsComponent
      v-if="article.tabs"
      class="product-view__tab"
      data-e2e="product-view-tab-test"
      :tabs="article?.tabs"
    />
    <AccordionComponent
      v-if="article.tabs"
      class="product-view__accordion"
      data-e2e="product-view-accordion-test"
      :tabs="article?.tabs"
    />
    <StickyFooter :articleName="article?.name" @add-to-cart="handleAddToCart" />
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
      () => import("@/components/product/product-sections/StickyFooter.vue")
    ),
    ProductDetails: defineAsyncComponent(
      () => import("@/components/product/product-sections/ProductDetails.vue")
    ),
    AccordionComponent: defineAsyncComponent(
      () => import("@/components/product/product-sections/Accordion.vue")
    ),
    TabsComponent: defineAsyncComponent(
      () => import("@/components/product/product-sections/Tab.vue")
    ),
    ImageCarousel: defineAsyncComponent(
      () => import("@/components/product/product-sections/ImageCarousel.vue")
    ),
  },
  methods: {
    handleAddToCart(articleName: string) {
      console.log("Article to add to cart:", articleName);
      // Further logic to handle adding the article to the cart
    },
  },
  setup(props, { emit }) {
    const { article, selectSize, sizeClass, selectColor } = useProductData(
      props.productId
    );

    const closeModal = () => {
      emit("close");
    };

    return {
      article,
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
  @apply transition-opacity duration-500 absolute inset-2 md:inset-2 lg:inset-10 xl:inset-16 max-h-[1000px] m-auto border lg:w-2/3 xl:w-1/2 shadow-lg rounded-md bg-bg overflow-auto;

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
