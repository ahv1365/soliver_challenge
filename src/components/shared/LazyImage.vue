<template>
  <div
    class="lazy-image"
    :class="containerClass"
    :style="{ paddingBottom: aspectRatio }"
    data-e2e="lazy-image-container-test"
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
      class="lazy-image__img lazy-image__img--transition"
      data-e2e="lazy-image-test"
    />
    <div v-else class="lazy-image__loader" data-e2e="lazy-image-loader-test">
      <LoaderComponent />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import LoaderComponent from "@/components/shared/Loader.vue";
import { getImagePath } from "@/helpers/imagePathUtil";

export default defineComponent({
  name: "LazyImage",
  props: {
    src: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      default: "auto",
    },
    height: {
      type: String,
      default: "auto",
    },
    alt: {
      type: String,
      default: "",
    },
    aspectRatio: {
      type: String,
      default: "100%", // Default to 16:9 aspect ratio
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
    const srcPath = getImagePath(props.src);

    onMounted(() => {
      const preloadLink = document.createElement("link");
      preloadLink.rel = "preload";
      preloadLink.as = "image";
      preloadLink.href = srcPath;
      document.head.appendChild(preloadLink);

      const image = new Image();
      image.src = srcPath;
      image.onload = () => {
        loaded.value = true;
        imageUrl.value = srcPath;

        if (document.head.contains(preloadLink)) {
          document.head.removeChild(preloadLink);
        }
      };
    });

    return { loaded, imageUrl, altText: props.alt };
  },
});
</script>
<style lang="scss" scoped>
.lazy-image {
  @apply h-0 relative block w-full overflow-hidden;
  &__img {
    @apply absolute top-0 left-0 w-full h-full opacity-0 transition-opacity duration-500 ease-in-out;

    &--transition {
      @apply opacity-100;
    }
  }

  &__loader {
    @apply absolute top-0 left-0 w-full h-full bg-white;
  }
}
</style>
