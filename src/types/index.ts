export type ProductType = 'tshirt' | 'mug' | 'totebag' | 'keychain' | 'puzzle';

export interface Product {
  id: string;
  name: string;
  type: ProductType;
  price: number;
  description: string;
  material: string;
  image: string;
  colors: { name: string; hex: string; bgClass: string }[];
  sizes?: string[];
  dimensions?: string;
  badge?: string;
}

export interface ComboOption {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice: number;
  savings: number;
  items: {
    type: ProductType;
    name: string;
    description: string;
  }[];
  popular?: boolean;
}

export interface CustomizationConfig {
  productType: ProductType;
  baseColor: string; // hex
  baseColorName: string;
  customText: string;
  fontFamily: 'serif' | 'urban' | 'sans';
  fontSize: 'sm' | 'md' | 'lg';
  textColor: string;
  uploadedImageUrl: string | null;
  selectedThemeId: string | null;
  placement: 'center' | 'pocket' | 'large';
  sizeSelected?: string;
}

export interface GiftPackagingOption {
  id: string;
  name: string;
  price: number;
  description: string;
  includedMessage: boolean;
  messageText?: string;
}

export interface CartItem {
  cartItemId: string;
  isCombo: boolean;
  comboId?: string;
  comboTitle?: string;
  productId?: string;
  productTitle?: string;
  productType: ProductType;
  price: number;
  quantity: number;
  customizations: CustomizationConfig[];
  giftPackaging?: GiftPackagingOption;
  giftCardMessage?: string;
}

export interface CustomerInfo {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  neighborhood: string;
  address: string;
  desiredDeliveryDate: string;
  notes?: string;
  paymentType: 'deposit_50' | 'full_100';
  paymentMethod: 'nequi' | 'daviplata' | 'transfiya' | 'pse' | 'card';
}

export interface Order {
  orderId: string;
  createdAt: string;
  customer: CustomerInfo;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  giftPackagingCost: number;
  total: number;
  depositAmount: number;
  balanceDue: number;
  isDeposit: boolean;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  product: string;
  comment: string;
  verified: boolean;
  tag: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'produccion' | 'envios' | 'cuidados' | 'garantia';
}
