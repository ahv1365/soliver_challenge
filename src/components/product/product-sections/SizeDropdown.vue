<template>
  <div class="product-size-dropdown" data-e2e="product-size-dropdown-test">
    <!-- Clickable input/button to show sizes -->
    <button
      class="product-size-dropdown__button"
      @click="toggleSizeList"
      data-e2e="dropdown-button-test"
    >
      {{ selectedSize || "Select Size" }}
    </button>
    <!-- List of sizes -->
    <ul v-show="showSizes" data-e2e="size-list-test">
      <li
        v-for="size in sizes"
        :key="size"
        :class="[
          'product-size-dropdown__list-item',
          {
            'product-size-dropdown__list-item--selected': size === selectedSize,
          },
          {
            'product-size-dropdown__list-item--disabled':
              !availableSizes.includes(size),
          },
        ]"
        @click="selectSize(size)"
        :data-e2e="'size-option-' + size + '-test'"
      >
        {{ size }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";

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
  setup(props, { emit }) {
    const showSizes = ref(false);
    const selectedSize = ref("");
    const toggleSizeList = () => {
      showSizes.value = !showSizes.value;
    };
    const selectSize = (size: string) => {
      if (props.availableSizes.includes(size)) {
        showSizes.value = false;
        selectedSize.value = size;
        emit("size-selected", size);
      }
    };
    return { showSizes, toggleSizeList, selectSize, selectedSize };
  },
});
</script>

<style lang="scss" scoped>
.product-size-dropdown {
  @apply relative text-left;

  &__button {
    @apply w-full text-text-secondary font-bold text-left pl-3 bg-gray-100 rounded-md p-2 mt-3;
  }

  &__list-item {
    @apply px-3 py-2 text-text-secondary cursor-pointer;

    &:hover {
      @apply bg-bg-secondary;
    }

    &--selected {
      @apply font-bold text-text-secondary;
    }

    &--disabled {
      @apply text-text-secondary-lighter;
    }
  }

  ul {
    @apply absolute z-10 bg-white w-full rounded-md mt-1 shadow-lg m-0 p-0;
    box-sizing: border-box;
    list-style-type: none;
  }
}
</style>
