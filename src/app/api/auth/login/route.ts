import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { verifyPassword, signAuthToken, mapUserFromDoc } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body as { email?: string; password?: string };

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Email and password are required' } },
        { status: 400 },
      );
    }

    const db = await getDb();
    const users = db.collection('users');

    const userDoc = await users.findOne({ email: email.toLowerCase() });
    if (!userDoc || !userDoc.passwordHash) {
      return NextResponse.json(
        { success: false, error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' } },
        { status: 401 },
      );
    }

    const isValid = await verifyPassword(password, userDoc.passwordHash as string);
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' } },
        { status: 401 },
      );
    }

    const token = signAuthToken({ sub: userDoc._id as string, email: userDoc.email as string });

    const res = NextResponse.json({ success: true, data: { user: mapUserFromDoc(userDoc) } });
    res.cookies.set('tixly_token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return res;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Login error', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'Something went wrong' } },
      { status: 500 },
    );
  }
}


