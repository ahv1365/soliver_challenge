import { mount, VueWrapper } from "@vue/test-utils";
import ProductPage from "@/pages/ProductPage.vue";
import { createStore } from "vuex";

jest.mock("@/composables/useProductData", () => ({
  useProductData: jest.fn().mockReturnValue({
    productData: {
      variants: [
        {
          id: "1",
          image: "image1.jpg",
          colorHEX: "#FFFFFF",
          colorLabel: "White",
        },
        // Add other variants as needed for testing
      ],
      name: "Mock Product",
      price: "10.00",
      currency: { symbol: "$" },
    },
    selectedVariantImage: jest.fn(),
    selectSize: jest.fn(),
    sizeClass: jest.fn(),
    selectImage: jest.fn(),
  }),
}));

describe("ProductPage.vue", () => {
  let wrapper: VueWrapper<any>;
  let store: any;

  beforeEach(() => {
    store = createStore({
      state: {
        product: {
          isModalOpen: false,
          selectedProduct: null,
        },
      },
      actions: {
        "product/openModal": jest.fn(),
        "product/closeModal": jest.fn(),
      },
    });

    wrapper = mount(ProductPage, {
      global: {
        plugins: [store],
        // You can include other global configurations if needed
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  // ... previous test setup

  it("renders shared modal with correct data-e2e attribute", async () => {
    // Simulate the state where the modal should be open
    store.dispatch("product/openModal", "1");
    await wrapper.vm.$nextTick(); // Wait for the next DOM update

    const sharedModal = wrapper.find('[data-e2e="shared-modal-test"]');
    expect(sharedModal.exists()).toBe(false);
  });

  it("renders product cards with correct data-e2e attributes", () => {
    const productCards = wrapper.findAll('[data-e2e^="product-card-"]');
    expect(productCards.length).toBeGreaterThan(0);

    productCards.forEach((card, index) => {
      expect(card.attributes("data-e2e")).toBe(
        `product-card-${index + 1}-test`
      );
    });
  });

  it("renders product details with correct data-e2e attributes", () => {
    const productDetails = wrapper.findAll('[data-e2e^="product-detail-"]');
    expect(productDetails.length).toBeGreaterThan(0);

    productDetails.forEach((detail, index) => {
      expect(detail.attributes("data-e2e")).toBe(
        `product-detail-${index + 1}-test`
      );
    });
  });

  it("renders shared modal with correct data-e2e attribute", () => {
    const sharedModal = wrapper.find('[data-e2e="shared-modal-test"]');
    expect(sharedModal.exists()).toBe(false);
  });
});
