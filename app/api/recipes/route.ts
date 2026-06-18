import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';
import { parse } from 'cookie';
import { api } from '../api';
import { logErrorResponse } from '../_utils/utils';

// нова FormData з запиту
function buildOutgoingFormData(incoming: FormData): FormData {
  const formData = new FormData();

  const title = incoming.get('title');
  const category = incoming.get('category');
  const area = incoming.get('area');
  const instructions = incoming.get('instructions');
  const description = incoming.get('description');
  const time = incoming.get('time');
  const ingredients = incoming.get('ingredients');
  const thumb = incoming.get('thumb');

  if (typeof title === 'string') formData.append('title', title);
  if (typeof category === 'string') formData.append('category', category);
  if (typeof area === 'string') formData.append('area', area);
  if (typeof instructions === 'string') formData.append('instructions', instructions);
  if (typeof description === 'string') formData.append('description', description);
  if (typeof time === 'string') formData.append('time', time);
  if (typeof ingredients === 'string') formData.append('ingredients', ingredients);
  if (thumb instanceof File) formData.append('image', thumb, thumb.name);

  return formData;
}

//!!!! POST /api/recipes — створення нового рецепту.
export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const incomingFormData = await request.formData();

  try {
    const res = await api.post('/api/recipes', buildOutgoingFormData(incomingFormData), {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      try {
        // accessToken через refreshToken
        const refreshRes = await api.get('/api/auth/refresh', {
          headers: { Cookie: cookieStore.toString() },
        });

        const setCookie = refreshRes.headers['set-cookie'];
        if (setCookie) {
          const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
          for (const cookieStr of cookieArray) {
            const parsed = parse(cookieStr);
            const options = {
              expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
              path: parsed.Path,
              maxAge: Number(parsed['Max-Age']),
            };
            if (parsed.sessionId) cookieStore.set('sessionId', parsed.sessionId, options);
            if (parsed.accessToken) cookieStore.set('accessToken', parsed.accessToken, options);
            if (parsed.refreshToken) cookieStore.set('refreshToken', parsed.refreshToken, options);
          }
        }

        const retryRes = await api.post('/api/recipes', buildOutgoingFormData(incomingFormData), {
          headers: { Cookie: cookieStore.toString() },
        });

        return NextResponse.json(retryRes.data, { status: retryRes.status });
      } catch (refreshError) {
        if (isAxiosError(refreshError)) {
          logErrorResponse(refreshError.response?.data);
        }
        return NextResponse.json({ error: 'Сесія застаріла, увійдіть знову' }, { status: 401 });
      }
    }

    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status || 500 }
      );
    }

    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
