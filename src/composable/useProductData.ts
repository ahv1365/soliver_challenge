import { ref, computed, onMounted } from "vue";
import { Article } from "@/type/article";
import GetData from "@/service/getData";

const dataService = new GetData();

export function useProductData(productId: string) {
  const article = ref<Article | null>(null);
  const selectedVariantIndex = ref<number>(0);
  const selectedImage = ref<string>("");

  /**
   * Fetches article data based on the provided product ID.
   * @param pid - Product ID to fetch data for.
   */
  const fetchData = async (pid: string): Promise<void> => {
    try {
      const response = await dataService.getArticle(pid);
      if (response) {
        article.value = response;
        selectedImage.value =
          response.images.length > 0 ? response.images[0] : "";
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  /**
   * Updates the selected variant index.
   * @param index - Index of the selected variant.
   */
  const selectVariant = (index: number): void => {
    selectedVariantIndex.value = index;
    selectedImage.value = article.value?.variants[index]?.image || "";
  };

  /**
   * Fetches article data based on the provided product ID.
   * @param pid - Product ID to fetch data for.
   */
  const selectColor = (id: string): void => {
    fetchData(id);
  };

  /**
   * Updates the selected size index.
   * @param index - Index of the selected size.
   */
  const selectSize = (selectedSize: string): void => {
    if (article.value) {
      article.value.size = selectedSize;
    }
  };

  /**
   * Updates the selected image.
   * @param image - Image URL to be displayed.
   */
  const selectImage = (image: string): void => {
    selectedImage.value = image;
  };

  /**
   * Determines the CSS class for a size button.
   * @param size - Size to determine the class for.
   * @returns Array of CSS class names.
   */
  const sizeClass = (size: string): string[] => {
    const classes = ["border", "rounded", "text-button-secondary"];
    if (article.value?.size === size) {
      classes.push("border-border", "font-bold");
    } else if (!article.value?.availableSizes?.includes(size)) {
      classes.push(
        "border-2",
        "border-border-secondary",
        "text-button-secondary-light",
        "cursor-default"
      );
    }

    return classes;
  };

  onMounted(() => fetchData(productId));

  return {
    article,
    selectedVariantIndex,
    selectedImage,
    fetchData,
    selectVariant,
    selectColor,
    selectSize,
    selectImage,
    sizeClass,
    isMobile: computed(() => {
      return window.innerWidth < 768;
    }),
    selectedVariant: computed(
      () => article.value?.variants[selectedVariantIndex.value]
    ),
    selectedVariantImage: computed(
      () =>
        selectedImage.value ||
        article.value?.variants[selectedVariantIndex.value]?.image ||
        ""
    ),
    selectedSize: computed(() => article?.value?.size),
  };
}
