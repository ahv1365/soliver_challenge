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
import LogoSplash from "./component/ui/LogoSplash.vue";
import "./index.css";

@Options({
  components: {
    ProductPage: defineAsyncComponent(
      () => import("./page/product/ProductPage.vue")
    ),
    LogoSplash,
  },
})
export default class App extends Vue {}
</script>
