<template>
  <div class="accordion text-left px-2">
    <div class="accordion-item" v-for="(tab, index) in tabs" :key="index">
      <button
        type="button"
        class="accordion-button text-sm font-bold m-auto"
        @click="setActiveAcc(tab.tab, tab?.content)"
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
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { TabContent } from "@/types/interfaces";
import FitTab from "../ProductDetail/FitTab.vue";
import ProductDetailsTab from "../ProductDetail/ProductDetailsTab.vue";
import SustainabilityTab from "../ProductDetail/SustainabilityTab.vue";
import MaterialCareTab from "../ProductDetail/MaterialCareTab.vue";

export default defineComponent({
  name: "AccordionComponent",
  props: {
    tabs: {
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
    const activeTabContent = ref<TabContent | null>(null);

    const setActiveAcc = (tab: string, content: TabContent) => {
      if (activeTab.value === tab) {
        activeTab.value = "";
        activeTabContent.value = null;
      } else {
        activeTab.value = tab;
        activeTabContent.value = content;
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
