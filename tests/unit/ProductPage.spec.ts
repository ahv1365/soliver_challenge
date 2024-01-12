import { mount } from '@vue/test-utils';
import ProductPage from '@/components/ProductPage.vue';

jest.mock('@/composables/useProductData', () => ({
  useProductData: () => ({
    article: {
      variants: [
        { id: '1', image: 'image1.jpg', colorHEX: '#000000' },
        { id: '2', image: 'image2.jpg', colorHEX: '#FFFFFF' }
        // Add as many mock variants as your component expects
      ],
      name: 'Mock Product',
      price: '10.00',
      currency: { symbol: '$' }
    },
    // ... other mocked properties
  })
}));

describe('ProductPage.vue', () => {
  it('renders product variants', () => {
    const wrapper = mount(ProductPage, {
      global: {
        stubs: {
          ProductDetails: true, // Stubbing ProductDetails
          FontAwesomeIcon: true // Stubbing FontAwesomeIcon if used
        },
        mocks: {
          selectColor: jest.fn(), // Mock selectColor function
        }
      }
    });
    const variantElements = wrapper.findAll('.bg-white');
    expect(variantElements.length).toBe(2); // Make sure this matches the number of variants in your mock
  });

  // ... other tests
});
