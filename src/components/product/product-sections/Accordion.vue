<template>
  <section class="product-more-info accordion text-left px-2">
    <div class="accordion-item" v-for="(tab, index) in tabs" :key="index">
      <button
        type="button"
        class="accordion-button text-text-secondary font-bold m-auto"
        @click="setActiveAcc(tab)"
      >
        {{ tab.label.toUpperCase() }}
      </button>
      <div
        v-if="activeTab === tab?.tab && activeTabContent"
        class="accordion-content"
      >
        <!-- Include the tab content component here -->
        <component
          :key="activeTab"
          :is="activeTab"
          v-if="activeTabContent"
          :tabContent="activeTabContent"
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
      activeTab,
      activeTabContent,
      setActiveAcc,
    };
  },
});
</script>

<style scoped>
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
</style>
