<template>
  <section class="product-detail flex-1 mt-8 md:mt-0 md:ml-8">
    <p
      class="text-text-secondary font-extrabold mb-2 w-fit px-1 text-left bg-bg-secondary"
    >
      New
    </p>
    <p class="text-text font-extrabold mb-3 w-full text-left">
      {{ article?.name }}
    </p>
    <div class="flex mb-2 w-full m-auto">
      <p class="my-auto text-text-secondary font-extrabold w-full text-left">
        {{ article?.price }} {{ article?.currency?.label }}
      </p>
      <img
        class="w-20 items-center"
        alt="soliver logo"
        :src="`./assets/images/SOliver-Logo.svg`"
      />
    </div>
    <div class="my-5 py-2 border-y-2">
      <p class="text-text-secondary normal-case w-full text-left">
        Color:
        <span class="text-text-secondary w-full text-left font-extrabold">
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
    <div class="mb-6 hidden md:block">
      <p class="text-text-secondary w-full text-left">
        Size:
        <span
          class="text-text-button-secondary w-full text-left font-extrabold"
        >
          {{ article?.size }}</span
        >
      </p>
      <div class="flex space-x-2 mt-2 w-full text-left">
        <!-- Size buttons -->
        <button
          v-for="size in article?.sizes"
          :key="size"
          :class="sizeClass(size)"
          @click="selectSize(size)"
          class="w-11 my-auto bg-gray-100 rounded-2xl"
          :disabled="!article?.availableSizes.includes(size)"
        >
          {{ size }}
        </button>
      </div>
    </div>
    <!-- SizeDropdown for mobile -->
    <SizeDropdown
      class="block md:hidden"
      :sizes="article?.sizes"
      :selected="article?.size"
      :availableSizes="article?.availableSizes"
      @size-selected="(size) => selectSize(size)"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Article } from "@/types/article";
import SizeDropdown from "./SizeDropdown.vue";

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
      type: Function as PropType<(size: string) => void>,
      required: true,
    },
    selectSize: {
      type: Function as PropType<(size: string) => void>,
      required: true,
    },
  },
  components: {
    SizeDropdown,
  },
});
</script>
