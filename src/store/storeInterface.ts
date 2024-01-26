export interface RootState {
  product: ProductPageState;
}
export interface ProductPageState {
  isModalOpen: boolean;
  selectedProduct: string | null;
}
