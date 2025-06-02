"use client";

import type { CartItem, Product } from '@/types';
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

const CART_STORAGE_KEY = 'giftGenieCart';

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();
  const [isCartInitialized, setIsCartInitialized] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
      setIsCartInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (isCartInitialized && typeof window !== 'undefined') {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    }
  }, [cartItems, isCartInitialized]);

  const addToCart = useCallback((product: Product, quantity: number = 1, selectedOptions?: { [key: string]: string }, giftMessage?: string) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => 
        item.id === product.id && 
        JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        if (giftMessage) updatedItems[existingItemIndex].giftMessage = giftMessage;
        return updatedItems;
      } else {
        return [...prevItems, { ...product, quantity, selectedOptions, giftMessage }];
      }
    });
    toast({
      title: "Added to Cart!",
      description: `${product.name} has been added to your cart.`,
      variant: "default",
    });
  }, [toast]);

  const removeFromCart = useCallback((productId: string, itemOptions?: { [key: string]: string }) => {
    setCartItems(prevItems => prevItems.filter(item => 
        !(item.id === productId && JSON.stringify(item.selectedOptions) === JSON.stringify(itemOptions))
    ));
    toast({
      title: "Item Removed",
      description: "The item has been removed from your cart.",
      variant: "default",
    });
  }, [toast]);

  const updateQuantity = useCallback((productId: string, itemOptions: { [key: string]: string } | undefined, newQuantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId && JSON.stringify(item.selectedOptions) === JSON.stringify(itemOptions)
          ? { ...item, quantity: Math.max(0, newQuantity) } // Ensure quantity doesn't go below 0
          : item
      ).filter(item => item.quantity > 0) // Remove item if quantity is 0
    );
  }, []);
  
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return { cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount, isCartInitialized };
}
