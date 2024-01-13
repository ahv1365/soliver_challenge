<template>
  <div class="flex-1 mt-8 md:mt-0 md:ml-8">
    <p class="text-sm font-extrabold mb-2 w-full text-left">Brand New</p>
    <p class="text-base mb-3 w-full text-left">
      {{ article?.name }}
    </p>
    <div class="flex mb-2 w-full m-auto">
      <p class="my-auto text-sm font-extrabold w-full text-left">
        {{ article?.price }} {{ article?.currency?.label }}
      </p>
      <img
        class="w-20 items-center"
        alt="soliver logo"
        :src="`./assets/images/SOliver-Logo.svg`"
      />
    </div>
    <div class="my-5 py-2 border-y-2">
      <p class="font-medium text-sm normal-case w-full text-left">
        Color:
        <span class="font-sm w-full text-left font-extrabold">
          {{ article?.color }}</span
        >
      </p>
      <div class="flex items-center space-x-2 mt-2 w-full text-left">
        <!-- Color circles -->
        <input
          type="image"
          v-for="variant in article.variants"
          :key="variant.colorLabel"
          :src="`/assets/images/${variant.image}`"
          loading="lazy"
          :class="{
            border: article?.color === variant.colorLabel,
          }"
          class="border-black w-11 h-11 rounded-full cursor-pointer"
          @click="selectColor(String(variant.id))"
        />
      </div>
    </div>
    <div class="mb-6">
      <p class="font-sm w-full text-left">
        Size:
        <span class="font-sm w-full text-left font-extrabold">
          {{ article?.size }}</span
        >
      </p>
      <div class="flex space-x-2 mt-2 w-full text-left">
        <!-- Size buttons -->
        <button
          v-for="(size, index) in article?.sizes"
          :key="size"
          :class="sizeClass(size, article?.size)"
          @click="selectSize(index, size)"
          class="w-11 my-auto bg-gray-100 rounded-2xl"
          :disabled="!article?.availableSizes.includes(size)"
        >
          {{ size }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Article } from "@/types/interfaces";

export default defineComponent({
  name: "ProductDetails",
  props: {
    article: {
      type: Object as PropType<Article>,
      required: true,
    },
    selectColor: {
      type: Function as PropType<(colorId: string) => void>,
      required: true,
    },
    sizeClass: {
      type: Function as PropType<(size: string, selectedSize: string) => void>,
      required: true,
    },
    selectSize: {
      type: Function as PropType<(index: number, size: string) => void>,
      required: true,
    },
  },
});
</script>

<style scoped>
/* Add styles specific to product details */
</style>
