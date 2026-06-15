// 1. Імпортуємо функцію
import { getCategories } from '@/lib/api/api-myTest';
import { getIngredients } from '@/lib/api/api-myTest';
import { getRecipes } from '@/lib/api/api-myTest';

const MyTest = async () => {
  // 3. Виконуємо запит
  const categories = await getCategories();
  const ingredients = await getIngredients();
  const recipes = await getRecipes();

  return (
    <div>
      MyTest
      <p>
        Categories:{' '}
        {categories.data.map(category => (
          <span key={category._id}>{category.name}</span>
        ))}
      </p>
      <p>
        Ingredients:{' '}
        {ingredients.data.map(ingredient => (
          <span key={ingredient._id}>{ingredient.name}</span>
        ))}
      </p>
      <ul>
        Recipes:{' '}
        {recipes.data.map(recipe => (
          <li key={recipe._id}>{recipe.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyTest;
