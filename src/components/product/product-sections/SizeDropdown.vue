<template>
  <div class="product-size-dropdown">
    <!-- Clickable input/button to show sizes -->
    <button class="product-size-dropdown__button" @click="toggleSizeList">
      {{ selectedSize || "Select Size" }}
    </button>
    <!-- List of sizes -->
    <ul v-show="showSizes">
      <li
        v-for="size in sizes"
        :key="size"
        :class="{
          'font-bold': size === selectedSize,
          'text-text-secondary-light': !availableSizes.includes(size),
        }"
        @click="selectSize(size)"
      >
        {{ size }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "SizeDropdown",
  props: {
    sizes: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    selected: {
      type: String,
      default: "",
    },
    availableSizes: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },
  data() {
    return {
      selectedSize: this.selected,
      showSizes: false,
    };
  },
  methods: {
    toggleSizeList() {
      this.showSizes = !this.showSizes;
    },
    selectSize(size: string) {
      if (this.availableSizes.includes(size)) {
        this.selectedSize = size;
        this.showSizes = false;
        this.$emit("size-selected", this.selectedSize);
      }
    },
  },
});
</script>

<style scoped>
.product-size-dropdown {
  @apply relative text-left;
}
.product-size-dropdown__button {
  @apply w-full text-text-secondary font-bold text-left pl-3 bg-gray-100 rounded-md p-2 mt-3;
}
.product-size-dropdown ul {
  @apply absolute z-10 bg-white w-full rounded-md mt-1 shadow-lg;
  position: absolute;
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.product-size-dropdown li {
  @apply px-3 py-2 text-text-secondary cursor-pointer;
  box-sizing: border-box;
}

.product-size-dropdown li:hover {
  background-color: #f3f3f3;
}
</style>
