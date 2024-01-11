import { mount } from "@vue/test-utils";
import ProductPageView from "@/components/ProductPageView.vue";
import ProductView from "@/components/ProductView/ProductView.vue";

describe("ProductPageView", () => {
  it("opens the modal when a product is clicked", async () => {
    const wrapper = mount(ProductPageView, {
      global: {
        components: {
          ProductView,
        },
      },
    });

    await wrapper.setData({
      article: { variants: [{ id: "1", name: "Product 1" }] },
    });

    const firstProduct = wrapper.find(".product-card");
    await firstProduct.trigger("click");

    expect(wrapper.vm.isModalOpen).toBe(true);
  });
});
