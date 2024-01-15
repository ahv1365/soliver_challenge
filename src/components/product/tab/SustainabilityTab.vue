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
            <font-awesome-icon
              class="my-auto p-1 w-5 h-5 border border-black rounded-full"
              :icon="detail.icon"
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
