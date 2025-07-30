// tasker/src/api/login/route.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { serialize } from 'cookie';
import API from '@/lib/axios';

/**
 * Обработка POST-запроса на /api/login (Next.js Route Handler).
 * Этот endpoint выступает в роли прокси между клиентом и внешним API.
 * Он:
 * - получает логин и пароль от клиента
 * - отправляет их на внешний API (/api/login)
 * - получает JWT токен
 * - устанавливает токен в куки (HttpOnly)
 */
export async function POST(req: NextRequest) {
  try {
    /**
     * Получаем тело запроса в формате JSON.
     * Ожидаем, что клиент отправит логин и пароль.
     */
    const body = await req.json();
    const { login, password } = body;

    /**
     * Отправляем login и password на внешний backend (настоящий API),
     * который возвращает JWT токен при успешной авторизации.
     */
    const response = await API.post("/api/login", { login, password });

    // Получаем токен из ответа
    const token = response.data.token;

    /**
     * Если токен не пришёл — возвращаем 401 Unauthorized
     */
    if (!token) {
      return NextResponse.json({ message: 'Токен не получен' }, { status: 401 });
    }

    /**
     * Устанавливаем токен в HttpOnly cookie.
     * Это предотвращает доступ к куки из JavaScript и делает их безопаснее.
     */
    const cookie = serialize('token', token, {
      httpOnly: true, // cookie не доступна через document.cookie
      secure: process.env.NODE_ENV === 'production', // https в проде
      sameSite: 'lax', // защита от CSRF
      path: '/', // доступен на всем сайте
      maxAge: 60 * 60 * 24 * 7, // 7 дней
    });

    /**
     * Возвращаем успешный ответ и добавляем Set-Cookie в заголовки
     */
    const res = NextResponse.json({ success: true });
    res.headers.set('Set-Cookie', cookie);
    return res;
  } catch (err: any) {
    /**
     * Обработка ошибок:
     * - логируем ошибку в консоль
     * - возвращаем сообщение об ошибке клиенту
     */
    console.error('Ошибка при логине:', err.message);
    return NextResponse.json({ message: 'Неверные учетные данные' }, { status: 401 });
  }
}
