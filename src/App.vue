<template>
  <LogoSplash />
  <div
    class="flex justify-center items-center py-5 w-full absolute overflow-hidden"
  >
    <img
      class="h-10 items-center"
      alt="soliver logo"
      :src="`./assets/images/SOliver-Logo.svg`"
      loading="lazy"
    />
  </div>
  <ProductPage />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { defineAsyncComponent } from "vue";
import LogoSplash from "./components/branding/LogoSplash.vue";
import "./index.css";

@Options({
  components: {
    ProductPage: defineAsyncComponent(() => import("./pages/ProductPage.vue")),
    LogoSplash,
  },
})
export default class App extends Vue {}
</script>
