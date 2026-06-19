import { nextServer } from './api';

export const addRecipeToFavorites = async (recipeId: string): Promise<void> => {
  await nextServer.post(`/recipes/favorites/${recipeId}`);
};

export const removeRecipeFromFavorites = async (recipeId: string): Promise<void> => {
  await nextServer.delete(`/recipes/favorites/${recipeId}`);
};
