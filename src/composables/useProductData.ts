import { ref, computed, onMounted } from "vue";
import { Article } from "@/types/interfaces";
import GetData from "@/services/getData";

const dataService = new GetData();

export function useProductData(productId: string) {
  const article = ref<Article | null>(null);
  const selectedVariantIndex = ref<number>(0);
  const selectedSizeIndex = ref<number>(0);
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
    selectedSizeIndex.value = 0;
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
  const selectSize = (index: number, selectedSize: string): void => {
    if (article.value) {
      article.value.size = selectedSize;
    }
    selectedSizeIndex.value = index;
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
  const sizeClass = (size: string, selectedSize: string): string[] => [
    "border rounded",
    article.value?.availableSizes.includes(size)
      ? `hover:bg-black hover:text-white ${
          selectedSize === size ? "border-black" : ""
        }`
      : "border-2 border-gray-100 text-gray-300 cursor-default",
  ];

  onMounted(() => fetchData(productId));

  return {
    article,
    selectedVariantIndex,
    selectedSizeIndex,
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
    selectedSize: computed(() => article.value?.sizes[selectedSizeIndex.value]),
  };
}
