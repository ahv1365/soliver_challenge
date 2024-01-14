import { mount, VueWrapper } from '@vue/test-utils';
import { nextTick } from 'vue';
import ProductPage from '@/page/product/ProductPage.vue';
import ProductView from '@/component/product/ProductView.vue';
import LazyImage from '@/component/ui/LazyImage.vue';

jest.mock('@/composable/useProductData', () => ({
  useProductData: jest.fn().mockReturnValue({
    article: {
      variants: [{ id: '1', image: 'image1.jpg', colorHEX: '#FFFFFF', colorLabel: 'White' }, /* other variants */],
      name: 'Mock Product',
      price: '10.00',
      currency: { symbol: '$' },
    },
    selectColor: jest.fn(),
  }),
}));

describe('ProductPage.vue', () => {
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
            props: ['selectColor', 'sizeClass', 'article'],
            template: '<div></div>', // Stub with a simple template
          },
        },
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('initializes with correct default data', () => {
    expect(wrapper.vm.isModalOpen).toBe(false);
    expect(wrapper.vm.selectedProduct).toBe('1');
    // ... other default data assertions
  });

  // it('renders product variants', () => {
  //   const productCards = wrapper.findAll('.p-4');
  //   expect(productCards.length).toBeGreaterThan(0);
  // });

  // it('opens modal on product click', async () => {
  //   const productCard = wrapper.find('.p-4');
  //   await productCard.trigger('click');
  //   await nextTick();
  //   expect(wrapper.vm.isModalOpen).toBe(true);
  //   expect(wrapper.vm.selectedProduct).toBe('1');
  // });

  // it('closes modal on backdrop click', async () => {
  //   wrapper.vm.openModal('1');
  //   await nextTick();
  //   await wrapper.find('.fixed').trigger('click');
  //   expect(wrapper.vm.isModalOpen).toBe(false);
  // });

  // it('adds no-scroll class on modal open', async () => {
  //   wrapper.vm.openModal('1');
  //   await nextTick();
  //   expect(document.body.classList.contains('no-scroll')).toBe(true);
  // });

  // it('removes no-scroll class on unmount', () => {
  //   wrapper.unmount();
  //   expect(document.body.classList.contains('no-scroll')).toBe(false);
  // });

  // Add more tests as needed for computed properties, methods, etc.
});
