import { Article } from "@/type/article";
import { createServer, Model, Factory, Server, Response } from "miragejs";
import { Variants, productDetails } from "./data";

// Function to initialize MirageJS server, typically used in a development environment
export function makeServer({ environment = "development" } = {}): Server {
  return createServer({
    environment,

    // Model definition for 'Article' mirroring the structure of the interface
    models: {
      article: Model.extend<Partial<Article>>({}),
    },

    // Factory for generating mock data for 'Article'
    factories: {
      article: Factory.extend<Partial<Article>>({
        id(i) {
          // Auto-incremented ID for each generated article
          return i + 1;
        },
        name: "T-shirt with an embroidered logo",
        description: "Model is 184 cm tall and wears size L.",
        currency: { symbol: "€", label: "EUR" },
        price() {
          // Randomly generated price
          return Math.floor(Math.random() * (30 - 5 + 1)) + 1.99;
        },
        originalPrice() {
          // Original price, slightly higher than the selling price
          return 30 + Math.floor(Math.random() * (30 - 5 + 1)) + 5.99;
        },
        color(i) {
          return Variants.find((value) => value.id === i + 1)?.colorLabel;
        }, // Default color for the article
        images(i) {
          const image = Variants.find(
            (value) => value.id === i + 1
          )?.colorLabel;
          // Unique set of images for each article
          return [`${image}-1.webp`, `${image}-2.webp`];
        },
        sizes: ["S", "M", "L", "XL", "XXL"],
        availableSizes() {
          // Random subset of sizes, maintaining the order
          const allSizes = ["S", "M", "L", "XL", "XXL"];
          return allSizes.filter(() => Math.random() > 0.5);
        },
        variants: Variants,
        size: "", // Default size for the article
        tabs: productDetails,
      }),
    },

    // Seeder to generate a predefined number of articles
    seeds(server) {
      server.createList("article", 10); // Creates 10 articles using the defined factory
    },

    // API endpoints
    routes() {
      this.namespace = "api";

      // Endpoint to fetch a specific article by ID
      this.get("/articles/:articleId", (schema, request) => {
        const articleId = request.params.articleId;

        // Finding the article by ID in the Mirage database
        const article = schema.find("article", articleId);

        // Respond with 404 error if the article is not found
        if (!article) {
          return new Response(404, {}, { error: "Article not found" });
        }

        // Return the found article in a structured response
        return {
          data: {
            type: "article",
            id: article.id,
            attributes: article.attrs,
          },
        };
      });
    },
  });
}
