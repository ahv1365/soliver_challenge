<template>
  <div class="sustainability-tab" data-e2e="sustainability-tab-container-test">
    <div
      v-for="detail in tabContent"
      :key="detail.label"
      class="sustainability-tab__detail"
      :data-e2e="`sustainability-detail-${detail.label}-test`"
    >
      <div
        v-if="detail.label"
        class="sustainability-tab__label"
        :data-e2e="`sustainability-label-${detail.label}-test`"
      >
        <div
          v-if="detail.icon"
          class="sustainability-tab__icon-container"
          :data-e2e="`sustainability-icon-container-${detail.label}-test`"
        >
          <img
            :alt="`${detail.label} icon`"
            :src="getIconPath(detail?.icon)"
            class="sustainability-tab__icon"
            :data-e2e="`sustainability-icon-${detail.label}-test`"
            loading="lazy"
          />
        </div>
        <div
          class="sustainability-tab__text"
          :data-e2e="`sustainability-text-${detail.label}-test`"
        >
          {{ detail.label.toUpperCase() }}
        </div>
      </div>
      <div
        class="sustainability-tab__detail-content"
        :data-e2e="`sustainability-detail-content-${detail.label}-test`"
      >
        {{ detail.content }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Sustainability } from "@/types/tab";
import { defineComponent, PropType } from "vue";
import { getIconPath } from "@/helpers/iconPathUtil";

export default defineComponent({
  name: "SustainabilityTab",
  props: {
    tabContent: {
      type: Object as PropType<Sustainability>,
      required: true,
    },
  },
  setup() {
    return { getIconPath };
  },
});
</script>

<style lang="scss" scoped>
.sustainability-tab {
  @apply font-sans text-text-secondary text-left;

  &__detail {
    @apply border-b py-1;
  }

  &__label {
    @apply flex font-bold;
  }

  &__icon-container {
    @apply p-2;
  }

  &__icon {
    @apply my-auto w-8 h-8 border-2 border-white invert rounded-full;
  }

  &__text {
    @apply my-auto pl-1;
  }

  &__detail-content {
    @apply flex-grow;
  }
}
</style>
