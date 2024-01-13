<template>
  <div
    class="transition-opacity duration-500"
    :class="{ 'opacity-0': !article, hidden: !article }"
  >
    <div
      v-if="article"
      class="absolute inset-2 md:inset-5 lg:inset-20 mx-auto border w-1/1 md:w-5/6 lg:w-2/3 shadow-lg rounded-md bg-white overflow-auto"
    >
      <CloseButton @close="closeModal" />
      <div class="container mx-auto my-0 px-5 py-5">
        <div class="flex flex-col md:flex-row">
          <ImageCarousel :article="article" />
          <ProductDetails
            :article="article"
            :selectColor="selectColor"
            :sizeClass="sizeClass"
            :selectSize="selectSize"
          />
        </div>
      </div>
      <TabsComponent
        v-if="article.tabs"
        class="hidden md:block"
        :tabs="article?.tabs"
      />
      <AccordionComponent
        v-if="article.tabs"
        class="block md:hidden"
        :tabs="article?.tabs"
      />
      <StickyFooter
        :articleName="article?.name"
        @add-to-cart="handleAddToCart"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useProductData } from "@/composables/useProductData";
import CloseButton from "@/components/Containers/CloseButton.vue";
import StickyFooter from "./Sections/StickyFooter.vue";
import ProductDetails from "./Sections/ProductDetails.vue";
import AccordionComponent from "./Sections/AccordionComponent.vue";
import TabsComponent from "./Sections/TabsComponent.vue";
import ImageCarousel from "./Sections/ImageCarousel.vue";

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
    const { article, selectSize, sizeClass, selectedSizeIndex, selectColor } =
      useProductData(props.productId);

    const closeModal = () => {
      emit("close");
    };

    return {
      article,
      selectSize,
      selectColor,
      sizeClass,
      selectedSizeIndex,
      closeModal,
    };
  },
});
</script>

<style scoped>
/* Media query for Desktop devices */
@media (max-width: 768px) {
  /* Styles for Desktop */
  .tabs {
    display: none;
  }
}
/* Media query for mobile devices */
@media (min-width: 768px) {
  /* Styles for mobile */
  .accordion {
    display: none;
  }
}
</style>
