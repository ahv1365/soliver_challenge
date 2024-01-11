import { Article, ProductTabs, Variant } from "@/types/interfaces";
import { createServer, Model, Factory, Server, Response } from "miragejs";

const Variants: Variant[] = [
  {
    colorLabel: "WHITE",
    colorHEX: "#ffffff",
    id: 1,
    image: "WHITE-2.webp",
  },
  {
    colorLabel: "BORDEAUX",
    colorHEX: "#a52a2a",
    id: 2,
    image: "BORDEAUX-2.webp",
  },
  {
    colorLabel: "NAVY",
    colorHEX: "#000080",
    id: 3,
    image: "NAVY-2.webp",
  },
  {
    colorLabel: "BLACK",
    colorHEX: "#000000",
    id: 4,
    image: "BLACK-2.webp",
  },
];

const productDetails: ProductTabs = {
  tabs: [
    {
      tab: "ProductDetailsTab",
      label: "Product Details",
      content: {
        texture: {
          label: "",
          content: "Texture: textured pattern",
          icon: "",
        },
        collar: {
          label: "",
          content: "Collar: Kent collar",
          icon: "",
        },
        sleeve: {
          label: "",
          content: "Sleeve: with turn-ups",
          icon: "",
        },
        pockets: {
          label: "",
          content: "Pockets: breast pocket",
          icon: "",
        },
        itemNumber: {
          label: "",
          content: "Item Number: 13.005.22.2253.62A4.3XL",
          icon: "",
        },
        productCode: {
          label: "",
          content: "406316254075",
          icon: "",
        },
      },
    },
    {
      label: "Fit",
      tab: "FitTab",
      content: {
        fitType: {
          label: "",
          content: "Fit: Regular Fit",
          icon: "",
        },
        backLength: {
          label: "",
          content: "Back length: bei Größe M ca. 75 cm",
          icon: "",
        },
      },
    },
    {
      label: "Material & Care Instructions",
      tab: "MaterialCareTab",
      content: {
        material: {
          label: "Material",
          content: "",
          icon: "",
        },
        materialComposition: {
          label: "Material Composition",
          content: "",
          icon: "",
        },
        fabric: {
          label: "",
          content: "Fabric: chambray",
          icon: "",
        },
        composition: {
          label: "",
          content: "99% Cotton, 1% Elastane",
          icon: "",
        },
        quality: {
          label: "",
          content: "Quality: lightweight",
          icon: "",
        },
        // this is just for demo purposes
        empty: {
          label: "",
          content: "",
          icon: "",
        },
        instruction: {
          label: "Care Instructions",
          content: "",
          icon: "",
        },
        // this is just for demo purposes
        empty1: {
          label: "",
          content: "",
          icon: "",
        },
        machineWash: {
          label: "",
          content: "Machine wash 40°",
          icon: "shirt",
        },
        noDryCleaning: {
          label: "",
          content: "No dry cleaning",
          icon: "ban",
        },
        doNotChlore: {
          label: "",
          content: "Do not chlore",
          icon: "water",
        },
        handwarmIroning: {
          label: "",
          content: "Handwarm ironing",
          icon: "ban",
        },
        tumbleDry: {
          label: "",
          content: "Tumble with reduced thermal pressure",
          icon: "wind",
        },
      },
    },
    {
      label: "Sustainability",
      tab: "SustainabilityTab",
      content: {
        care: {
          label: "",
          content:
            "WE CARE: Items with other sustainable properties that go beyond our minimum standards are marked with the WE CARE label.",
          icon: "",
        },
        certified: {
          label: "Certified Sustainable Fibre:",
          content:
            "When it comes to certified sustainable fibres, we're committed to using natural fibres from renewable sources. The raw materials are cultivated via resource-saving methods. This product supports economically, ecologically and socially sustainable cotton farming. The sourcing of sustainable cotton follows the principle of mass balance. You can find more information here.",
          icon: "shirt",
        },
      },
    },
  ],
};

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
        size: "S", // Default size for the article
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
