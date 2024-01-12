<template>
  <div
    :class="{
      'div-transition': true,
      'div-loaded': !article,
    }"
  >
    <div
      class="absolute min-h-[50vh] top-2 md:top-10 lg:top-20 bottom-2 md:bottom-10 lg:bottom-20 overflow-auto left-2 right-2 mx-auto border w-1/1 md:w-2/3 lg:w-1/2 shadow-lg rounded-md bg-white"
    >
      <!-- Close button -->
      <CloseButton @close="closeModal" />

      <div class="container mx-auto mb-12 mt-0 pt-0 pb-5 px-5" v-if="article">
        <div class="flex flex-col md:flex-row">
          <!-- Left section for images -->
          <ImageCarousel :article="article" />
          <!-- Right section for product details  product details template content-->
          <ProductDetails
            :article="article"
            :selectColor="selectColor"
            :sizeClass="sizeClass"
            :selectSize="selectSize"
          />
        </div>
      </div>
      <TabsComponent class="tabs" :tabs="article?.tabs?.tabs" />
      <AccordionComponent class="accordion" :tabs="article?.tabs?.tabs" />
      <StickyFooter
        :articleName="article?.name || ''"
        @add-to-cart="handleAddToCart"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, onMounted, ref, computed } from "vue";
import { useProductData } from "@/composables/useProductData";
import CloseButton from "./Sections/CloseButton.vue";
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
    const {
      article,
      selectSize,
      sizeClass,
      fetchData,
      selectedSizeIndex,
      selectColor,
    } = useProductData(props.productId);

    onMounted(() => {
      fetchData(props.productId);
    });

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
