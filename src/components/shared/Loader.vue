<template>
  <div class="loader" v-if="!loaded"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoaderComponent",
  props: {
    loaded: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style scoped>
.loader {
  position: absolute; /* Position relative to the modal */
  top: 50%; /* Center vertically */
  left: 50%; /* Center horizontally */
  transform: translate(-50%, -50%); /* Adjust centering */
  border: 4px solid rgba(255, 255, 255, 0.179); /* Light gray border */
  border-radius: 50%; /* Circular shape */
  border-top: 4px solid #7f7f7f9f; /* Dark gray top border */
  width: 40px; /* Width of the loader */
  height: 40px; /* Height of the loader */
  animation: spin 2s linear infinite; /* Spinning animation */
  z-index: 10; /* Ensure it's above other content */
}

@keyframes spin {
  0% {
    transform: translate(-50%, -50%) rotate(0deg); /* Rotate from 0 degrees */
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg); /* Rotate to 360 degrees */
  }
}
</style>
