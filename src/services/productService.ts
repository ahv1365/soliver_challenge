import { Article } from "@/types/interfaces";

// const API_BASE_URL =
//   process.env.VUE_APP_API_BASE_URL || "http://localhost:3000"; // must be defined in env variable

// Fetch product data from the API
async function fetchProductData(productId: string): Promise<Article> {
  const endpoint = `/api/articles/${productId}`;
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(
        `HTTP error! Status: ${response.status} for ${productId}`
      );
    }
    const data = await response.json();
    if (!data || !data.data || !data.data.attributes) {
      throw new Error(`Unexpected response structure for ${productId}`);
    }
    const article: Article = data.data.attributes;
    return article;
  } catch (error) {
    throw new Error(
      `Failed to fetch product data for ${productId}: ${
        error instanceof Error ? error.message : error
      }`
    );
  }
}
export default { fetchProductData };
