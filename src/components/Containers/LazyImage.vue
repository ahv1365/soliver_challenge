<template>
  <div class="image-container">
    <img
      v-if="loaded"
      :src="imageUrl"
      :alt="altText"
      class="object-cover w-full h-full"
      :class="{ 'image-transition': loaded, 'image-loaded': !loaded }"
    />
    <div v-else class="loader-placeholder"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  name: "LazyImage",
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const loaded = ref(false);
    const imageUrl = ref("");

    onMounted(() => {
      const image = new Image();
      image.src = props.src;
      image.onload = () => {
        loaded.value = true;
        imageUrl.value = props.src;
      };
    });

    return {
      loaded,
      imageUrl,
      altText: props.alt,
    };
  },
});
</script>

<style scoped>
.image-transition {
  opacity: 1; /* Low initial opacity */
  transition: opacity 2.5s ease-in-out; /* Smooth transition for opacity */
}
.image-loaded {
  opacity: 0; /* Full opacity once loaded */
}
.image-container {
  position: relative;
  width: var(--image-width);
  height: var(--image-height);
  background-color: white;
}
.loader-placeholder {
  width: 50vh;
  height: 50vh;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
