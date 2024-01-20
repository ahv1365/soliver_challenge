<template>
  <footer class="product-sticky-footer">
    <div class="product-sticky-footer__name">
      {{ productName }}
    </div>
    <button
      class="product-sticky-footer__add-cart-button"
      @click="addToCart(productName)"
    >
      <div class="product-sticky-footer__add-cart-text">
        <div class="product-sticky-footer__add-cart-text-content">
          Add to Cart
        </div>
        <div class="product-sticky-footer__icon-container">
          <img
            alt="shopping-cart"
            :src="getIconPath('shopping-cart')"
            class="product-sticky-footer__cart-icon"
            loading="lazy"
          />
        </div>
      </div>
    </button>
  </footer>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { getIconPath } from "@/helpers/iconPathUtil";

export default defineComponent({
  name: "StickyFooter",
  props: {
    productName: {
      type: String as PropType<string>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const addToCart = (productName: string) => {
      emit("add-to-cart", productName);
    };
    return { addToCart, getIconPath };
  },
});
</script>

<style lang="scss" scoped>
.product-sticky-footer {
  @apply sticky bottom-0 right-0 bg-white flex justify-between w-full p-2 shadow-inner;

  &__name {
    @apply text-text px-5 py-1 overflow-hidden whitespace-nowrap text-ellipsis;
  }

  &__add-cart-button {
    @apply text-xs w-auto h-full my-auto px-2 py-1 min-w-40 bg-black text-white font-medium hover:bg-gray-800;
  }

  &__add-cart-text {
    @apply flex justify-between whitespace-nowrap;

    &-content {
      @apply font-extrabold text-text-secondary text-white;
    }
  }

  &__icon-container {
    @apply my-auto;

    & .product-sticky-footer__cart-icon {
      @apply w-3 h-3 invert;
    }
  }
}
</style>
