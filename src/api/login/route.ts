import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { serialize } from 'cookie';
import API from '@/lib/axios';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { login, password } = body;

    // Отправляем запрос на backend, который выдает JWT
    const response = await API.post("/api/login", { login, password });


    const token = response.data.token;

    if (!token) {
      return NextResponse.json({ message: 'Токен не получен' }, { status: 401 });
    }

    // Устанавливаем HttpOnly cookie
    const cookie = serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 дней
    });

    const res = NextResponse.json({ success: true });
    res.headers.set('Set-Cookie', cookie);
    return res;
  } catch (err: any) {
    console.error('Ошибка при логине:', err.message);
    return NextResponse.json({ message: 'Неверные учетные данные' }, { status: 401 });
  }
}
