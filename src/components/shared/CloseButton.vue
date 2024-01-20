<template>
  <div class="close-button-container" data-e2e="close-button-container-test">
    <button
      @click="emitClose"
      class="close-button-container__button"
      data-e2e="close-button-test"
    >
      &times;
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from "vue";

export default defineComponent({
  name: "CloseButton",
  setup(_, context: SetupContext) {
    const emitClose = () => {
      context.emit("close");
    };

    return { emitClose };
  },
});
</script>

<style lang="scss" scoped>
.close-button-container {
  @apply flex justify-end items-center;

  &__button {
    @apply text-center cursor-pointer bg-transparent border-0 text-xl font-bold leading-none text-[var(--color-button-primary)] opacity-30 p-4 pb-0 transition-opacity duration-300 ease-in-out;

    &:hover {
      @apply opacity-100;
    }
  }
}
</style>
