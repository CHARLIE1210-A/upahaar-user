"use client";

import type { CartItem, Product } from '@/types';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

const CART_STORAGE_KEY = 'giftGenieCart';

// Helper to create a unique key for cart items based on id and selectedOptions
function getCartItemKey(id: string, selectedOptions?: { [key: string]: string }) {
  return `${id}::${selectedOptions ? JSON.stringify(selectedOptions) : ''}`;
}

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();
  const [isCartInitialized, setIsCartInitialized] = useState(false);
  const isFirstLoad = useRef(true);

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
      setIsCartInitialized(true);
    }
  }, []);

  // Persist cart to localStorage when cartItems change (but not on first load)
  useEffect(() => {
    if (isCartInitialized && typeof window !== 'undefined') {
      if (isFirstLoad.current) {
        isFirstLoad.current = false;
        return;
      }
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    }
  }, [cartItems, isCartInitialized]);

  const addToCart = useCallback(
    (
      product: Product,
      quantity: number = 1,
      selectedOptions?: { [key: string]: string },
      giftMessage?: string
    ) => {
      setCartItems(prevItems => {
        const key = getCartItemKey(product.id, selectedOptions);
        const existingItemIndex = prevItems.findIndex(
          item => getCartItemKey(item.id, item.selectedOptions) === key
        );

        if (existingItemIndex > -1) {
          const updatedItems = [...prevItems];
          updatedItems[existingItemIndex].quantity += quantity;
          if (giftMessage) updatedItems[existingItemIndex].giftMessage = giftMessage;
          toast({
            title: "Added to Cart!",
            description: `${product.name} quantity updated in your cart.`,
            variant: "default",
          });
          return updatedItems;
        } else {
          toast({
            title: "Added to Cart!",
            description: `${product.name} has been added to your cart.`,
            variant: "default",
          });
          return [
            ...prevItems,
            { ...product, quantity, selectedOptions, giftMessage }
          ];
        }
      });
    },
    [toast]
  );

  const removeFromCart = useCallback(
    (productId: string, itemOptions?: { [key: string]: string }) => {
      setCartItems(prevItems => {
        const key = getCartItemKey(productId, itemOptions);
        const filtered = prevItems.filter(
          item => getCartItemKey(item.id, item.selectedOptions) !== key
        );
        if (filtered.length !== prevItems.length) {
          toast({
            title: "Item Removed",
            description: "The item has been removed from your cart.",
            variant: "default",
          });
        }
        return filtered;
      });
    },
    [toast]
  );

  const updateQuantity = useCallback(
    (productId: string, itemOptions: { [key: string]: string } | undefined, newQuantity: number) => {
      setCartItems(prevItems => {
        const key = getCartItemKey(productId, itemOptions);
        const updated = prevItems
          .map(item =>
            getCartItemKey(item.id, item.selectedOptions) === key
              ? { ...item, quantity: Math.max(0, newQuantity) }
              : item
          )
          .filter(item => item.quantity > 0);
        return updated;
      });
    },
    []
  );

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // Memoize derived values
  const cartTotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems]
  );
  const cartCount = useMemo(
    () => cartItems.reduce((count, item) => count + item.quantity, 0),
    [cartItems]
  );

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
    isCartInitialized,
  };
}