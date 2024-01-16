<template>
  <div
    class="image-container"
    :style="{
      minHeight: `${minHeight}`,
      minWidth: `${minWidth}`,
    }"
    :class="containerClass"
  >
    <img
      v-if="loaded"
      :src="imageUrl"
      :alt="altText"
      :style="{
        height: `${height}`,
        width: `${width}`,
        'object-fit': 'contain',
      }"
      :class="{
        'image-transition': loaded,
        'image-loaded': !loaded,
      }"
    />
    <div
      v-else
      class="loader-placeholder"
      :style="{
        minHeight: `${minHeight}`,
        minWidth: `${minWidth}`,
      }"
    >
      <LoaderComponent />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import LoaderComponent from "@/components/shared/Loader.vue";

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
    width: {
      type: String,
      default: "auto",
    },
    height: {
      type: String,
      default: "auto",
    },
    minWidth: {
      type: String,
      default: "10px",
    },
    minHeight: {
      type: String,
      default: "10px",
    },
    containerClass: {
      type: [Object, String, Array],
      default: () => ({}),
    },
  },
  components: {
    LoaderComponent,
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
}
.loader-placeholder {
  background-color: white;
}
</style>
