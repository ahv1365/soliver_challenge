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
      <div class="flex justify-end items-center">
        <button @click="closeModal" class="text-black close-modal">
          &times;
        </button>
      </div>

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
              <div v-if="!imageLoaded" class="loader"></div>

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
          <!-- Right section for product details -->
          <div class="flex-1 mt-8 md:mt-0 md:ml-8">
            <p class="text-sm font-extrabold mb-2 w-full text-left">
              Brand New
            </p>
            <p class="text-base mb-3 w-full text-left">
              {{ article?.name }}
            </p>
            <div class="flex mb-2 w-full m-auto">
              <p class="my-auto text-sm font-extrabold w-full text-left">
                {{ article?.price }} {{ article?.currency.label }}
              </p>
              <img
                class="w-20 items-center"
                alt="soliver logo"
                :src="`./assets/images/SOliver-Logo.svg`"
              />
            </div>
            <div class="my-5 py-2 border-y-2">
              <p class="font-medium text-sm normal-case w-full text-left">
                Color:
                <span class="font-sm w-full text-left font-extrabold">
                  {{ article?.color }}</span
                >
              </p>
              <div class="flex items-center space-x-2 mt-2 w-full text-left">
                <!-- Color circles -->
                <input
                  type="image"
                  v-for="variant in article.variants"
                  :key="variant.colorLabel"
                  :src="`/assets/images/${variant.image}`"
                  loading="lazy"
                  :class="{
                    border: article?.color === variant.colorLabel,
                  }"
                  class="border-black w-11 h-11 rounded-full cursor-pointer"
                  @click="selectColor(String(variant.id))"
                />
              </div>
            </div>
            <div class="mb-6">
              <p class="font-sm w-full text-left">
                Size:
                <span class="font-sm w-full text-left font-extrabold">
                  {{ article?.size }}</span
                >
              </p>
              <div class="flex space-x-2 mt-2 w-full text-left">
                <!-- Size buttons -->
                <button
                  v-for="(size, index) in article?.sizes"
                  :key="size"
                  :class="sizeClass(size, article?.size)"
                  @click="selectSize(index, size)"
                  class="w-11 my-auto bg-gray-100 rounded-2xl cursor-pointer"
                >
                  {{ size }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="tabs bg-gray-100 min-h-[50%]">
        <ul class="tab-list px-3 py-5">
          <li
            v-for="(tab, index) in article?.tabs.tabs"
            :key="index"
            class="text-xs font-bold"
            :class="{ active: activeTab === tab.tab }"
            @click="setActiveTab(tab.tab, tab.content)"
          >
            {{ tab.label.toUpperCase() }}
          </li>
        </ul>
        <div class="tab-content h-min">
          <!-- Tab Content -->
          <component
            :key="activeTab"
            :is="activeTab"
            :tabContent="activeTabContent"
          />
        </div>
      </div>

      <div class="accordion text-left px-2">
        <div
          class="accordion-item"
          v-for="(tab, index) in article?.tabs.tabs"
          :key="index"
        >
          <button
            type="button"
            class="accordion-button text-sm font-bold m-auto"
            @click="setActiveAcc(tab.tab, tab?.content)"
          >
            {{ tab.label.toUpperCase() }}
          </button>
          <div v-if="activeTab === tab.tab" class="accordion-content">
            <!-- Include the tab content component here -->
            <component
              :key="activeTab"
              :is="activeTab"
              :tabContent="activeTabContent"
            />
          </div>
        </div>
      </div>

      <div
        class="sticky bottom-0 right-0 mb-30 bg-white flex justify-between w-full p-2 shadow-inner top-shadow"
      >
        <p
          class="font-medium px-5 py-3 overflow-hidden whitespace-nowrap text-ellipsis"
        >
          {{ article?.name }}
        </p>
        <button
          class="text-xs w-auto h-full my-auto px-4 py-1 bg-black text-white font-medium hover:bg-gray-800"
        >
          <div class="flex font-extrabold space-x-10 whitespace-nowrap">
            <div>Add to Cart</div>
            <font-awesome-icon class="m-auto" icon="shopping-cart" />
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, onMounted, ref, computed } from "vue";
import { useProductData } from "@/composables/useProductData";
import FitTab from "./ProductDetail/FitTab.vue";
import MaterialCareTab from "./ProductDetail/MaterialCareTab.vue";
import ProductDetailsTab from "./ProductDetail/ProductDetailsTab.vue";
import SustainabilityTab from "./ProductDetail/SustainabilityTab.vue";
import {
  MaterialAndCare,
  FitDetails,
  ProductDetailInfo,
  Sustainability,
} from "@/types/interfaces";

