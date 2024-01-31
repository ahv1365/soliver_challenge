<template>
  <transition name="modal">
    <div
      v-if="isModalOpen"
      @click="handleBackdropClick"
      @pointerdown.passive="startInteraction"
      class="shared-modal"
      data-test="modal-backdrop-test"
    >
      <section
        class="shared-modal__content"
        @click.stop
        data-test="modal-content-test"
      >
        <slot data-test="modal-slot-test"></slot>
      </section>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";

export default defineComponent({
  name: "SharedModal",
  props: {
    isModalOpen: Boolean,
    closeModal: Function as PropType<() => void>,
  },
  setup(props) {
    const startX = ref<number>(0);
    const startY = ref<number>(0);
    const threshold = 5; // Swipe threshold in pixels

    const startInteraction = (event: PointerEvent) => {
      startX.value = event.clientX;
      startY.value = event.clientY;
    };

    const handleBackdropClick = (event: MouseEvent | TouchEvent) => {
      let endX: number;
      let endY: number;

      // PointerEvent is a superset of MouseEvent and TouchEvent
      if (event instanceof PointerEvent) {
        endX = event.clientX;
        endY = event.clientY;
      } else {
        return; // Exit if not a pointer event
      }

      if (
        Math.abs(endX - startX.value) <= threshold &&
        Math.abs(endY - startY.value) <= threshold
      ) {
        props.closeModal?.(); // Close modal if swipe distance is within threshold
      }
    };

    return {
      handleBackdropClick,
      startInteraction,
    };
  },
});
</script>

<style lang="scss" scoped>
.shared-modal {
  @apply fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10;

  &__content {
    @apply bg-transparent rounded-lg overflow-auto p-4;
  }
}

.modal {
  &-enter-active {
    @apply transition-opacity duration-1000;
  }
  &-enter-from {
    opacity: 0;
  }
  &-enter-to {
    opacity: 1;
  }
}
</style>
