<template>
  <div class="tabs bg-gray-100 min-h-[50%]" v-if="tabs">
    <ul class="tab-list px-3 py-5">
      <li
        v-for="(tab, index) in tabs"
        :key="index"
        class="text-xs font-bold"
        :class="{
          active: activeTabContent
            ? activeTab === tab?.tab
            : tabs[0]?.tab === tab?.tab,
        }"
        @click="setActiveTab(tab)"
      >
        {{ tab?.label.toUpperCase() }}
      </li>
    </ul>
    <div class="tab-content h-min">
      <component
        :is="activeTab"
        v-if="activeTabContent"
        :tabContent="activeTabContent"
      />
      <component
        :is="tabs[0]?.tab"
        v-if="!activeTabContent"
        :tabContent="tabs[0]?.content"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import FitTab from "../ProductDetail/FitTab.vue";
import ProductDetailsTab from "../ProductDetail/ProductDetailsTab.vue";
import SustainabilityTab from "../ProductDetail/SustainabilityTab.vue";
import MaterialCareTab from "../ProductDetail/MaterialCareTab.vue";
import {
  FitDetails,
  MaterialAndCare,
  ProductDetailInfo,
  Sustainability,
  TabContent,
} from "@/types/interfaces";

export default defineComponent({
  name: "TabsComponent",
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
    const activeTab = ref<string>("");
    const activeTabContent = ref<
      MaterialAndCare | FitDetails | ProductDetailInfo | Sustainability
    >();

    const setActiveTab = (tab: TabContent) => {
      activeTab.value = tab.tab;
      activeTabContent.value = tab.content;
    };
    return {
      activeTab,
      activeTabContent,
      setActiveTab,
    };
  },
});
</script>

<style scoped>
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
</style>
