<template>
  <div class="product-size-dropdown" data-e2e="product-size-dropdown-test">
    <!-- Clickable input/button to show sizes -->
    <button
      class="product-size-dropdown__button"
      @click="toggleSizeList"
      data-e2e="dropdown-button-test"
    >
      <div class="product-size-dropdown__button-label">
        {{ selected || "Select Size" }}
      </div>
      <img
        :alt="'arrow'"
        :src="getIconPath('arrow')"
        class="product-size-dropdown__button-icon"
        :class="{
          'product-size-dropdown__button-icon--rotated': showSizes,
        }"
        :data-e2e="`product-size-dropdown-button-icon-test`"
        loading="lazy"
      />
    </button>
    <!-- List of sizes -->
    <ul v-show="showSizes" data-e2e="size-list-test">
      <li
        v-for="size in sizes"
        :key="size"
        :class="[
          'product-size-dropdown__list-item',
          {
            'product-size-dropdown__list-item--selected': size === selected,
          },
          {
            'product-size-dropdown__list-item--disabled':
              !availableSizes.includes(size),
          },
        ]"
        @click="selectSizeVoid(size)"
        :data-e2e="'size-option-' + size + '-test'"
      >
        {{ size }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { getIconPath } from "@/helpers/iconPathUtil";

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
    selectSize: {
      type: Function as PropType<(size: string) => void>,
      required: true,
    },
  },
  setup(props) {
    const showSizes = ref(false);
    const toggleSizeList = () => {
      showSizes.value = !showSizes.value;
    };
    const selectSizeVoid = (size: string) => {
      if (props.availableSizes.includes(size)) {
        showSizes.value = false;
        props.selectSize(size);
      }
    };
    return {
      getIconPath,
      showSizes,
      toggleSizeList,
      selectSizeVoid,
    };
  },
});
</script>

<style lang="scss" scoped>
.product-size-dropdown {
  @apply relative text-left;

  &__button {
    @apply w-full flex justify-between text-text-secondary font-bold text-left bg-gray-100 rounded-md py-2 px-3 my-auto;

    &-label {
      @apply my-auto;
    }
    &-icon {
      @apply mr-2 w-6 h-6 transition-all;
      transition: transform 0.3s ease;

      &--rotated {
        transform: rotate(180deg);
      }
    }
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
