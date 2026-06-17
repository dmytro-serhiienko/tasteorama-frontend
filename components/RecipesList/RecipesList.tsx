'use client';

// ==========================================================================================
// Компонент RecipesList -  відображає адаптивну сітку карток рецептів.
// Використовує useInfiniteQuery для пагінації (TanStack Query).
// Читає фільтри з URL параметрів які записує компонент Filters (Денис).
// ==========================================================================================

import { useInfiniteQuery, keepPreviousData } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';

// Імпорт API функції
import { getRecipes } from '@/lib/api/clientApi';

// Імпорт компонентів
import RecipeCard from '@/components/RecipeCard/RecipeCard';
import LoadMoreBtn from '@/components/LoadMoreBtn/LoadMoreBtn';
import { NoSearchResults } from '@/components/Filters/NoSearchResults';

// Імпорт стилів
import css from './RecipesList.module.css';
import Loading from '@/app/loading';
import AppError from '@/app/error';

// Імпорт функції helpers для рендера картки NoSearchResults
import { resetSearchAndFilters } from '@/components/Filters/helpers'
// ==========================================================================================
// Компонент
// ==========================================================================================
const RecipesList = () => {
  const router = useRouter()
  // ------------------------------------------------------------------------------------------
  // Читаємо фільтри з URL які записує компонент Filters (Денис)
  // ------------------------------------------------------------------------------------------
  const searchParams = useSearchParams();
  const handleResetSearchAndFilters = () => {
  resetSearchAndFilters(searchParams, router);
};

  
  const category = searchParams.get('category') ?? undefined;
  const ingredient = searchParams.get('ingredient') ?? undefined;
  const search = searchParams.get('search') ?? undefined;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = useInfiniteQuery({
    // При зміні фільтрів - робимо новий запит з початку
    queryKey: ['recipes', { category, ingredient, search }],
    queryFn: ({ pageParam = 1 }) => getRecipes(pageParam, undefined, search, category, ingredient),
    initialPageParam: 1,
    // placeholderData: keepPreviousData,
    getNextPageParam: lastPage => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });

  // ------------------------------------------------------------------------------------------
  // Стан завантаження початкових даних
  // ------------------------------------------------------------------------------------------
  if (isLoading) {
    return <Loading />;
  }

  // ------------------------------------------------------------------------------------------
  // Стан помилки
  // ------------------------------------------------------------------------------------------
if (
  isError &&
  'response' in error &&
  (error as { response?: { status: number } }).response?.status === 404
) {
  return (
    <NoSearchResults
      onReset={handleResetSearchAndFilters}
    />
  );
}

if (isError) {
  return (
    <AppError
      error={error instanceof Error ? error : new Error('Something went wrong')}
      reset={() => refetch()}
    />
  );
}

  // ------------------------------------------------------------------------------------------
  // Зводимо всі сторінки в один плаский масив рецептів
  // ------------------------------------------------------------------------------------------
  const recipes = data?.pages.flatMap(page => page.data) ?? [];

  // ------------------------------------------------------------------------------------------
  // Стан пустого результату
  // ------------------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------------------




  // ------------------------------------------------------------------------------------------
  // Основний рендер
  // ------------------------------------------------------------------------------------------
  return (
    <div className={css.wrapper}>
      <ul className={css.list}>
        {recipes.map(recipe => (
          <li key={recipe._id} className={css.item}>
            <RecipeCard recipe={recipe} />
          </li>
        ))}
      </ul>

      {hasNextPage && <LoadMoreBtn onClick={fetchNextPage} isLoading={isFetchingNextPage} />}
    </div>
  );
};

export default RecipesList;
