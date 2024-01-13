import { mount } from "@vue/test-utils";
import ProductPage from "@/components/ProductPage.vue";
import { Variants } from "@/mocks/data";

jest.mock("@/composables/useProductData", () => ({
  useProductData: () => ({
    article: {
      variants: Variants,
      name: "Mock Product",
      price: "10.00",
      currency: { symbol: "$" },
    },
    // ... other mocked properties
  }),
}));

describe("ProductPage.vue", () => {
  it("renders product variants", () => {
    const wrapper = mount(ProductPage, {
      global: {
        stubs: {
          ProductDetails: true, // Stubbing ProductDetails
          FontAwesomeIcon: true, // Stubbing FontAwesomeIcon if used
        },
        mocks: {
          selectColor: jest.fn(), // Mock selectColor function
        },
      },
    });

    expect(wrapper.vm.isModalOpen).toBe(false);
  });
});
