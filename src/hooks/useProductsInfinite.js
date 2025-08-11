import { useInfiniteQuery } from '@tanstack/react-query';
import productService from '@/services/productService';

export function useProductsInfinite({ search = '', category = '', sort = '', limit = 12 }) {
  return useInfiniteQuery(
    ['products', { search, category, sort }],
    ({ pageParam = 1 }) => productService.getProducts({ page: pageParam, limit, search, category, sort }),
    {
      getNextPageParam: (lastPage, pages) => {
        // Depends on backend response shape. Example: lastPage.page, lastPage.totalPages
        if (!lastPage) return undefined;
        if (lastPage.page && lastPage.totalPages && lastPage.page < lastPage.totalPages) return lastPage.page + 1;
        // fallback: if backend returns array and length < limit, stop
        if (Array.isArray(lastPage) && lastPage.length < limit) return undefined;
        return pages.length + 1; // best effort
      },
      staleTime: 1000 * 60 * 5,
    }
  );
}