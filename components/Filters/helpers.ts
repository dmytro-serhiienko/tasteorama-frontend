import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const resetSearchAndFilters = (
  searchParams: URLSearchParams,
  router: AppRouterInstance
) => {
  const params = new URLSearchParams(searchParams);

  params.delete('category');
  params.delete('ingredient');
  params.delete('search');

  const queryString = params.toString();

  router.replace(queryString ? `?${queryString}` : '/');
};