// ==========================================================================================
// Інтерфейс для типізації користувача
// ==========================================================================================
// "_id": "686f6e9ac1d1a4f95c0ea111",
// "name": "Sofiia",
// "email": "sofiia@example.com",
// "avatar": "https://ac.goit.global/fullstack/react/default-avatar.jpg",
// "favorites": [],
// "createdAt": "2026-06-13T10:15:00.000Z",
// "updatedAt": "2026-06-13T10:15:00.000Z"
// ==========================================================================================
export interface User {
  _id: string;
  name: string;
  email: string;
  favorites: {
    _id: string;
    recipeId: string;
  }[];
  avatar: string;
  createdAt: string;
  updatedAt: string;
}
