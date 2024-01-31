export interface RootState {
  productState: ProductPageState;
}
export interface ProductPageState {
  isModalOpen: boolean;
  selectedProduct: string | null;
}
