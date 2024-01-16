<template>
  <div class="font-sans p-4 text-left text-text-secondary">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div
        v-for="(item, index) in tabContent"
        :key="`item-${index}`"
        class="mb-2"
      >
        <p class="font-bold">{{ item.label }}</p>
        <p class="flex items-center">
          <img
            :alt="item.icon"
            :src="`./assets/icons/${item.icon}.svg`"
            v-if="item.icon"
            class="mr-2 w-6 h-6"
          />
          {{ item.content }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { MaterialAndCare } from "@/types/tab";
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
