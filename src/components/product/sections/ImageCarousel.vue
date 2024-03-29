<template>
  <section
    class="product-gallery"
    :class="{ 'product-gallery--full-screen': isFullScreen }"
    @mousedown="startSwipe"
    @mousemove="onSwipe"
    @mouseup="endSwipe"
    @mouseleave="endSwipe"
    @touchstart.passive="startSwipe"
    @touchmove.passive="onSwipe"
    @touchend.passive="endSwipe"
  >
    <div class="product-gallery__carousel-inner" :style="carouselStyle">
      <!-- Loader displayed when isLoading is true -->
      <LazyImage
        v-for="(image, index) in product?.images"
        :key="`image-${image}`"
        :src="image"
        :alt="image"
        aspectRatio="142%"
        class="product-gallery__carousel-item"
        :height="isFullScreen ? `100vh` : `auto`"
        :width="`100vw`"
        :loading="`lazy`"
        :containerClass="{
          'product-gallery__carousel-item--full-screen': isFullScreen,
          'cursor-zoom-in': !isFullScreen,
          'cursor-zoom-out': isFullScreen,
          'product-gallery__carousel-item--active': currentSlide === index,
        }"
        data-e2e="product-page-card-lazy-image-test"
        @click="toggleFullScreen"
      />
    </div>
    <div class="product-gallery__indicators">
      <div
        v-for="(image, index) in product?.images"
        :key="index"
        :class="{
          'product-gallery__indicator': true,
          'product-gallery__indicator--active': currentSlide === index,
        }"
        @click="goToSlide(index)"
      ></div>
    </div>
  </section>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  computed,
  defineAsyncComponent,
} from "vue";
import { Product } from "@/types/product";

export default defineComponent({
  name: "ImageCarousel",
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
  },
  components: {
    LazyImage: defineAsyncComponent(
      () => import("@/components/shared/LazyImage.vue")
    ),
  },
  setup(props, { emit }) {
    const currentSlide = ref(0);
    const startX = ref(0);
    const deltaX = ref(0);
    const isSwiping = ref(false);
    const isFullScreen = ref(false);
    const swipeThreshold = 5; // Pixels

    const toggleFullScreen = (event: MouseEvent | TouchEvent) => {
      if (event instanceof MouseEvent) {
        event.preventDefault();
      }
      if (!isSwiping.value) {
        isFullScreen.value = !isFullScreen.value;
      }
    };

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

      const numberOfImages = props.product.images.length;
      if (deltaX.value > 5) {
        // Swipe left to right
        if (currentSlide.value >= numberOfImages - 1) {
          currentSlide.value = 0; // Go to the first image
        } else {
          currentSlide.value++;
        }
      } else if (deltaX.value < -5) {
        // Swipe right to left
        if (currentSlide.value <= 0) {
          currentSlide.value = numberOfImages - 1; // Go to the last image
        } else {
          currentSlide.value--;
        }
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
      currentSlide,
      carouselStyle,
      startSwipe,
      onSwipe,
      endSwipe,
      goToSlide,
      closeModal,
      isFullScreen,
      toggleFullScreen,
    };
  },
});
</script>

<style lang="scss" scoped>
.product-gallery {
  @apply flex-1 w-full relative overflow-hidden;

  &--full-screen {
    @apply fixed top-0 left-0;

    transform: translate(0%, 0%) scale(1);
    transform-origin: center center;
    transition: transform 1.5s ease-in-out;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    z-index: 1000;
  }

  &__carousel-inner {
    @apply flex transition-transform duration-500 whitespace-nowrap;
  }

  &__carousel-item {
    @apply flex-none w-full max-w-full;

    flex: 0 0 100%;

    &--full-screen {
      @apply h-screen bg-black;
    }

    &--active {
      display: block;
    }
  }

  &__indicators {
    @apply absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-white py-1 px-2 border rounded-full;
  }

  &__indicator {
    @apply w-2 h-2 rounded-full cursor-pointer bg-gray-400;

    &--active {
      @apply bg-gray-900;
    }
  }
}
</style>
