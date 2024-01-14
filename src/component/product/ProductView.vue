<template>
  <div
    class="transition-opacity duration-500"
    :class="{ 'opacity-0': !article }"
  >
    <div
      v-if="article"
      class="absolute inset-2 md:inset-5 lg:inset-10 xl:inset-15 lx-h:h-fit m-auto border w-1/1 md:w-5/6 lg:w-2/3 xl:w-1/2 shadow-lg rounded-md bg-bg overflow-auto"
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
import { useProductData } from "@/composable/useProductData";
import CloseButton from "@/component/ui/CloseButton.vue";
import StickyFooter from "./section/StickyFooter.vue";
import ProductDetails from "./section/ProductDetails.vue";
import AccordionComponent from "./section/Accordion.vue";
import TabsComponent from "./section/Tab.vue";
import ImageCarousel from "./section/ImageCarousel.vue";

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
