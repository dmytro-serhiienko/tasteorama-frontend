// API для роботи з нотатками
// ==========================================================================================
// Функції для виконання HTTP-запитів
// ==========================================================================================

// lib/api/api.ts — для створення одного спільного екземпляра axios,
// з налаштуванням withCredentials: true для підтримки cookies;
// ==========================================================================================

// Імпорт бібліотеки axios
import axios from 'axios';

// // Створюємо інстанс axios
// export const nextServer = axios.create({
//   // Базова URL-адреса для всіх запитів, що надсилаються через цей інстанс
//   baseURL: process.env.NEXT_PUBLIC_API_URL + '/api',
//   // Налаштування, що дозволяє axios працювати з cookie,
//   // що необхідно для автентифікації та збереження сесій
//   withCredentials: true,
// });

// Базова URL-адреса для всіх запитів, що надсилаються через цей інстанс
axios.defaults.baseURL = 'https://tasteorama-backend-jumn.onrender.com';

// *********************************************************************************
// Робота з категоріями
// *********************************************************************************
// Імпорт інтерфейсів
import type { Category } from '@/types/category';

// Типізація відповіді Get-запиту від Axios - згідно структури бекенда :
interface GetCategoriesHttpResponse {
  data: Category[]; // Відповідь містить масив категорій у властивості data
}
// ==========================================================================================
// getCategories : виконує запит для отримання колекції категорій із сервера.
// ==========================================================================================
// Структура запиту :

export async function getCategories(): Promise<GetCategoriesHttpResponse> {
  // Виконуємо HTTP-запит
  const response = await axios.get<GetCategoriesHttpResponse>('/api/categories');
  console.log('Fetch - GET :');
  console.log('response.data', response.data);
  // console.log('totalPages', response.data.totalPages);

  // Повертаємо значення notes та totalPages відповіді
  return response.data;
}

// *********************************************************************************
// Робота з інгредієнтами
// *********************************************************************************
// Імпорт інтерфейсів
import type { Ingredient } from '@/types/ingredient';

// Типізація відповіді Get-запиту від Axios - згідно структури бекенда :
interface GetIngredientsHttpResponse {
  data: Ingredient[]; // Відповідь містить масив категорій у властивості data
}
// ==========================================================================================
// getIngredients : виконує запит для отримання колекції інгредієнтів із сервера.
// ==========================================================================================
// Структура запиту :

export async function getIngredients(): Promise<GetIngredientsHttpResponse> {
  // Виконуємо HTTP-запит
  const response = await axios.get<GetIngredientsHttpResponse>('/api/ingredients');
  console.log('Fetch - GET :');
  console.log('response.data', response.data);

  // Повертаємо значення data відповіді
  return response.data;
}

// *********************************************************************************
// Робота з рецептами
// *********************************************************************************
// Імпорт інтерфейсів
import type { Recipe } from '@/types/recipe';

// Типізація відповіді Get-запиту від Axios - згідно структури бекенда :
interface GetRecipesHttpResponse {
  data: Recipe[]; // Відповідь містить масив категорій у властивості data
}
// ==========================================================================================
// getIngredients : виконує запит для отримання колекції інгредієнтів із сервера.
// ==========================================================================================
// Структура запиту :

export async function getRecipes(): Promise<GetRecipesHttpResponse> {
  // Виконуємо HTTP-запит
  const response = await axios.get<GetRecipesHttpResponse>('/api/recipes');

  // Повертаємо значення data відповіді
  return response.data;
}
