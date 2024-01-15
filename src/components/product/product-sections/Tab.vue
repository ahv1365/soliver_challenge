<template>
  <section
    class="product-more-info px-2 bg-bg-secondary min-h-[50%]"
    v-if="tabs"
  >
    <ul class="tab-list py-5">
      <li
        v-for="(tab, index) in tabs"
        :key="index"
        class="text-text-secondary font-bold"
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
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import FitTab from "@/components/product/tab/FitTab.vue";
import ProductDetailsTab from "@/components/product/tab/ProductDetailsTab.vue";
import SustainabilityTab from "@/components/product/tab/SustainabilityTab.vue";
import MaterialCareTab from "@/components/product/tab/MaterialCareTab.vue";
import {
  FitDetails,
  MaterialAndCare,
  ProductDetailInfo,
  Sustainability,
  TabContent,
} from "@/types/tab";

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
