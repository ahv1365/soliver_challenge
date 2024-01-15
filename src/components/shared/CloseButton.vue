<template>
  <div class="flex justify-end items-center">
    <button @click="emitClose" class="close-button">&times;</button>
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

<style scoped>
.close-button {
  text-align: center;
  cursor: pointer;
  background: none;
  border: none;
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1;
  color: var(--color-button-primary);
  opacity: 0.3;
  padding: 1rem;
  padding-bottom: 0;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
}
.close-modal {
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1;
  color: var(--color-button-primary);
  opacity: 0.3;
  cursor: pointer;
  padding: 1rem;
}
</style>
