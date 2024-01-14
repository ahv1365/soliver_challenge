<template>
  <transition name="fade">
    <div class="modal-backdrop" v-if="isVisible" @click="handleBackdropClick">
      <div class="modal-content" @click.stop>
        <slot name="header">
          <h3>Modal Header</h3>
        </slot>

        <slot>
          <p>Default content of the modal.</p>
        </slot>

        <slot name="footer">
          <button @click="close">Close</button>
        </slot>
      </div>
    </div>
  </transition>
</template>

<script>
import { ref, watch, defineComponent, toRefs } from "vue";

export default defineComponent({
  name: "ModalComponent",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const { value } = toRefs(props);
    const isVisible = ref(value.value);

    watch(value, (newValue) => {
      isVisible.value = newValue;
    });

    const close = () => {
      emit("update:value", false);
    };

    const handleBackdropClick = () => {
      close();
    };

    return { isVisible, close, handleBackdropClick };
  },
});
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  z-index: 1001;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
