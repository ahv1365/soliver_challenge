import { Article } from "@/types/interfaces";

// Fetch product data from the API
export async function fetchProductData(productId: string): Promise<Article> {
  const response = await fetch(`/api/articles/${productId}`);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  const article = data.data.attributes; //
  return article;
}

export default { fetchProductData };
