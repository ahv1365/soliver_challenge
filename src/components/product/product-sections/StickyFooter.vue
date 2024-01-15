<template>
  <footer class="product-sticky-footer">
    <p class="product-sticky-footer__name">
      {{ articleName }}
    </p>
    <button
      class="product-sticky-footer--add-card__button"
      @click="addToCart(articleName)"
    >
      <div class="product-sticky-footer--add-card__text">
        Add to Cart
        <font-awesome-icon class="m-auto pl-10" icon="shopping-cart" />
      </div>
    </button>
  </footer>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default defineComponent({
  name: "StickyFooter",
  components: {
    FontAwesomeIcon,
  },
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
  @apply font-medium px-5 py-3 overflow-hidden whitespace-nowrap text-ellipsis;
}
.product-sticky-footer--add-card__button {
  @apply text-xs w-auto h-full my-auto px-4 py-1 bg-black text-white font-medium hover:bg-gray-800;
}
.product-sticky-footer--add-card__text {
  @apply flex font-extrabold space-x-10 whitespace-nowrap;
}
</style>
