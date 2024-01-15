import { mount } from "@vue/test-utils";
import ProductView from "@/pages/product/ProductView.vue";
import { ref } from "vue";
import { productDetails } from "@/mocks/data";

jest.mock("@/composables/useProductData", () => ({
  useProductData: () => ({
    article: ref({
      // Mock the expected structure of the article
      name: "Mock Product",
      tabs: productDetails, // Mock the structure of the tabs if necessary
    }),
    selectSize: jest.fn(),
    sizeClass: jest.fn(),
    selectColor: jest.fn(),
  }),
}));

describe("ProductView.vue", () => {
  it("renders and handles close", async () => {
    const wrapper = mount(ProductView, {
      props: { productId: "1" },
      global: {
        stubs: {
          CloseButton: true,
          StickyFooter: true,
          ProductDetails: true,
          AccordionComponent: true,
          TabsComponent: true,
          ImageCarousel: true,
        },
      },
    });

    expect(wrapper.find(".opacity-0").exists()).toBe(false); // Initially visible
    // Simulate closeModal event
    await wrapper.vm.closeModal();
  });
});
