<template>
  <div class="flex justify-center items-center py-5 w-full absolute">
    <img
      class="h-10 items-center"
      alt="soliver logo"
      :src="`./assets/images/SOliver-Logo.svg`"
      loading="lazy"
    />
  </div>
  <ProductPageView />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ProductPageView from "./components/ProductPageView.vue";
import "./index.css";

@Options({
  components: {
    ProductPageView,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.div-transition {
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
}
.div-loaded {
  opacity: 0;
}
</style>
