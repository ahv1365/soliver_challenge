<template>
  <div class="flex justify-center items-center py-5 w-full absolute">
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
import ProductPage from "./components/ProductPage.vue";
import "./index.css";

@Options({
  components: {
    ProductPage,
  },
})
export default class App extends Vue {}
</script>
