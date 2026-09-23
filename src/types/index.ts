export interface ProductOption {
  name: string;
  price?: number;
}

export interface CustomizationStep {
  id: string;
  title: string;
  subtitle: string;
  required: boolean;
  maxSelections: number;
  options: {
    id: string;
    label: string;
    extraPrice?: number;
    description?: string;
  }[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
  tags?: string[];
  isCustomizable?: boolean;
  highlight?: boolean;
  customizationSteps?: CustomizationStep[];
}

export interface CartItem {
  cartItemId: string;
  product: Product;
  quantity: number;
  customizations?: {
    stepId: string;
    stepTitle: string;
    selectedOptions: {
      id: string;
      label: string;
      extraPrice?: number;
    }[];
  }[];
  notes?: string;
  itemTotalPrice: number;
}

export type OrderType = 'delivery' | 'takeaway';
export type PaymentMethod = 'pix' | 'cartao_entrega' | 'dinheiro';

export interface CustomerOrderDetails {
  name: string;
  phone: string;
  orderType: OrderType;
  street: string;
  number: string;
  neighborhood: string;
  complement?: string;
  paymentMethod: PaymentMethod;
  cashChangeFor?: string;
  notes?: string;
}
