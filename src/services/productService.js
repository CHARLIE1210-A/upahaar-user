import apiClient from './apiClient';


const productService = {
    getAll: () => apiClient.get("/products/get-product"),
    getProductById: (id) => apiClient.get(`/products/get-product/${id}`),
    getByCategory: (category) => apiClient.get(`/products/category/${category}`),
  };

// Accepts params: { page, limit, search, category, sort }
const getProducts = (params = {}) => {
  // convert params to query string expected by backend
  return apiClient.get('/products', { params });
};

const getProductById = (id) => apiClient.get(`/products/${id}`);

// export default { getProducts, getProductById };
export default productService;