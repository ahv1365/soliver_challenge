export interface Article {
  id: number;
  name: string;
  description?: string;
  price: number;
  originalPrice: number;
  images: string[];
  variants: Variant[];
  color: string;
  size: string;
  availableSizes: string[];
  sizes: string[];
  tabs: ProductTabs;
  currency: currency;
}

export interface Variant {
  colorLabel: string;
  colorHEX: string;
  id: number;
  image: string;
}

export interface currency {
  label: string;
  symbol: string;
}
export interface Detail {
  label: string;
  content: string;
  icon: string;
}

export interface MaterialAndCare {
  material: Detail;
  materialComposition: Detail;
  instruction: Detail;
  fabric: Detail;
  quality: Detail;
  composition: Detail;
  machineWash: Detail;
  noDryCleaning: Detail;
  doNotChlore: Detail;
  handwarmIroning: Detail;
  tumbleDry: Detail;
  // jsut for demo purposes
  empty: Detail;
  empty1: Detail;
}

export interface FitDetails {
  fitType: Detail;
  backLength: Detail;
}

export interface Sustainability {
  care: Detail;
  certified: Detail;
}

export interface ProductDetailInfo {
  texture: Detail;
  collar: Detail;
  sleeve: Detail;
  pockets: Detail;
  itemNumber: Detail;
  productCode: Detail;
}

export interface TabContent {
  label: string;
  tab: string;
  content: MaterialAndCare | FitDetails | ProductDetailInfo | Sustainability;
}

export interface ProductTabs {
  tabs: TabContent[];
}
