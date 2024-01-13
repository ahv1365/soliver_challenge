import { TabContent, Variant } from "@/types/interfaces";

export const Variants: Variant[] = [
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

export const productDetails: TabContent[] = [
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
];
