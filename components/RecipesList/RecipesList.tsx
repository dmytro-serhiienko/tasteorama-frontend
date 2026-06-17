'use client';

import { useInfiniteQuery, keepPreviousData } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { getRecipes } from '@/lib/api/clientApi';

import RecipeCard from '@/components/RecipeCard/RecipeCard';
import LoadMoreBtn from '@/components/LoadMoreBtn/LoadMoreBtn';

import css from './RecipesList.module.css';
import Loading from '@/app/loading';
import AppError from '@/app/error';
// import NotFoundRecipePage from '@/app/recipes/[recipeId]/not-found';

const RecipesList = () => {
  const searchParams = useSearchParams();
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
    queryKey: ['recipes', { category, ingredient, search }],
    queryFn: ({ pageParam = 1 }) => getRecipes(pageParam, undefined, search, category, ingredient),
    initialPageParam: 1,
    placeholderData: keepPreviousData,
    getNextPageParam: lastPage => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <AppError
        error={error instanceof Error ? error : new Error('Something went wrong')}
        reset={() => refetch()}
      />
    );
  }

  const recipes = data?.pages.flatMap(page => page.data) ?? [];

  // if (recipes.length === 0) {
  //   NotFoundRecipePage();
  // }

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
