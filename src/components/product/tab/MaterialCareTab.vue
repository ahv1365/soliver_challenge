<template>
  <div class="material-care-tab" data-e2e="material-care-tab-container-test">
    <div class="material-care-tab__grid" data-e2e="material-care-tab-grid-test">
      <div
        v-for="(item, index) in tabContent"
        :key="`item-${index}`"
        class="material-care-tab__item"
        :data-e2e="`material-care-item-${index}-test`"
      >
        <div
          class="material-care-tab__label"
          :data-e2e="`material-care-label-${index}-test`"
        >
          {{ item.label }}
        </div>
        <div
          class="material-care-tab__content"
          :data-e2e="`material-care-content-${index}-test`"
        >
          <img
            v-if="item.icon"
            :alt="`${item.label} icon`"
            :src="getIconPath(item.icon)"
            class="material-care-tab__icon"
            :data-e2e="`material-care-icon-${index}-test`"
            loading="lazy"
          />
          {{ item.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { MaterialAndCare } from "@/types/tab";
import { defineComponent, PropType } from "vue";
import { getIconPath } from "@/helpers/iconPathUtil";

export default defineComponent({
  name: "MaterialCareTab",
  props: {
    tabContent: {
      type: Object as PropType<MaterialAndCare>,
      required: true,
    },
  },
  setup() {
    return { getIconPath };
  },
});
</script>

<style lang="scss" scoped>
.material-care-tab {
  @apply font-sans p-4 text-left text-text-secondary;

  &__grid {
    @apply grid grid-cols-1 md:grid-cols-2 gap-4 mb-4;
  }

  &__item {
    @apply mb-2;
  }

  &__label {
    @apply font-bold;
  }

  &__content {
    @apply flex items-center;

    & .material-care-tab__icon {
      @apply mr-2 w-6 h-6;
    }
  }
}
</style>
