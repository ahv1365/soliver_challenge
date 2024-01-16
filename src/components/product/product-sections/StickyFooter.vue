<template>
  <footer class="product-sticky-footer">
    <p class="product-sticky-footer__name">
      {{ articleName }}
    </p>
    <button
      class="product-sticky-footer--add-card__button"
      @click="addToCart(articleName)"
    >
      <div class="product-sticky-footer--add-card--text">
        <div class="product-sticky-footer--add-card--text__text">
          Add to Cart
        </div>
        <div class="my-auto">
          <img
            alt="shopping-cart"
            :src="`./assets/icons/shopping-cart.svg`"
            class="product-sticky-footer--add-card--text__icon"
          />
        </div>
      </div>
    </button>
  </footer>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "StickyFooter",
  props: {
    articleName: {
      type: String as PropType<string>,
      required: true,
    },
  },
  methods: {
    addToCart(articleName: string) {
      // Logic to handle adding the product to the cart
      this.$emit("add-to-cart", articleName);
    },
  },
});
</script>

<style scoped>
.product-sticky-footer {
  @apply sticky bottom-0 right-0 bg-white flex justify-between w-full p-2 shadow-inner;
}
.product-sticky-footer__name {
  @apply text-text px-5 py-3 overflow-hidden whitespace-nowrap text-ellipsis;
}
.product-sticky-footer--add-card__button {
  @apply text-xs w-auto h-full my-auto px-2 py-1 min-w-40 bg-black text-white font-medium hover:bg-gray-800;
}
.product-sticky-footer--add-card--text {
  @apply flex justify-between whitespace-nowrap;
}
.product-sticky-footer--add-card--text__text {
  @apply font-extrabold text-text-secondary text-white;
}
.product-sticky-footer--add-card--text__icon {
  @apply w-3 h-3 invert;
}
</style>
