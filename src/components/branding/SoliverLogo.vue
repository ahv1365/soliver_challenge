<template>
  <div
    class="flex justify-center items-center py-5 w-full absolute overflow-hidden"
  >
    <img
      class="h-10 items-center"
      alt="soliver logo"
      :src="`./assets/images/SOliver-Logo.svg`"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SoliverLogo",
  // Any specific TypeScript logic for the logo can go here
});
</script>

<style scoped>
/* Any specific styles for the logo can go here */
</style>
