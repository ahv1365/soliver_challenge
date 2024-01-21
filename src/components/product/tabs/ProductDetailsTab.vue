<template>
  <div
    class="product-details-tab"
    data-e2e="product-details-tab-container-test"
  >
    <!-- <div
      class="product-details-tab__title"
      data-e2e="product-details-title-test"
    >
      Product Details
    </div> -->
    <div
      class="product-details-tab__content"
      data-e2e="product-details-content-test"
    >
      <div v-if="tabContent?.texture" data-e2e="product-details-texture-test">
        {{ tabContent.texture.content }}
      </div>
      <div v-if="tabContent?.collar" data-e2e="product-details-collar-test">
        {{ tabContent.collar.content }}
      </div>
      <div v-if="tabContent?.sleeve" data-e2e="product-details-sleeve-test">
        {{ tabContent.sleeve.content }}
      </div>
      <div v-if="tabContent?.pockets" data-e2e="product-details-pockets-test">
        {{ tabContent.pockets.content }}
      </div>
      <div
        v-if="tabContent?.itemNumber"
        class="product-details-tab__item-number"
        data-e2e="product-details-item-number-test"
      >
        <div
          v-if="tabContent.itemNumber.icon"
          class="product-details-tab__icon-container"
          data-e2e="product-details-icon-container-test"
        >
          <img
            :alt="tabContent.itemNumber.icon"
            :src="getIconPath(tabContent.itemNumber.icon)"
            class="product-details-tab__icon"
            data-e2e="product-details-icon-test"
            loading="lazy"
          />
        </div>
        {{ tabContent.itemNumber.content }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ProductDetailInfo } from "@/types/tab";
import { defineComponent, PropType } from "vue";
import { getIconPath } from "@/helpers/iconPathUtil";

export default defineComponent({
  name: "ProductDetailsTab",
  props: {
    tabContent: {
      type: Object as PropType<ProductDetailInfo>,
      default: () => ({}),
    },
  },
  setup() {
    return { getIconPath };
  },
});
</script>

<style lang="scss" scoped>
.product-details-tab {
  @apply font-sans text-text-secondary p-2 text-left;

  &__title {
    @apply font-bold mb-2;
  }

  &__content {
    @apply mb-4;
  }

  &__item-number {
    @apply flex items-center mt-3 whitespace-pre-line;
  }

  &__icon-container {
    @apply bg-white mr-3 p-2 rounded-full;
  }

  &__icon {
    @apply w-5 h-5;
  }
}
</style>
