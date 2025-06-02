import type { Product, Occasion, Order, CartItem } from '@/types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Enchanted Rose Bouquet',
    price: 49.99,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'rose bouquet',
    images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    rating: 4.5,
    reviews: 120,
    description: 'A stunning bouquet of 12 long-stemmed enchanted roses, perfect for expressing love and admiration. Grown in mystical gardens and delivered fresh.',
    seller: 'Mystic Blooms Co.',
    options: [{ name: 'Color', values: ['Red', 'Pink', 'White'] }],
    category: 'Flowers',
  },
  {
    id: '2',
    name: 'Artisan Chocolate Box',
    price: 29.99,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'chocolate box',
    images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    rating: 4.8,
    reviews: 250,
    description: 'A delectable assortment of handcrafted artisan chocolates, featuring unique flavors and premium ingredients. A treat for any connoisseur.',
    seller: 'Sweet Surrender Chocolates',
    options: [{ name: 'Size', values: ['Small (12 pcs)', 'Medium (24 pcs)', 'Large (36 pcs)'] }],
    category: 'Gourmet',
  },
  {
    id: '3',
    name: 'Personalized Star Map',
    price: 79.99,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'star map',
    description: 'Capture a special moment with a custom map of the stars on a specific date and location. A truly unique and sentimental gift.',
    seller: 'Celestial Memories Inc.',
    rating: 4.9,
    reviews: 95,
    category: 'Personalized',
  },
  {
    id: '4',
    name: 'Luxury Spa Set',
    price: 65.00,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'spa set',
    description: 'Indulge in a relaxing home spa experience with this luxury set, including bath bombs, scented candles, and nourishing lotions.',
    seller: 'Serene Escapes',
    rating: 4.6,
    reviews: 150,
    category: 'Wellness',
  },
  {
    id: '5',
    name: 'Gourmet Coffee Sampler',
    price: 35.50,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'coffee beans',
    description: 'Explore a world of flavors with this curated sampler of gourmet coffee beans from around the globe. Perfect for the coffee aficionado.',
    seller: 'The Daily Grind',
    rating: 4.7,
    reviews: 180,
    category: 'Gourmet',
  },
];

export const MOCK_OCCASIONS: Occasion[] = [
  { id: 'birthday', name: 'Birthday Bliss', imageUrl: 'https://placehold.co/300x200.png', dataAiHint: 'birthday cake' },
  { id: 'anniversary', name: 'Anniversary Amore', imageUrl: 'https://placehold.co/300x200.png', dataAiHint: 'wedding rings' },
  { id: 'housewarming', name: 'Housewarming Hugs', imageUrl: 'https://placehold.co/300x200.png', dataAiHint: 'new house' },
  { id: 'thankyou', name: 'Thank You Treasures', imageUrl: 'https://placehold.co/300x200.png', dataAiHint: 'thank you' },
  { id: 'congratulations', name: 'Congrats Cheers', imageUrl: 'https://placehold.co/300x200.png', dataAiHint: 'graduation cap' },
];

const MOCK_CART_ITEMS: CartItem[] = [
    {
        ...MOCK_PRODUCTS[0],
        quantity: 1,
        selectedOptions: { Color: 'Red' },
        giftMessage: 'Happy Birthday!',
    },
    {
        ...MOCK_PRODUCTS[2],
        quantity: 1,
    }
]

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD12345',
    items: MOCK_CART_ITEMS.slice(0,1),
    total: 49.99,
    status: 'Delivered',
    estimatedDelivery: 'Jan 15, 2024',
    orderDate: 'Jan 12, 2024',
  },
  {
    id: 'ORD67890',
    items: MOCK_CART_ITEMS.slice(1,2),
    total: 79.99,
    status: 'Out for Delivery',
    estimatedDelivery: 'Today, 5:00 PM',
    orderDate: 'Feb 28, 2024',
  },
  {
    id: 'ORD11223',
    items: MOCK_CART_ITEMS,
    total: 129.98,
    status: 'Processing',
    estimatedDelivery: 'Tomorrow, Mar 2, 2024',
    orderDate: 'Mar 1, 2024',
  },
];

export const MOCK_USER_PROFILE = {
  name: 'Alex Doe',
  email: 'alex.doe@example.com',
  phone: '+1-555-123-4567',
  wishlist: [MOCK_PRODUCTS[1], MOCK_PRODUCTS[3]],
  savedAddresses: [
    {
      id: 'addr1',
      type: 'Home',
      line1: '123 Dreamy Lane',
      city: 'Giftville',
      state: 'CA',
      zip: '90210',
      country: 'USA',
    },
    {
      id: 'addr2',
      type: 'Work',
      line1: '456 Corporate Blvd',
      suite: 'Suite 500',
      city: 'Busytown',
      state: 'NY',
      zip: '10001',
      country: 'USA',
    },
  ],
};

export const PAYMENT_METHODS = [
  { id: 'cc', name: 'Credit/Debit Card' },
  { id: 'upi', name: 'UPI' },
  { id: 'cod', name: 'Cash on Delivery' },
];
