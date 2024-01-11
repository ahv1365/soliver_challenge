// src/services/getData.ts
import { Article } from "@/types/interfaces";
import productService from "./productService";
import { log } from "@/decorators/log";

export default class GetData {
  /**
   * Fetches article data for the given ID.
   * @param id - The ID of the article to fetch.
   * @returns A Promise resolving to the fetched Article.
   */
  // @log
  public async getArticle(id: string): Promise<Article> {
    try {
      return await productService.fetchProductData(id);
    } catch (error) {
      console.error("Error in getArticle:", error);
      throw error; // Re-throw the error for the caller to handle
    }
  }
}
