<template>
  <section class="product-detail" data-e2e="product-detail-test">
    <div class="product-detail__badges" data-e2e="product-detail-badges-test">
      <div
        class="product-detail__badge product-detail__badge--sustainable"
        data-e2e="SUSTAINABLE-badge-test"
      >
        Sustainable
      </div>
      <div
        class="product-detail__badge product-detail__badge--new"
        data-e2e="NEW-badge-test"
      >
        NEW
      </div>
    </div>

    <div class="product-detail__name" data-e2e="product-detail-name-test">
      {{ article?.name }}
    </div>
    <div
      class="product-detail__price-logo"
      data-e2e="product-detail-price-logo-test"
    >
      <div class="product-detail__price" data-e2e="product-detail-price-test">
        {{ article?.price }} {{ article?.currency?.label }}
      </div>
      <img
        class="product-detail__logo"
        alt="soliver logo"
        :src="getImagePath(`SOliver-Logo.svg`)"
        data-e2e="soliver-logo-test"
      />
    </div>
    <div
      class="product-detail__color-selection"
      data-e2e="product-detail-color-selection-test"
    >
      <div
        class="product-detail__color-label"
        data-e2e="product-detail-color-label-test"
      >
        Color:
        <span class="product-detail__color-value">
          {{ article?.color }}
        </span>
      </div>
      <div
        class="product-detail__color-options"
        data-e2e="product-detail-color-options-test"
      >
        <!-- Color circles -->
        <input
          type="image"
          v-for="variant in article.variants"
          :key="variant.colorLabel"
          :src="getImagePath(variant.image)"
          :class="colorOptionClass(variant.colorLabel)"
          @click.prevent="selectColor(String(variant.id))"
        />
      </div>
    </div>
    <div
      class="product-detail__size-selection hidden md:block"
      data-e2e="product-detail-size-selection-test"
    >
      <div
        class="product-detail__size-label"
        data-e2e="product-detail-size-label-test"
      >
        Size:
        <span class="product-detail__size-value">
          {{ article?.size }}
        </span>
      </div>
      <div
        class="product-detail__size-options"
        data-e2e="product-detail-size-options-test"
      >
        <!-- Size buttons -->
        <button
          v-for="size in article?.sizes"
          :key="size"
          :class="sizeClass(size)"
          @click="selectSize(size)"
          class="w-11 my-auto bg-gray-100 rounded-2xl"
          :disabled="!article?.availableSizes.includes(size)"
          data-e2e="product-detail-size-options-button-test"
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
      @size-selected="(size: string) => selectSize(size)"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Article } from "@/types/article";
import SizeDropdown from "./SizeDropdown.vue";
import { getImagePath } from "@/helpers/imagePathUtil";

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
  setup(props) {
    const colorOptionClass = (colorLabel: string) => {
      return props.article?.color === colorLabel
        ? "w-11 h-11 rounded-full p-1 cursor-default border border-black"
        : "w-11 h-11 rounded-full p-1 cursor-pointer border border-border-secondary";
    };

    return {
      colorOptionClass,
      getImagePath,
    };
  },
});
</script>

<style lang="scss" scoped>
.product-detail {
  @apply flex-1 mt-8 md:mt-0 md:ml-8;

  &__badges {
    @apply flex;
  }

  &__badge {
    @apply font-extrabold mb-2 w-fit px-1 text-text-secondary;

    &--sustainable {
      background-color: rgb(2 136 82);
      color: rgb(255 255 255);
    }

    &--new {
      @apply bg-bg-secondary mx-2;
    }
  }

  &__name {
    @apply mb-3 w-full text-left text-text;
  }
  &__price {
    @apply my-auto text-text-secondary font-extrabold w-full text-left;
  }
  &__color-label,
  &__size-label {
    @apply mb-2 w-full text-left text-text-secondary;
  }

  &__price-logo {
    @apply flex mb-2 w-full m-auto;
  }
  &_price {
    @apply my-auto font-extrabold w-full text-text-secondary;
  }

  &__logo {
    @apply h-7 items-center;
  }

  &__color-selection {
    @apply my-5 py-2 border-y-2;
  }
  &__size-selection {
  }
  &__color-value,
  &__size-value {
    @apply font-extrabold text-text-secondary;
  }
  &__color-options,
  &__size-options {
    @apply flex items-start space-x-2 w-full text-left;
  }
}
</style>
