"use client";

import type { CartItem, Product } from '@/types';
import { useState, useEffect, useCallback, useMemo } from 'react';
import apiClient from '@/services/apiClient';
import { useToast } from '@/hooks/use-toast';
import { UUID } from 'crypto';

export function useCart(userId: number) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  // Fetch cart items for the logged-in user
  const fetchCart = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get(`/cart/cart-items/${userId}`);
      console.log("res", response.data)
      if (response.data) {
        setCartItems(response.data); // data is List<CartItemDTO>
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error('Failed to fetch cart:', error);
      toast({
        title: "Error",
        description: "Failed to load your cart.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast, userId]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Add item to cart
  const addToCart = useCallback(
    async (
      product: Long,
      quantity: number = 1,
      selectedOptions?: Record<string, string>,
      giftMessage?: string
    ) => {
      try {
        const response = await apiClient.post(`/cart/add-cart/${userId}`, {
          productId: product,
          quantity,
          selectedOptions,
          giftMessage,
        });
        console.log("add", response)

        if (response.status) {
          toast({
            title: "Added to Cart!",
            description: `${product.name} has been added to your cart.`,
          });
          fetchCart();
        } else {
          throw new Error("Failed to add to cart");
        }
      } catch (error) {
        console.error('Failed to add item to cart:', error);
        toast({
          title: "Error",
          description: "Failed to add item to cart.",
          variant: "destructive",
        });
      }
    },
    [toast, userId, fetchCart]
  );

  // Remove item from cart
  const removeFromCart = useCallback(
    async (cartItemId: UUID) => {
      try {
        const response = await apiClient.delete(`/cart/remove-cart/${cartItemId}`);
        console.log("remove", response)
        if (response.status) {
          toast({
            title: "Item Removed",
            description: "The item has been removed from your cart.",
          });
          fetchCart();
        } else {
          throw new Error("Failed to remove item");
        }
      } catch (error) {
        console.error('Failed to remove item from cart:', error);
        toast({
          title: "Error",
          description: "Failed to remove item from cart.",
          variant: "destructive",
        });
      }
    },
    [toast, fetchCart]
  );

  // Update quantity
  const updateQuantity = useCallback(
    async (cartItemId: UUID, quantity: number, selectedOptions?: Record<string, string>, giftMessage?: string) => {
      if (quantity <= 0) {
        removeFromCart(cartItemId);
        return;
      }
      console.log("update", cartItemId, quantity, selectedOptions)
      try {
        const response = await apiClient.put(`/cart/update-cart/${cartItemId}?quantity=${quantity}`, {
        });
        console.log("update", response)
        if (response.status) {
          fetchCart();  
        } else {
          throw new Error("Failed to update quantity");
        }
      } catch (error) {
        console.error('Failed to update item quantity:', error);
        toast({
          title: "Error",
          description: "Failed to update item quantity.",
          variant: "destructive",
        });
      }
    },
    [removeFromCart, toast, fetchCart]
  );

  // Clear cart in UI (local state)
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // Computed values
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
    isLoading,
  };
}
