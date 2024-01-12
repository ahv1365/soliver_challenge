<template>
  <div class="font-sans text-sm text-left">
    <div
      v-for="detail in tabContent"
      :key="detail.label"
      class="flex items-center space-x-2 border-b p-4"
    >
      <div class="flex-grow">
        <strong v-if="detail.label" class="font-semibold pr-1">
          <span v-if="detail.icon" class="flex-shrink-0">
            <font-awesome-icon
              class="m-auto p-1 w-5 h-5 border border-black rounded-full"
              :icon="detail.icon"
            />
          </span>
          {{ detail.label.toUpperCase() }}</strong
        >
        <span class="text-gray-600 pt-4">{{ detail.content }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Sustainability } from "@/types/interfaces";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "SustainabilityTab",
  props: {
    tabContent: {
      type: Object as PropType<Sustainability>,
      required: true,
    },
  },
});
</script>
