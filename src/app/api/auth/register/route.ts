import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { hashPassword, signAuthToken, mapUserFromDoc } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, firstName, lastName } = body as {
      email?: string;
      password?: string;
      firstName?: string;
      lastName?: string;
    };

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Missing required fields' } },
        { status: 400 },
      );
    }

    const db = await getDb();
    const users = db.collection('users');

    const existing = await users.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json(
        { success: false, error: { code: 'EMAIL_IN_USE', message: 'Email is already registered' } },
        { status: 409 },
      );
    }

    const passwordHash = await hashPassword(password);
    const now = new Date().toISOString();

    const userDoc = {
      email: email.toLowerCase(),
      firstName,
      lastName,
      passwordHash,
      createdAt: now,
      emailVerified: false,
    };

    const result = await users.insertOne(userDoc);
    const userId = String(result.insertedId);

    const token = signAuthToken({ sub: userId, email: userDoc.email });

    const res = NextResponse.json({
      success: true,
      data: { user: mapUserFromDoc({ ...userDoc, _id: userId }) },
    });
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
    console.error('Register error', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'Something went wrong' } },
      { status: 500 },
    );
  }
}


