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
          <div
            class="flex-1 w-full md:w-1/3 lg:w-1/3 relative overflow-hidden"
            :class="{ 'full-screen': isFullScreen }"
            @mousedown="startSwipe"
            @mousemove="onSwipe"
            @mouseup="endSwipe"
            @mouseleave="endSwipe"
            @touchstart="startSwipe"
            @touchmove="onSwipe"
            @touchend="endSwipe"
          >
            <div class="carousel-inner" :style="carouselStyle">
              <!-- Loader displayed when isLoading is true -->
              <LoaderComponent :loaded="imageLoaded" />

              <input
                type="image"
                v-for="(image, index) in article?.images"
                :key="index"
                :src="`/assets/images/${image}`"
                :class="{
                  'object-contain': isFullScreen,
                  'h-screen': isFullScreen,
                  'cursor-zoom-in': !isFullScreen,
                  'cursor-zoom-out': isFullScreen,
                  'carousel-item': true,
                  active: currentSlide === index,
                  'image-transition': true,
                  'image-loaded': !imageLoaded,
                }"
                placeholder="`/assets/images/placeholder.jpg`"
                @click="toggleFullScreen"
                loading="lazy"
                @load="imageLoaded = true"
                alt="Product image"
              />
            </div>
            <div
              class="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2"
            >
              <div
                v-for="(image, index) in article?.images"
                :key="index"
                :class="{
                  'bg-white': currentSlide === index,
                  'bg-gray-400': currentSlide !== index,
                }"
                class="w-2 h-2 rounded-full cursor-pointer"
                @click="goToSlide(index)"
              ></div>
            </div>
          </div>
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
import LoaderComponent from "./Sections/LoaderComponent.vue";
import CloseButton from "./Sections/CloseButton.vue";
import StickyFooter from "./Sections/StickyFooter.vue";
import ProductDetails from "./Sections/ProductDetails.vue";
import AccordionComponent from "./Sections/AccordionComponent.vue";
import TabsComponent from "./Sections/TabsComponent.vue";

export default defineComponent({
  name: "ProductView",
  props: {
    productId: {
      type: String as PropType<string>,
      required: true,
    },
  },
  components: {
    LoaderComponent,
    CloseButton,
    StickyFooter,
    ProductDetails,
    AccordionComponent,
    TabsComponent,
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
      isMobile,
    } = useProductData(props.productId);
    const currentSlide = ref(0);
    const startX = ref(0);
    const deltaX = ref(0);
    const isSwiping = ref(false);
    const isFullScreen = ref(false);
    const imageLoaded = ref(false);
    const swipeThreshold = 5; // Pixels

    const toggleFullScreen = (event: MouseEvent | TouchEvent) => {
      if (event instanceof MouseEvent) {
        event.preventDefault();
      }
      if (!isSwiping.value) {
        isFullScreen.value = !isFullScreen.value;
      }
    };

    onMounted(() => {
      fetchData(props.productId);
    });

    const carouselStyle = computed(() => ({
      transform: `translateX(${-100 * currentSlide.value}%)`,
      transition: "transform 0.7s ease",
    }));

    const startSwipe = (event: MouseEvent | TouchEvent) => {
      if (event instanceof MouseEvent) {
        event.preventDefault();
      }
      isSwiping.value = true;
      startX.value =
        "touches" in event ? event.touches[0].clientX : event.clientX;
      deltaX.value = 0;
    };

    const onSwipe = (event: MouseEvent | TouchEvent) => {
      if (event instanceof MouseEvent) {
        event.preventDefault();
      }
      if (!isSwiping.value) return;
      if (startX.value === 0) return;
      const currentX =
        "touches" in event ? event.touches[0].clientX : event.clientX;
      deltaX.value = startX.value - currentX;
      if (Math.abs(deltaX.value) > swipeThreshold) {
        isSwiping.value = true;
      }
    };

    const endSwipe = (): void => {
      if (!isSwiping.value) return;
      if (Math.abs(deltaX.value) <= swipeThreshold) {
        isSwiping.value = false;
      }
      if (
        deltaX.value > 5 &&
        currentSlide.value < (article.value?.images.length || 0) - 1
      ) {
        currentSlide.value++;
      } else if (deltaX.value < -5 && currentSlide.value > 0) {
        currentSlide.value--;
      }
      startX.value = 0;
      deltaX.value = 0;
    };

    const goToSlide = (index: number) => {
      currentSlide.value = index;
    };

    const closeModal = () => {
      emit("close");
    };

    return {
      article,
      selectSize,
      selectColor,
      sizeClass,
      selectedSizeIndex,
      currentSlide,
      carouselStyle,
      startSwipe,
      onSwipe,
      endSwipe,
      goToSlide,
      closeModal,
      isFullScreen,
      toggleFullScreen,
      imageLoaded,
      isMobile,
    };
  },
});
</script>

<style scoped>
.carousel {
  position: relative;
  max-width: 100%;
  overflow: hidden;
}

.carousel-inner {
  display: flex;
  transition: transform 0.5s ease;
  white-space: nowrap;
}

.carousel-item {
  flex: 0 0 100%;
  max-width: 100%;
  display: inline-block; /* or inline-flex */
}

.carousel-item.active {
  display: block;
}

.carousel-control-prev,
.carousel-control-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 24px;
  color: #333;
  text-decoration: none;
  cursor: pointer;
}

.carousel-control-prev {
  left: 100px;
}

.carousel-control-next {
  right: 100px;
}

.full-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: calc(100vw);
  height: calc(100vh);
  z-index: 1000; /* Ensure it's above other content */
  transform: translate(0%, 0%) scale(1);
  transform-origin: center center;
  transition: transform 1.5s ease-in-out;
  background-color: rgb(0, 0, 0); /* or any desired background color */
  padding: 10px;
  box-sizing: border-box;
  overflow: auto;
}
.image-transition {
  opacity: 1; /* Low initial opacity */
  transition: opacity 0.5s ease-in-out; /* Smooth transition for opacity */
}

.image-loaded {
  opacity: 0; /* Full opacity once loaded */
}

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
