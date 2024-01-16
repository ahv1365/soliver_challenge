<template>
  <div v-if="showLogo" class="logo-container">
    <img alt="soliver logo" :src="`./assets/images/SOliver-Logo.svg`" />
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class LogoSplash extends Vue {
  showLogo = true;

  mounted() {
    setTimeout(() => {
      this.showLogo = false;
      this.$emit("logoHidden");
    }, 3000); // Adjust time as needed
  }
}
</script>

<style scoped>
.logo-container {
  z-index: 100;
  background-color: white;
  opacity: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  position: absolute;
  overflow: hidden;
  animation: fadeOut 3s ease-in;
}

@keyframes fadeOut {
  to {
    opacity: 0;
    display: none;
  }
}

.logo-container img {
  height: 80px;
}
</style>
