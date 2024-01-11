<template>
  <div class="font-sans text-sm p-4 text-left">
    <h3 class="font-semibold mb-2">Product Details</h3>
    <div class="mb-4">
      <div>{{ tabContent?.texture.content }}</div>
      <div>{{ tabContent?.collar.content }}</div>
      <div>{{ tabContent?.sleeve.content }}</div>
      <div>{{ tabContent?.pockets.content }}</div>
      <div>
        {{ tabContent.itemNumber.content }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ProductDetailInfo } from "@/types/interfaces";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "ProductDetailsTab",
  props: {
    tabContent: {
      type: Object as PropType<ProductDetailInfo>,
    },
  },
});
</script>
