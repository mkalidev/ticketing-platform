import { MongoClient, Db } from 'mongodb';

// ==========================================
// MongoDB Client (Singleton)
// ==========================================

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'tixly';

if (!uri) {
  // Fail fast in development; in production this should be configured
  // eslint-disable-next-line no-console
  console.error('Missing MONGODB_URI environment variable');
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function getDb(): Promise<Db> {
  if (cachedDb) return cachedDb;

  const client = await getClient();
  cachedDb = client.db(dbName);
  return cachedDb;
}

export async function getClient(): Promise<MongoClient> {
  if (cachedClient) return cachedClient;

  if (!uri) {
    throw new Error('MONGODB_URI is not set');
  }

  cachedClient = new MongoClient(uri);
  await cachedClient.connect();
  return cachedClient;
}


