import { mount, VueWrapper } from "@vue/test-utils";
import { nextTick } from "vue";
import ProductPage from "@/pages/ProductPage.vue";
import ProductView from "@/pages/product/ProductView.vue";
import LazyImage from "@/components/shared/LazyImage.vue";

jest.mock("@/composables/useProductData", () => ({
  useProductData: jest.fn().mockReturnValue({
    article: {
      variants: [
        {
          id: "1",
          image: "image1.jpg",
          colorHEX: "#FFFFFF",
          colorLabel: "White",
        } /* other variants */,
      ],
      name: "Mock Product",
      price: "10.00",
      currency: { symbol: "$" },
    },
    selectColor: jest.fn(),
  }),
}));

describe("ProductPage.vue", () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = mount(ProductPage, {
      global: {
        components: {
          ProductView,
          LazyImage,
        },
        stubs: {
          ProductDetails: {
            props: ["selectColor", "sizeClass", "article"],
            template: "<div></div>", // Stub with a simple template
          },
        },
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("initializes with correct default data", () => {
    expect(wrapper.vm.isModalOpen).toBe(false);
    expect(wrapper.vm.selectedProduct).toBe("1");
    // ... other default data assertions
  });

  describe("ProductPage.vue", () => {
    it("renders product cards with correct data-e2e attributes", () => {
      const wrapper = mount(ProductPage);

      const productCards = wrapper.findAll('[data-e2e^="product-card-"]');
      expect(productCards.length).toBeGreaterThan(0);

      productCards.forEach((card, index) => {
        expect(card.attributes("data-e2e")).toBe(
          `product-card-${index + 1}-test`
        );
      });
    });

    it("renders product details with correct data-e2e attributes", () => {
      const wrapper = mount(ProductPage);

      const productDetails = wrapper.findAll('[data-e2e^="product-detail-"]');
      expect(productDetails.length).toBeGreaterThan(0);

      productDetails.forEach((detail, index) => {
        expect(detail.attributes("data-e2e")).toBe(
          `product-detail-${index + 1}-test`
        );
      });
    });
    it("renders shared modal with correct data-e2e attribute", () => {
      const wrapper = mount(ProductPage);

      const sharedModal = wrapper.find('[data-e2e="shared-modal-test"]');
      expect(sharedModal.exists()).toBe(true);
    });
  });
});
