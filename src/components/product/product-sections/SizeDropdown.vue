<template>
  <div class="size-dropdown relative text-left">
    <!-- Clickable input/button to show sizes -->
    <button
      class="w-full text-text-secondary font-bold text-left pl-3 bg-gray-100 rounded-md p-2 mt-3"
      @click="toggleSizeList"
    >
      {{ selected || "Select Size" }}
    </button>
    <!-- List of sizes -->
    <ul
      v-show="showSizes"
      class="absolute z-10 bg-white w-full rounded-md mt-1 shadow-lg"
    >
      <li
        v-for="size in sizes"
        :key="size"
        class="px-3 py-2 text-text-secondary cursor-pointer"
        :class="{
          'font-bold': size === selected,
          'text-text-secondary-light': !availableSizes.includes(size),
        }"
        @click="selectSize(size, availableSizes)"
      >
        {{ size }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SizeDropdown",
  props: {
    sizes: Array,
    selected: String,
    availableSizes: Array,
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
    selectSize(size, availableSizes) {
      if (availableSizes.includes(size)) {
        this.selectedSize = size;
        this.showSizes = false;
        this.$emit("size-selected", this.selectedSize);
      }
    },
    onSizeChange() {
      this.$emit("size-selected", this.selectedSize);
    },
  },
};
</script>

<style scoped>
.size-dropdown ul {
  position: absolute;
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.size-dropdown li {
  box-sizing: border-box;
}

.size-dropdown li:hover {
  background-color: #f3f3f3;
}
</style>
