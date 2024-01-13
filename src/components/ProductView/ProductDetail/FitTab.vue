<template>
  <div class="font-sans p-4 text-sm text-left">
    <h3 class="font-semibold mb-2">Fit</h3>
    <p>{{ tabContent?.fitType?.content }}</p>
    <p>{{ tabContent?.backLength?.content }}</p>
    <!-- <div class="flex flex-col space-y-4 float-right">
      <img
        :src="`/assets/images/placeholder.jpg`"
        :alt="`Fit image 1`"
        class="object-cover w-32 h-32"
      />

      <img
        :src="`/assets/images/placeholder.jpg`"
        :alt="`Fit image 2`"
        class="object-cover w-32 h-32"
      />
    </div> -->
  </div>
</template>

<script lang="ts">
import { FitDetails } from "@/types/interfaces";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "FitTab",
  props: {
    tabContent: {
      type: Object as PropType<FitDetails>,
      required: true,
    },
  },
});
</script>
