<template>
  <div class="font-sans text-text-secondary p-4 text-left">
    <p class="font-bold mb-2">Product Details</p>
    <div class="mb-4">
      <div>{{ tabContent?.texture.content }}</div>
      <div>{{ tabContent?.collar.content }}</div>
      <div>{{ tabContent?.sleeve.content }}</div>
      <div>{{ tabContent?.pockets.content }}</div>
      <div class="whitespace-break-spaces flex mt-3">
        <div class="bg-white mr-3 p-2 rounded-full">
          <img
            alt="shopping-cart"
            :src="`./assets/icons/${tabContent?.itemNumber.icon}.svg`"
            class="my-auto w-5 h-5"
          />
        </div>

        {{ tabContent?.itemNumber.content }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ProductDetailInfo } from "@/types/tab";
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
