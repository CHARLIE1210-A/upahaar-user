"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import  cartService from '@/services/cartService';
import type { CartItem } from '@/types';
import { useToast } from '@/hooks/use-toast';

export function useCarts(userId: number) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  
  // Fetch cart items
  const { data: cartItems, isLoading } = useQuery({
      queryKey: ['cart', userId],
      queryFn: () => cartService.getAll(userId),
      staleTime: 1000 * 60 * 5, // 5 minutes cache
    });

  // Add to cart
  const addToCartMutation = useMutation({
    mutationFn: (params: { productId: number; quantity: number; selectedOptions?: Record<string, string>; giftMessage?: string }) =>
      cartService.addToCart(
        userId,params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', userId] });
      toast({ title: 'Added to Cart!', description: 'Item has been added successfully.' });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to add item to cart.', variant: 'destructive' });
    },
  });

  // Remove from cart
  const removeFromCartMutation = useMutation({
    mutationFn: (cartItemId: string) => cartService.removeCartItem(cartItemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', userId] });
      toast({ title: 'Item Removed', description: 'Item has been removed from your cart.' });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to remove item from cart.', variant: 'destructive' });
    },
  });

  // Update quantity
  const updateQuantityMutation = useMutation({
    mutationFn: (params: { cartItemId: string; quantity: number }) =>
      cartService.updateCartItem(params.cartItemId, params.quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', userId] });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to update quantity.', variant: 'destructive' });
    },
  });

  return {
    cartItems,
    isLoading,
    addToCart: addToCartMutation.mutate,
    removeFromCart: removeFromCartMutation.mutate,
    updateQuantity: updateQuantityMutation.mutate,
    // cartTotal: , 0),
    // cartCount: 
  };
}
