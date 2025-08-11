// src/hooks/useProductById.js
import { useQuery } from "@tanstack/react-query";
import productService from "@/services/productService";

export function useProductById(id) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => productService.getProductById(id),
    enabled: !!id, // fetch only if id exists
    staleTime: 1000 * 60 * 5, // 5 minutes cache

  });
}
