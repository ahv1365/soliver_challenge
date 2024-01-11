<template>
  <div class="font-sans text-gray-800 p-4 text-left text-sm">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div
        v-for="(item, index) in tabContent"
        :key="`item-${index}`"
        class="mb-2"
      >
        <h4 class="text-md font-semibold">{{ item.label }}</h4>
        <p class="text-sm flex items-center">
          <font-awesome-icon :icon="item.icon" v-if="item.icon" class="mr-2" />
          {{ item.content }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { MaterialAndCare } from "@/types/interfaces";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "MaterialCareTab",
  props: {
    tabContent: {
      type: Object as PropType<MaterialAndCare>,
      required: true,
    },
  },
});
</script>
