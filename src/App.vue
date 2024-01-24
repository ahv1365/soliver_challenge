<template>
  <!-- Demo Purposes -->
  <LogoSplash />
  <!-- Demo Purposes -->
  <SoliverLogo />
  <!-- Demo Purposes Design -->
  <ProductPage />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { defineAsyncComponent } from "vue";
import "./index.css";

@Options({
  components: {
    LogoSplash: defineAsyncComponent(
      () => import("@/components/branding/LogoSplash.vue")
    ),
    ProductPage: defineAsyncComponent(() => import("@/pages/ProductPage.vue")),
    SoliverLogo: defineAsyncComponent(
      () => import("@/components/branding/SoliverLogo.vue")
    ),
  },
})
export default class App extends Vue {}
</script>
