import { Product, Category, PromoCode } from '../types';

export const categories: Category[] = [
  { id: '1', name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&auto=format&fit=crop&q=60' },
  { id: '2', name: 'Fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b830c6039?w=800&auto=format&fit=crop&q=60' },
  { id: '3', name: 'Home Decor', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=800&auto=format&fit=crop&q=60' },
  { id: '4', name: 'Beauty', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=60' },
];

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Ultra Slim Laptop',
    description: 'Powerful and portable laptop for professionals.',
    price: 1299.99,
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/b9b8408d-6c00-4ae8-bce4-d0413bc6b11d/hero-electronics-ef620927-1778185853124.webp',
    category: 'Electronics',
    stock: 10,
  },
  {
    id: 'p2',
    name: 'Wireless Headphones',
    description: 'High-fidelity audio with active noise cancellation.',
    price: 299.99,
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/b9b8408d-6c00-4ae8-bce4-d0413bc6b11d/product-headphones-black-332c3104-1778185854665.webp',
    category: 'Electronics',
    stock: 25,
  },
  {
    id: 'p3',
    name: 'Smart Watch Series X',
    description: 'Track your health and stay connected on the go.',
    price: 399.99,
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/b9b8408d-6c00-4ae8-bce4-d0413bc6b11d/product-smart-watch-0d068b5e-1778185853574.webp',
    category: 'Electronics',
    stock: 15,
  },
  {
    id: 'p4',
    name: 'Designer Leather Handbag',
    description: 'Elegant and spacious handbag for daily essentials.',
    price: 150.00,
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/b9b8408d-6c00-4ae8-bce4-d0413bc6b11d/product-handbag-luxury-c7b7ccc4-1778185853422.webp',
    category: 'Fashion',
    stock: 5,
  },
  {
    id: 'p5',
    name: 'Running Sneakers',
    description: 'Breathable and cushioned shoes for your daily run.',
    price: 89.99,
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/b9b8408d-6c00-4ae8-bce4-d0413bc6b11d/product-sneakers-running-59019041-1778185855118.webp',
    category: 'Fashion',
    stock: 30,
  },
  {
    id: 'p6',
    name: 'Modern Coffee Maker',
    description: 'Brew the perfect cup of coffee every morning.',
    price: 199.99,
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/b9b8408d-6c00-4ae8-bce4-d0413bc6b11d/product-coffee-maker-9e9a1873-1778185857787.webp',
    category: 'Home Decor',
    stock: 12,
  },
  {
    id: 'p7',
    name: 'RGB Gaming Keyboard',
    description: 'Mechanical keys with customizable RGB lighting.',
    price: 129.99,
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/b9b8408d-6c00-4ae8-bce4-d0413bc6b11d/product-keyboard-rgb-e02ab90f-1778185857551.webp',
    category: 'Electronics',
    stock: 20,
  },
  {
    id: 'p8',
    name: 'Organic Skincare Set',
    description: 'Natural skincare products for a healthy glow.',
    price: 59.99,
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/b9b8408d-6c00-4ae8-bce4-d0413bc6b11d/product-skincare-set-aa19512f-1778185856532.webp',
    category: 'Beauty',
    stock: 40,
  },
];

export const promoCodes: PromoCode[] = [
  { code: 'SAVE10', discount: 10, type: 'percentage' },
  { code: 'WELCOME20', discount: 20, type: 'fixed' },
];

export const heroSlides = [
  {
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/b9b8408d-6c00-4ae8-bce4-d0413bc6b11d/hero-electronics-ef620927-1778185853124.webp',
    title: 'Future of Tech',
    subtitle: 'Discover the latest in high-performance electronics.',
    cta: 'Shop Now',
  },
  {
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/b9b8408d-6c00-4ae8-bce4-d0413bc6b11d/hero-fashion-69ce7af9-1778185853269.webp',
    title: 'Autumn Style',
    subtitle: 'Elegant outfits for the modern trendsetter.',
    cta: 'Explore Fashion',
  },
  {
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/b9b8408d-6c00-4ae8-bce4-d0413bc6b11d/hero-home-decor-901e8892-1778185854712.webp',
    title: 'Cosy Living',
    subtitle: 'Transform your home with our curated decor collection.',
    cta: 'View Decor',
  },
];