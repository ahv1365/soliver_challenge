<template>
  <div class="font-sans text-text-secondary text-left">
    <div
      v-for="detail in tabContent"
      :key="detail.label"
      class="flex items-center space-x-2 border-b p-4"
    >
      <div class="flex-grow">
        <div v-if="detail.label" class="flex font-bold">
          <div v-if="detail.icon" class="p-1">
            <img
              :alt="detail.icon"
              :src="`./assets/icons/${detail.icon}.svg`"
              class="my-auto p-0 w-8 h-8 border-2 border-white invert rounded-full"
            />
          </div>
          <div class="my-auto pl-1">
            {{ detail.label.toUpperCase() }}
          </div>
        </div>
        <div>{{ detail.content }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Sustainability } from "@/types/tab";
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
