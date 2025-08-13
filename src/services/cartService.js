import apiClient from './apiClient';

const cartService = {
    getAll: (userId) => apiClient.get(`/cart/cart-items/${userId}`), // Get all items in user's cart
    addToCart: (userId, cartItem) => apiClient.post(`/cart/add-cart/${userId}`, cartItem), // Add item to cart
    updateCartItem: (cartItemId, quantity) => apiClient.put(`/cart/update-cart/${cartItemId}?quantity=${quantity}`), // Update quantity/options
    removeCartItem: (cartItemId) => apiClient.delete(`/cart/remove-cart/${cartItemId}`), // Remove item
    clearCart: (userId) => apiClient.delete(`/cart/${userId}`) // Clear all items in user's cart
  };
  
  export default cartService;
  