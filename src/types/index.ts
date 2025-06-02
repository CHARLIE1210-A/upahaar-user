export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  images?: string[];
  rating?: number;
  reviews?: number;
  description: string;
  seller?: string;
  options?: {
    name: string;
    values: string[];
  }[];
  category?: string;
  dataAiHint?: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedOptions?: { [key: string]: string };
  giftMessage?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'Processing' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  estimatedDelivery?: string;
  orderDate: string;
  deliveryAddress?: any;
  paymentMethod?: string;
}

export interface Occasion {
  id: string;
  name: string;
  imageUrl: string;
  dataAiHint?: string;
}