export default defineComponent({
  name: "ProductView",
  props: {
    productId: {
      type: String as PropType<string>,
      required: true,
    },
  },
  components: {
    SustainabilityTab,
    MaterialCareTab,
    FitTab,
    ProductDetailsTab,
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
    const activeTab = ref("");
    const activeTabContent = ref({});
    const currentSlide = ref(0);
    const startX = ref(0);
    const deltaX = ref(0);
    const isSwiping = ref(false);
    const isFullScreen = ref(false);
    const imageLoaded = ref(false);
    const swipeThreshold = 5; // Pixels

    const setActiveTab = (
      tab: string,
      content: MaterialAndCare | FitDetails | ProductDetailInfo | Sustainability
    ) => {
      activeTab.value = tab;
      activeTabContent.value = content;
    };
    const setActiveAcc = (
      tab: string,
      content: MaterialAndCare | FitDetails | ProductDetailInfo | Sustainability
    ) => {
      if (activeTab.value === tab) {
        activeTab.value = "";
        activeTabContent.value = {};
      } else {
        activeTab.value = tab;
        activeTabContent.value = content;
      }
    };

    const toggleFullScreen = (event: MouseEvent | TouchEvent) => {
      if (event instanceof MouseEvent) {
        event.preventDefault();
      }
      if (!isSwiping.value) {
        isFullScreen.value = !isFullScreen.value;
      }
    };

    onMounted(() => {
      fetchData(props.productId).then(() => {
        if (article?.value)
          setActiveTab(
            article?.value?.tabs.tabs[0].tab,
            article?.value?.tabs.tabs[0].content
          );
        if (isMobile.value) activeTab.value = "";
      });
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
      setActiveTab,
      setActiveAcc,
      activeTab,
      activeTabContent,
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
.loader {
  position: absolute; /* Position relative to the modal */
  top: 50%; /* Center vertically */
  left: 50%; /* Center horizontally */
  transform: translate(-50%, -50%); /* Adjust centering */
  border: 4px solid rgba(255, 255, 255, 0.3); /* Light gray border */
  border-radius: 50%; /* Circular shape */
  border-top: 4px solid #555; /* Dark gray top border */
  width: 40px; /* Width of the loader */
  height: 40px; /* Height of the loader */
  animation: spin 2s linear infinite; /* Spinning animation */
  z-index: 10; /* Ensure it's above other content */
}

@keyframes spin {
  0% {
    transform: translate(-50%, -50%) rotate(0deg); /* Rotate from 0 degrees */
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg); /* Rotate to 360 degrees */
  }
}
.image-transition {
  opacity: 1; /* Low initial opacity */
  transition: opacity 0.5s ease-in-out; /* Smooth transition for opacity */
}

.image-loaded {
  opacity: 0; /* Full opacity once loaded */
}

.close-modal {
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1;
  color: #000;
  opacity: 0.3;
  cursor: pointer;
  padding: 1rem;
}
.tab-list {
  list-style-type: none;
  display: flex;
}
.tab-list li {
  cursor: pointer;
  padding: 10px;
}
.tab-list li.active {
  border-bottom: 3px solid #343434;
}
.tab-content {
  padding: 10px;
}

/* Accordion styles */ /* Accordion button styles */
.accordion-button {
  border: none;
  border-bottom: 1px solid #ccc; /* Light grey border for bottom */
  cursor: pointer;
  margin: 18px;
  width: calc(100% - 36px); /* Adjusted for padding */
  text-align: left;
  background-color: #fff; /* White background */
  outline: none;
  transition: background-color 0.3s ease;
}

/* Active accordion button styles */
.accordion-button.active {
  background-color: #f1f1f1; /* Light grey background for active tab */
  border-bottom: 1px solid #000; /* Black border for bottom when active */
}

/* Accordion content styles */
.accordion-content {
  transition: max-height 0.5s ease-out;
  overflow: hidden;
  background-color: white;
}

/* Media query for mobile devices */
@media (max-width: 768px) {
  /* Styles for mobile */
  .tabs {
    display: none;
  }
}

/* Media query for desktop. Hide accordion and show tabs instead */
@media (min-width: 769px) {
  .accordion {
    display: none;
  }
  /* Other styles for desktop view */
}
</style>
