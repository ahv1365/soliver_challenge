import { mount } from '@vue/test-utils';
import ProductView from '@/components/ProductView/ProductView.vue';
import { ref } from 'vue';

jest.mock('@/composables/useProductData', () => ({
    useProductData: () => ({
        article: ref({
            // Mock the expected structure of the article
            name: 'Mock Product',
            tabs: { tabs: [] }, // Mock the structure of the tabs if necessary
            // ... other properties as needed
        }),
        selectSize: jest.fn(),
        sizeClass: jest.fn(),
        selectColor: jest.fn(),
    })
}));

describe('ProductView.vue', () => {
    it('renders and handles close', async () => {
        const wrapper = mount(ProductView, {
            props: { productId: '1' },
            global: {
                stubs: {
                    CloseButton: true,
                    StickyFooter: true,
                    ProductDetails: true,
                    AccordionComponent: true,
                    TabsComponent: true,
                    ImageCarousel: true
                }
            }
        });

        expect(wrapper.find('.opacity-0').exists()).toBe(false); // Initially visible

        // Simulate closeModal event
        await wrapper.vm.closeModal();

        // You can add more assertions here based on your component's functionality
    });

    // ... additional tests as needed
});
