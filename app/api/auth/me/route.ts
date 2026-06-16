// ======================================================================================
// Роут перевірки сесії користувача
// ======================================================================================
// auth/me – це приватний маршрут в API, тому, так само як і auth/session,
// обов’язково має отримувати cookie
// ======================================================================================
import { NextResponse } from 'next/server';
import { api, ApiError } from '../../api';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();

  try {
    const { data } = await api.get('/api/users/me', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error: (error as ApiError).response?.data?.error ?? (error as ApiError).message,
      },
      { status: (error as ApiError).status }
    );
  }
}
