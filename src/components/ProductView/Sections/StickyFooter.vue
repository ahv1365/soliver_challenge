<template>
  <div
    class="sticky-footer bg-white flex justify-between w-full p-2 shadow-inner top-shadow"
  >
    <p
      class="font-medium px-5 py-3 overflow-hidden whitespace-nowrap text-ellipsis"
    >
      {{ articleName }}
    </p>
    <button
      class="text-xs w-auto h-full my-auto px-4 py-1 bg-black text-white font-medium hover:bg-gray-800"
      @click="addToCart(articleName)"
    >
      <div class="flex font-extrabold space-x-10 whitespace-nowrap">
        Add to Cart
        <font-awesome-icon class="m-auto pl-10" icon="shopping-cart" />
      </div>
    </button>
  </div>
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
.sticky-footer {
  position: sticky;
  bottom: 0;
  right: 0;
  /* Other styles... */
}
/* Additional styles if needed */
</style>
