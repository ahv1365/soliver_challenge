<template>
  <section
    class="product-gallery"
    :class="{ 'full-screen': isFullScreen }"
    @mousedown="startSwipe"
    @mousemove="onSwipe"
    @mouseup="endSwipe"
    @mouseleave="endSwipe"
    @touchstart.passive="startSwipe"
    @touchmove.passive="onSwipe"
    @touchend.passive="endSwipe"
  >
    <div class="carousel-inner" :style="carouselStyle">
      <!-- Loader displayed when isLoading is true -->
      <LazyImage
        v-for="(image, index) in article?.images"
        :key="`image-${image}`"
        :src="`/assets/images/${image}`"
        alt="Product"
        class="product-page--card__lazy-image"
        :minHeight="`450px`"
        :minWidth="`100px`"
        :height="isFullScreen ? `100vh` : `auto`"
        :width="`100vw`"
        :containerClass="{
          'h-screen': isFullScreen,
          'cursor-zoom-in': !isFullScreen,
          'cursor-zoom-out': isFullScreen,
          'carousel-item': true,
          active: currentSlide === index,
          'bg-black': isFullScreen,
        }"
        data-e2e="product-page-card-lazy-image-test"
        @click="toggleFullScreen"
        @load="imageLoaded = true"
      />
    </div>
    <div
      class="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-white py-1 px-2 border rounded-full"
    >
      <div
        v-for="(image, index) in article?.images"
        :key="index"
        :class="{
          'bg-gray-400': currentSlide !== index,
          'bg-gray-900': currentSlide === index,
        }"
        class="w-2 h-2 rounded-full cursor-pointer"
        @click="goToSlide(index)"
      ></div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed } from "vue";
import { Article } from "@/types/article";
import LazyImage from "@/components/shared/LazyImage.vue";

export default defineComponent({
  name: "ImageCarousel",
  props: {
    article: {
      type: Object as PropType<Article>,
      required: true,
    },
  },
  components: {
    LazyImage,
  },
  setup(props, { emit }) {
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

    const carouselStyle = computed(() => ({
      transform: `translateX(${-100 * currentSlide.value}%)`,
      transition: "transform 0.7s ease",
    }));

    const startSwipe = (event: MouseEvent | TouchEvent) => {
      console.log(currentSlide.value);
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
      if (deltaX.value > 5 && currentSlide.value < 1) {
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
    };
  },
});
</script>

<style scoped>
.product-gallery {
  @apply flex-1 w-full md:w-1/3 lg:w-1/3 relative overflow-hidden;
}
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
  display: inline-block;
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
  top: 0px;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  transform: translate(0%, 0%) scale(1);
  transform-origin: center center;
  transition: transform 1.5s ease-in-out;
  /* padding: 10px; */
  box-sizing: border-box;
  /* overflow: auto; */
}
</style>
