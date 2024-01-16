<template>
  <div
    v-if="article"
    :class="{ 'opacity-0': !article }"
    class="product-view"
    data-e2e="product-view-test"
  >
    <CloseButton @close="closeModal" />
    <div class="product-view--container" data-e2e="product-view-container-test">
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
      class="product-view--tab"
      data-e2e="product-view-tab-test"
      :tabs="article?.tabs"
    />
    <AccordionComponent
      v-if="article.tabs"
      class="product-view--accordion"
      data-e2e="product-view-accordion-test"
      :tabs="article?.tabs"
    />
    <StickyFooter :articleName="article?.name" @add-to-cart="handleAddToCart" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useProductData } from "@/composables/useProductData";
import CloseButton from "@/components/shared/CloseButton.vue";
import StickyFooter from "@/components/product/product-sections/StickyFooter.vue";
import ProductDetails from "@/components/product/product-sections/ProductDetails.vue";
import AccordionComponent from "@/components/product/product-sections/Accordion.vue";
import TabsComponent from "@/components/product/product-sections/Tab.vue";
import ImageCarousel from "@/components/product/product-sections/ImageCarousel.vue";

export default defineComponent({
  name: "ProductView",
  props: {
    productId: {
      type: String as PropType<string>,
      required: true,
    },
  },
  components: {
    CloseButton,
    StickyFooter,
    ProductDetails,
    AccordionComponent,
    TabsComponent,
    ImageCarousel,
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
<style scoped>
.product-view {
  @apply transition-opacity duration-500 absolute inset-2 md:inset-2 lg:inset-10 xl:inset-16 max-h-[1000px] m-auto border lg:w-2/3 xl:w-1/2 shadow-lg rounded-md bg-bg overflow-auto;
}
.product-view--tab {
  @apply hidden md:block;
}
.product-view--accordion {
  @apply block md:hidden;
}
.product-view--container {
  @apply container mx-auto my-0 px-5 py-5 flex flex-col md:flex-row;
}
</style>
