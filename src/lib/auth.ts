import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { getDb } from './mongodb';
import type { User } from '@/types';

// ==========================================
// Password Hashing
// ==========================================

const SALT_ROUNDS = 10;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// ==========================================
// JWT Helpers
// ==========================================

const JWT_SECRET = process.env.JWT_SECRET || 'tixly-dev-secret';
const JWT_EXPIRES_IN = '7d';

interface JwtPayload {
  sub: string;
  email: string;
}

export function signAuthToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyAuthToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    return null;
  }
}

// ==========================================
// Current User Helpers
// ==========================================

export async function getCurrentUser(req: NextRequest): Promise<User | null> {
  const cookieStore = cookies();
  const token = cookieStore.get('tixly_token')?.value;

  if (!token) return null;

  const payload = verifyAuthToken(token);
  if (!payload) return null;

  const db = await getDb();
  const userDoc = await db.collection('users').findOne({ _id: payload.sub });
  if (!userDoc) return null;

  return mapUserFromDoc(userDoc);
}

// Map a MongoDB document to our User type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapUserFromDoc(doc: any): User {
  return {
    id: doc._id,
    email: doc.email,
    firstName: doc.firstName,
    lastName: doc.lastName,
    phone: doc.phone,
    avatarUrl: doc.avatarUrl,
    preferredCurrency: doc.preferredCurrency ?? 'USD',
    preferredTimezone: doc.preferredTimezone ?? 'UTC',
    emailVerified: Boolean(doc.emailVerified),
    createdAt: doc.createdAt ?? new Date().toISOString(),
    lastLoginAt: doc.lastLoginAt,
  };
}


