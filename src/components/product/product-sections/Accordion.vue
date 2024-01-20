<template>
  <section class="product-info" data-e2e="product-info-section-test">
    <div
      class="product-info__accordion-item"
      v-for="(tab, index) in tabs"
      :key="index"
      :data-e2e="`accordion-item-${index}-test`"
    >
      <button
        type="button"
        class="product-info__accordion-button"
        @click="setActiveAcc(tab)"
        :data-e2e="`accordion-button-${index}-test`"
      >
        {{ tab.label.toUpperCase() }}
        <img
          :alt="'arrow'"
          :src="getIconPath('arrow')"
          class="product-info__icon"
          :class="{ 'product-info__icon--rotated': activeTab === tab?.tab }"
          :data-e2e="`accordion-icon-${index}-test`"
        />
      </button>
      <div
        v-if="activeTab === tab?.tab && activeTabContent"
        class="product-info__accordion-content"
        :data-e2e="`accordion-content-${tab?.tab}-test`"
      >
        <component
          :key="activeTab"
          :is="activeTab"
          v-if="activeTabContent"
          :tabContent="activeTabContent"
          :data-e2e="`accordion-tab-component-${tab?.tab}-test`"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import {
  FitDetails,
  MaterialAndCare,
  ProductDetailInfo,
  Sustainability,
  TabContent,
} from "@/types/tab";
import FitTab from "@/components/product/tab/FitTab.vue";
import ProductDetailsTab from "@/components/product/tab/ProductDetailsTab.vue";
import SustainabilityTab from "@/components/product/tab/SustainabilityTab.vue";
import MaterialCareTab from "@/components/product/tab/MaterialCareTab.vue";
import { getIconPath } from "@/helpers/iconPathUtil";

export default defineComponent({
  name: "AccordionComponent",
  props: {
    tabs: {
      type: Array as PropType<TabContent[]>,
      required: true,
    },
  },
  components: {
    SustainabilityTab,
    MaterialCareTab,
    FitTab,
    ProductDetailsTab,
  },

  setup() {
    const activeTab = ref("");
    const activeTabContent = ref<
      MaterialAndCare | FitDetails | ProductDetailInfo | Sustainability
    >();

    const setActiveAcc = (tab: TabContent) => {
      if (activeTab.value === tab.tab) {
        activeTab.value = "";
      } else {
        activeTab.value = tab.tab;
        activeTabContent.value = tab.content;
      }
    };

    return {
      getIconPath,
      activeTab,
      activeTabContent,
      setActiveAcc,
    };
  },
});
</script>
<style lang="scss" scoped>
.product-info {
  @apply text-left px-2;

  &__accordion-button {
    @apply flex justify-between text-text-secondary font-bold border-0 border-b border-solid border-gray-300 cursor-pointer m-4 w-[calc(100%-36px)] text-left bg-white outline-none transition-colors duration-300 ease-in-out;
    &.active {
      @apply bg-bg-secondary;
      border-bottom: 1px solid #000; // Black border for bottom when active
    }
  }

  &__icon {
    transition: transform 0.3s ease;
    @apply mr-2 w-6 h-6 transition-all;

    &--rotated {
      transform: rotate(180deg);
    }
  }

  &__accordion-content {
    transition: max-height 1s ease-out;
    overflow: hidden;
    background-color: white;
  }
}
</style>
