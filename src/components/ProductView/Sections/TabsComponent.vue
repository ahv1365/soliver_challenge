<template>
  <div class="tabs bg-gray-100 min-h-[50%]" v-if="tabs">
    <ul class="tab-list px-3 py-5">
      <li
        v-for="(tab, index) in tabs"
        :key="index"
        class="text-xs font-bold"
        :class="{
          active: activeTabContent
            ? activeTab === tab.tab
            : tabs[0].tab === tab.tab,
        }"
        @click="setActiveTab(tab.tab, tab.content)"
      >
        {{ tab.label.toUpperCase() }}
      </li>
    </ul>
    <div class="tab-content h-min">
      <component
        :is="activeTab"
        v-if="activeTabContent"
        :tabContent="activeTabContent"
      />
      <component
        :is="tabs[0].tab"
        v-if="!activeTabContent"
        :tabContent="tabs[0].content"
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
  MaterialAndCare,
  FitDetails,
  ProductDetailInfo,
  Sustainability,
  TabContent,
} from "@/types/interfaces";

export default defineComponent({
  name: "TabsComponent",
  props: {
    tabs: {
      type: Array as PropType<
        (MaterialAndCare | FitDetails | ProductDetailInfo | Sustainability)[]
      >,
      required: true,
    },
  },
  components: {
    SustainabilityTab,
    MaterialCareTab,
    FitTab,
    ProductDetailsTab,
  },
  setup(props) {
    const activeTab = ref<string>("");
    const activeTabContent = ref<TabContent | null>(null);

    const setActiveTab = (tab: string, content: TabContent) => {
      activeTab.value = tab;
      activeTabContent.value = content;
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
